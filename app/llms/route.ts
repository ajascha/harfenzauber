import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  // Serve the llms.txt file from public directory
  const filePath = path.join(process.cwd(), "public", "llms.txt");

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch {
    return new NextResponse("# llms.txt not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

