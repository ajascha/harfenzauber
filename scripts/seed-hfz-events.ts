import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

interface Event {
  Titel: string;
  Slug: string;
  Kurzbeschreibung: string;
  Beschreibung: string;
  Untertitel: string;
  Bild: string;
  "Link zur Anmeldung oder zum Veranstalter": string;
  "Datum & Uhrzeit": string;
  Ort: string;
  Kostenlos: string;
  Beitrag: string;
}

async function seedHfzEvents() {
  try {
    console.log("🌱 Seeding HFZ events...");

    // Read CSV file
    const csvPath = path.join(
      process.cwd(),
      "content/original_page/Narratic HFZ - Veranstaltungen.csv"
    );
    const csvContent = fs.readFileSync(csvPath, "utf-8");

    // Parse CSV
    const lines = csvContent.split("\n");
    const headers = lines[0].split(",");
    const events: Event[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Simple CSV parsing (handles quoted fields)
      const values: string[] = [];
      let current = "";
      let inQuotes = false;

      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          values.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      if (values.length >= headers.length) {
        const event: any = {};
        headers.forEach((header, index) => {
          event[header] = values[index]?.replace(/^"|"$/g, "") || "";
        });
        events.push(event);
      }
    }

    console.log(`Found ${events.length} events to seed`);

    // Clear existing events
    await prisma.hfzEvent.deleteMany({});

    // Insert events
    for (const event of events) {
      if (event.Titel && event["Datum & Uhrzeit"]) {
        // Parse date
        const dateStr = event["Datum & Uhrzeit"];
        const eventDate = new Date(dateStr);

        // Parse price (convert EUR to cents)
        let priceCents: number | null = null;
        if (
          event.Beitrag &&
          event.Beitrag !== "" &&
          event.Kostenlos !== "true"
        ) {
          const priceMatch = event.Beitrag.match(/(\d+(?:[.,]\d+)?)/);
          if (priceMatch) {
            const price = parseFloat(priceMatch[1].replace(",", "."));
            priceCents = Math.round(price * 100);
          }
        }

        await prisma.hfzEvent.create({
          data: {
            title: event.Titel,
            description: event.Beschreibung || event.Kurzbeschreibung || "",
            image_url: event.Bild || null,
            starts_at: eventDate,
            address: event.Ort || "",
            price_cents: priceCents,
            subtitle: event.Untertitel || null,
            venue_name: null, // Could be extracted from Ort if needed
            registration_url:
              event["Link zur Anmeldung oder zum Veranstalter"] || null,
            time_text: null, // Could be extracted from "Datum & Uhrzeit" if needed
          },
        });
        console.log(`✅ Created event: ${event.Titel}`);
      }
    }

    console.log("🎉 Successfully seeded HFZ events!");
  } catch (error) {
    console.error("❌ Error seeding HFZ events:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedHfzEvents();
