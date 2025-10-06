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

async function main() {
  const csvPath = path.join(
    process.cwd(),
    "content/original_page/Narratic HFZ - Veranstaltungen.csv"
  );

  const content = fs.readFileSync(csvPath, "utf-8");
  const records = parseCSV(content);

  console.log(`Found ${records.length} events in CSV`);

  for (const record of records) {
    if (!record.Titel || !record["Datum & Uhrzeit"]) continue;

    const title = record.Titel;
    const slug = record.Slug || slugify(title);
    const subtitle = record.Untertitel || null;
    const description = record.Kurzbeschreibung || "";
    const longDescription = record.Beschreibung || null;
    const imageUrl = record.Bild || null;
    const dateStr = record["Datum & Uhrzeit"];
    const startsAt = new Date(dateStr);
    const address = record.Ort || "";
    const venueName = null;
    const timeText = null;
    const priceText = record.Beitrag || null;
    const isFree = record.Kostenlos === "true";
    const registrationUrl =
      record["Link zur Anmeldung oder zum Veranstalter"] || null;

    // Skip past events
    if (startsAt < new Date()) {
      console.log(`⊘ Skipping past event: ${title}`);
      continue;
    }

    try {
      await prisma.hfzEvent.create({
        data: {
          title,
          subtitle,
          description,
          image_url: imageUrl,
          starts_at: startsAt,
          address,
          venue_name: venueName,
          time_text: timeText,
          price_cents: priceText
            ? Math.round(parseFloat(priceText) * 100)
            : null,
          registration_url: registrationUrl,
        },
      });

      console.log(`✓ Seeded event: ${title}`);
    } catch (error) {
      console.error(`✗ Error seeding event ${title}:`, error);
    }
  }

  console.log("Event seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
