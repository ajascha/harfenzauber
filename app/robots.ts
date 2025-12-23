import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.NODE_ENV === "production"
      ? "https://www.harfenzauber.de"
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

  return {
    rules: [
      {
        // Wide open for all crawlers including AI (search + training)
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/protected/", "/login/", "/auth/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
