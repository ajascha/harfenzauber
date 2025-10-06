import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseCSV(content: string): Array<Record<string, string>> {
  const lines = content.split("\n");
  const headers = lines[0].split(",");
  const records: Array<Record<string, string>> = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(",");
    const record: Record<string, string> = {};

    headers.forEach((header, index) => {
      record[header.trim()] = values[index]?.trim() || "";
    });

    records.push(record);
  }

  return records;
}

function convertHTMLToMarkdown(html: string): string {
  // Basic HTML to Markdown conversion
  return html
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "\n## $1\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "\n### $1\n")
    .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
    .replace(/<ol[^>]*>|<\/ol>/gi, "\n")
    .replace(/<ul[^>]*>|<\/ul>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&nbsp;/g, " ")
    .trim();
}

async function main() {
  const csvPath = path.join(
    process.cwd(),
    "content/original_page/Narratic HFZ - Blogbeiträge.csv"
  );

  const content = fs.readFileSync(csvPath, "utf-8");
  const records = parseCSV(content);

  console.log(`Found ${records.length} blog posts in CSV`);

  for (const record of records) {
    if (!record.Name || !record.Slug) continue;

    const title = record.Name;
    const slug = record.Slug;
    const summary = record["Post Summary"] || "";
    const htmlContent = record["Post Body"] || "";
    const content = convertHTMLToMarkdown(htmlContent);
    const imageUrl = record["Main Image"] || null;
    const featured = record["Featured?"] === "true";

    try {
      await prisma.hfzPost.upsert({
        where: { slug },
        update: {
          title,
          content,
        },
        create: {
          title,
          slug,
          content,
        },
      });

      console.log(`✓ Seeded post: ${title}`);
    } catch (error) {
      console.error(`✗ Error seeding post ${title}:`, error);
    }
  }

  console.log("Blog post seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
