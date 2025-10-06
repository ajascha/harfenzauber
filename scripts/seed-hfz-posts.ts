import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

interface BlogPost {
  Name: string;
  Slug: string;
  "Post Body": string;
  "Post Summary": string;
  "Main Image": string;
  "Featured?": string;
}

async function seedHfzPosts() {
  try {
    console.log("🌱 Seeding HFZ blog posts...");

    // Read cleaned CSV file
    const csvPath = path.join(
      process.cwd(),
      "content/original_page/Narratic HFZ - Blogbeiträge_cleaned.csv"
    );
    const csvContent = fs.readFileSync(csvPath, "utf-8");

    // Parse CSV
    const lines = csvContent.split("\n");
    const headers = lines[0].split(",");
    const posts: BlogPost[] = [];

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
        const post: any = {};
        headers.forEach((header, index) => {
          post[header] = values[index]?.replace(/^"|"$/g, "") || "";
        });
        posts.push(post);
      }
    }

    console.log(`Found ${posts.length} blog posts to seed`);

    // Clear existing posts
    await prisma.hfzPost.deleteMany({});

    // Insert posts
    for (const post of posts) {
      if (post.Name && post.Slug) {
        await prisma.hfzPost.create({
          data: {
            title: post.Name,
            slug: post.Slug,
            content: post["Post Body"] || null,
          },
        });
        console.log(`✅ Created post: ${post.Name}`);
      }
    }

    console.log("🎉 Successfully seeded HFZ blog posts!");
  } catch (error) {
    console.error("❌ Error seeding HFZ blog posts:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedHfzPosts();
