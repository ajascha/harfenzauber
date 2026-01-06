import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load env like the app does (.env.local preferred)
const envLocalPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else {
  dotenv.config();
}

const databaseUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    "Missing DATABASE_URL (or DIRECT_URL). Create / source .env.local before running this script."
  );
}

// lib/db expects DATABASE_URL for the pg Pool; fall back to DIRECT_URL if needed.
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = databaseUrl;
}

type Frontmatter = {
  title?: string;
  slug?: string;
  publishedAt?: string; // YYYY-MM-DD
};

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseFrontmatter(md: string): { frontmatter: Frontmatter; body: string } {
  const trimmed = md.trimStart();
  if (!trimmed.startsWith("---")) {
    return { frontmatter: {}, body: md.trim() };
  }

  const endIdx = trimmed.indexOf("\n---", 3);
  if (endIdx === -1) {
    return { frontmatter: {}, body: md.trim() };
  }

  const fmBlock = trimmed.slice(3, endIdx).trim();
  const body = trimmed.slice(endIdx + "\n---".length).trim();

  const frontmatter: Frontmatter = {};
  for (const rawLine of fmBlock.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^"(.*)"$/, "$1");
    if (key === "title") frontmatter.title = value;
    if (key === "slug") frontmatter.slug = value;
    if (key === "publishedAt" || key === "date" || key === "createdAt") {
      frontmatter.publishedAt = value;
    }
  }

  return { frontmatter, body };
}

function inferTitleFromBody(body: string): string | undefined {
  const lines = body.split(/\r?\n/);
  const h1 = lines.find((l) => l.trim().startsWith("# "));
  if (!h1) return undefined;
  return h1.replace(/^#\s+/, "").trim();
}

function parseDateMaybe(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  // Expect YYYY-MM-DD; force noon UTC to avoid timezone drift.
  const iso = `${value}T12:00:00.000Z`;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

async function main() {
  const { prisma } = await import("../lib/db");
  const dir = path.join(process.cwd(), "content", "posts");
  if (!fs.existsSync(dir)) {
    throw new Error(`Directory not found: ${dir}`);
  }

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b, "de"));

  console.log(`🌱 Seeding HFZ posts from ${files.length} markdown files...`);

  // Spread dates across the last ~3 months (90 days), oldest -> newest.
  const now = new Date();
  const start = addDays(now, -89);
  const end = addDays(now, -1);
  const spanDays =
    Math.max(0, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const fullPath = path.join(dir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { frontmatter, body } = parseFrontmatter(raw);

    const title = frontmatter.title ?? inferTitleFromBody(body) ?? path.basename(file, ".md");
    const slug = frontmatter.slug ?? toSlug(title);
    const content = body.trim();
    const frontmatterDate = parseDateMaybe(frontmatter.publishedAt);
    const t = files.length <= 1 ? 1 : index / (files.length - 1);
    const autoDate = addDays(start, Math.round(t * spanDays));
    const createdAt = frontmatterDate ?? autoDate;

    if (!title || !slug || !content) {
      console.warn(`⚠️  Skipping invalid post: ${file}`);
      continue;
    }

    const existing = await prisma.hfzPost.findUnique({ where: { slug } });
    if (existing) {
      await prisma.hfzPost.update({
        where: { slug },
        data: { title, content, created_at: createdAt },
      });
      console.log(`🔁 Updated: ${slug}`);
    } else {
      await prisma.hfzPost.create({
        data: { title, slug, content, created_at: createdAt },
      });
      console.log(`✅ Created: ${slug}`);
    }
  }

  await prisma.$disconnect();
}

main()
  .then(async () => {
    // no-op (handled in main)
  })
  .catch(async (e: unknown) => {
    console.error(e);
    process.exit(1);
  });

