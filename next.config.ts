import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure AI crawlers that don't execute JavaScript get complete HTML
  htmlLimitedBots:
    /Googlebot|Bingbot|GPTBot|ClaudeBot|PerplexityBot|ChatGPT-User|OAI-SearchBot|anthropic-ai|CCBot|Meta-ExternalAgent/i,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "uploads-ssl.webflow.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "llsyusskoxgnuvwwuvsf.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
