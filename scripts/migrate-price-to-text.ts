// @ts-nocheck
/**
 * Migration script to convert price_cents (Int) to price_text (String)
 * 
 * This script:
 * 1. Adds a new price_text column
 * 2. Converts existing price_cents values to text format (e.g., "50.00 EUR")
 * 3. Drops the old price_cents column
 * 
 * Run with: pnpm tsx scripts/migrate-price-to-text.ts
 * 
 * IMPORTANT: Run this BEFORE running `pnpm prisma generate` after updating the schema.
 * The schema.prisma should already have price_text, but the database still has price_cents.
 */

import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  console.log("Starting migration: price_cents -> price_text\n");

  // Step 1: Add price_text column
  console.log("Step 1: Adding price_text column...");
  await pool.query(`
    ALTER TABLE hfz_events 
    ADD COLUMN IF NOT EXISTS price_text TEXT;
  `);
  console.log("✓ price_text column added\n");

  // Step 2: Convert existing price_cents values to price_text using raw SQL
  console.log("Step 2: Converting existing price_cents values...");
  const result = await pool.query(`
    SELECT id, title, price_cents
    FROM hfz_events
    WHERE price_cents IS NOT NULL;
  `);

  const eventsWithPrice = result.rows as Array<{ id: number; title: string; price_cents: number | null }>;

  for (const event of eventsWithPrice) {
    if (event.price_cents !== null) {
      // Convert cents to EUR format (German format with comma): e.g., 5000 -> "50,00 EUR"
      const euros = (event.price_cents / 100).toFixed(2).replace(".", ",");
      const priceText = `${euros} EUR`;
      
      await pool.query(
        `UPDATE hfz_events SET price_text = $1 WHERE id = $2`,
        [priceText, event.id]
      );
      
      console.log(`  Converted: "${event.title}" - ${event.price_cents} cents -> "${priceText}"`);
    }
  }
  console.log(`✓ Converted ${eventsWithPrice.length} event(s)\n`);

  // Step 3: Drop the price_cents column
  console.log("Step 3: Dropping price_cents column...");
  await pool.query(`
    ALTER TABLE hfz_events 
    DROP COLUMN IF EXISTS price_cents;
  `);
  console.log("✓ price_cents column dropped");

  console.log("\n✅ Migration completed successfully!");
  console.log("\nNext steps:");
  console.log("1. Run: pnpm prisma generate");
  console.log("2. Verify the changes in your database");
}

main()
  .then(async () => {
    await pool.end();
  })
  .catch(async (e) => {
    console.error("❌ Migration failed:", e);
    await pool.end();
    process.exit(1);
  });

