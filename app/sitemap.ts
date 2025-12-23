import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { toSlug } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NODE_ENV === "production"
      ? "https://www.harfenzauber.de"
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

  const now = new Date();

  // Static pages
  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "ueber-mich", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "harfenunterricht", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "kontakt", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "veranstaltungen", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "rechtliches/impressum", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "rechtliches/datenschutz", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "preise", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "repertoire", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "faq", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  // Service pages (Angebote)
  const servicePages = [
    "harfenkonzert",
    "hochzeit",
    "geburtstag",
    "firmenfeier",
    "trauerfeier",
    "taufe",
    "vernissage",
  ];

  // Dynamic blog posts from database
  let blogPosts: { slug: string; created_at: Date | null }[] = [];
  try {
    const posts = await prisma.hfzPost.findMany({
      select: { slug: true, created_at: true },
      where: { slug: { not: null } },
    });
    blogPosts = posts.filter((p): p is { slug: string; created_at: Date | null } => p.slug !== null);
  } catch {
    // Database might not be available during build
  }

  // Dynamic events from database
  let eventSlugs: { slug: string; created_at: Date | null }[] = [];
  try {
    const events = await prisma.hfzEvent.findMany({
      select: { title: true, created_at: true },
    });
    eventSlugs = events.map((e) => ({
      slug: toSlug(e.title),
      created_at: e.created_at,
    }));
  } catch {
    // Database might not be available during build
  }

  return [
    // Static pages
    ...staticPages.map((page) => ({
      url: `${base}${page.path ? `/${page.path}` : ""}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    // Service pages
    ...servicePages.map((slug) => ({
      url: `${base}/angebot/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Blog posts
    ...blogPosts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.created_at || now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // Events
    ...eventSlugs.map((event) => ({
      url: `${base}/veranstaltungen/${event.slug}`,
      lastModified: event.created_at || now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}

