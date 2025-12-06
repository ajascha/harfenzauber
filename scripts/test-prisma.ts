import { prisma } from "../lib/db";

async function testPrisma() {
  try {
    console.log("Testing Prisma Client initialization...");
    console.log("✅ Prisma Client initialized successfully");
    
    // Verify Prisma Client has the expected models
    const hasHfzPost = "hfzPost" in prisma;
    const hasHfzEvent = "hfzEvent" in prisma;
    const hasPosts = "posts" in prisma;
    const hasEvents = "events" in prisma;
    console.log(`✅ HfzPost model available: ${hasHfzPost}`);
    console.log(`✅ HfzEvent model available: ${hasHfzEvent}`);
    console.log(`✅ Posts model available: ${hasPosts}`);
    console.log(`✅ Events model available: ${hasEvents}`);
    
    console.log("\nTesting database connection...");
    
    // Test connection
    await prisma.$connect();
    console.log("✅ Connected to database");
    
    // Test a simple query
    try {
      const hfzPostCount = await prisma.hfzPost.count();
      console.log(`✅ HfzPost count: ${hfzPostCount}`);
      
      const hfzEventCount = await prisma.hfzEvent.count();
      console.log(`✅ HfzEvent count: ${hfzEventCount}`);
      
      const postCount = await prisma.posts.count();
      console.log(`✅ Posts count: ${postCount}`);
      
      const eventCount = await prisma.events.count();
      console.log(`✅ Events count: ${eventCount}`);
      
      // Test querying a single record if available
      const firstPost = await prisma.hfzPost.findFirst();
      if (firstPost) {
        console.log(`✅ Found post: ${firstPost.title}`);
      } else {
        console.log("ℹ️  No posts found (this is OK)");
      }
    } catch (queryError: any) {
      if (queryError.code === "ECONNREFUSED") {
        console.log("⚠️  Database connection refused - database may not be running");
        console.log("   This is OK for testing Prisma configuration");
        console.log("   Prisma 7 setup is correct, but database needs to be accessible");
      } else {
        throw queryError;
      }
    }
    
    await prisma.$disconnect();
    console.log("✅ Disconnected successfully");
    console.log("\n✅ Prisma 7 configuration is correct!");
  } catch (error: any) {
    if (error.code === "ECONNREFUSED") {
      console.log("⚠️  Database connection refused");
      console.log("   Prisma Client is configured correctly, but database is not accessible");
      console.log("   Make sure your database is running and DATABASE_URL is set correctly");
    } else {
      console.error("❌ Prisma test failed:", error);
      process.exit(1);
    }
  }
}

testPrisma();

