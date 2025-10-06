import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

interface BlogPost {
  title: string;
  slug: string;
  content: string;
}

async function seedHfzPostsFromMarkdown() {
  try {
    console.log("🌱 Seeding HFZ blog posts from markdown...");

    // Read markdown file
    const mdPath = path.join(process.cwd(), "content/hfz-blog-posts.md");
    const mdContent = fs.readFileSync(mdPath, "utf-8");

    // Parse markdown content
    const posts: BlogPost[] = [];
    const sections = mdContent.split("### Blogbeitrag");

    for (let i = 1; i < sections.length; i++) {
      const section = sections[i].trim();
      const lines = section.split("\n");

      // Extract title (first line after "**Titel:")
      const titleLine = lines.find((line) => line.includes("**Titel:"));
      if (!titleLine) continue;

      const title = titleLine
        .replace(/\*\*Titel:\s*/, "")
        .replace(/\*\*$/, "")
        .trim();

      // Create slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

      // Extract content (everything after the title line, excluding the separator)
      const contentStartIndex =
        lines.findIndex((line) => line.includes("**Titel:")) + 1;
      const contentLines = lines.slice(contentStartIndex);

      // Remove the separator line (---) if it exists
      const separatorIndex = contentLines.findIndex(
        (line) => line.trim() === "---"
      );
      const finalContentLines =
        separatorIndex > -1
          ? contentLines.slice(0, separatorIndex)
          : contentLines;

      const content = finalContentLines.join("\n").trim();

      if (title && slug && content) {
        posts.push({ title, slug, content });
      }
    }

    console.log(`Found ${posts.length} blog posts to seed`);

    // Clear existing posts
    await prisma.hfzPost.deleteMany({});

    // Insert posts
    for (const post of posts) {
      await prisma.hfzPost.create({
        data: {
          title: post.title,
          slug: post.slug,
          content: post.content,
          created_at: new Date(),
        },
      });
      console.log(`✅ Created post: ${post.title}`);
    }

    console.log("🎉 Successfully seeded HFZ blog posts from markdown!");
  } catch (error) {
    console.error("❌ Error seeding HFZ blog posts:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedHfzPostsFromMarkdown();
