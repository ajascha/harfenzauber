import { prisma } from "../lib/db";

async function checkEvents() {
  try {
    const now = new Date();
    const events = await prisma.hfzEvent.findMany({
      where: {
        starts_at: {
          gte: now,
        },
      },
      orderBy: { starts_at: "asc" },
    });

    console.log(`\nFound ${events.length} upcoming events\n`);
    console.log("=" .repeat(80));

    events.forEach((event, index) => {
      const position = index + 1;
      console.log(`\nPosition ${position}: ${event.title}`);
      console.log(`ID: ${event.id}`);
      console.log(`Created at: ${event.created_at}`);
      console.log(`Starts at: ${event.starts_at}`);
      console.log(`Has image: ${!!event.image_url}`);
      console.log(`Has subtitle: ${!!event.subtitle}`);
      console.log(`Has venue_name: ${!!event.venue_name}`);
      console.log(`Has time_text: ${!!event.time_text}`);
      console.log(`Has price_text: ${!!event.price_text}`);
      console.log(`Has registration_url: ${!!event.registration_url}`);
      console.log(`Description length: ${event.description.length}`);
      console.log("-".repeat(80));
    });

    // Check for patterns
    console.log("\n\n=== PATTERN ANALYSIS ===");
    const positionsToCheck = [0, 4, 5]; // Positions 1, 5, 6 (0-indexed)
    const otherPositions = events
      .map((_, i) => i)
      .filter((i) => !positionsToCheck.includes(i) && i < events.length);

    console.log("\nEvents that CAN'T be edited (positions 1, 5, 6):");
    positionsToCheck.forEach((pos) => {
      if (events[pos]) {
        const e = events[pos];
        console.log(`  Position ${pos + 1}: ID=${e.id}, created_at=${e.created_at}`);
      }
    });

    console.log("\nEvents that CAN be edited (positions 2, 3, 4):");
    [1, 2, 3].forEach((pos) => {
      if (events[pos]) {
        const e = events[pos];
        console.log(`  Position ${pos + 1}: ID=${e.id}, created_at=${e.created_at}`);
      }
    });

    // Check for differences
    console.log("\n=== CHECKING FOR DIFFERENCES ===");
    const nonEditable = positionsToCheck.map((pos) => events[pos]).filter(Boolean);
    const editable = [1, 2, 3].map((pos) => events[pos]).filter(Boolean);

    if (nonEditable.length > 0 && editable.length > 0) {
      const firstNonEditable = nonEditable[0];
      const firstEditable = editable[0];

      console.log("\nComparing first non-editable vs first editable:");
      console.log(`  created_at difference: ${firstNonEditable.created_at} vs ${firstEditable.created_at}`);
      console.log(`  Both have image_url: ${!!firstNonEditable.image_url && !!firstEditable.image_url}`);
      console.log(`  Both have subtitle: ${!!firstNonEditable.subtitle && !!firstEditable.subtitle}`);
    }
  } catch (error) {
    console.error("Error checking events:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkEvents();

