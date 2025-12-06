// @ts-nocheck
/**
 * Script to fix price formatting: convert "40.00 EUR" to "40,00 EUR"
 * German format uses comma as decimal separator
 */

import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  console.log("Fixing price format: period -> comma\n");

  // Get all events with price_text
  const result = await pool.query(`
    SELECT id, title, price_text
    FROM hfz_events
    WHERE price_text IS NOT NULL;
  `);

  const events = result.rows as Array<{ id: number; title: string; price_text: string }>;

  console.log(`Found ${events.length} events with price_text to fix\n`);

  for (const event of events) {
    // Replace period with comma in EUR format (e.g., "40.00 EUR" -> "40,00 EUR")
    const fixedPrice = event.price_text.replace(/\.(\d{2})\s*EUR/i, ",$1 EUR");
    
    if (fixedPrice !== event.price_text) {
      await pool.query(
        `UPDATE hfz_events SET price_text = $1 WHERE id = $2`,
        [fixedPrice, event.id]
      );
      
      console.log(`  Fixed: "${event.title}" - "${event.price_text}" -> "${fixedPrice}"`);
    } else {
      console.log(`  Skipped (already correct): "${event.title}" - "${event.price_text}"`);
    }
  }

  console.log(`\n✅ Fixed ${events.length} event(s)`);
}

main()
  .then(async () => {
    await pool.end();
  })
  .catch(async (e) => {
    console.error("❌ Fix failed:", e);
    await pool.end();
    process.exit(1);
  });

