import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: files, error } = await supabase.storage
      .from("images")
      .list("", {
        limit: 100,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      console.error("[images] list error", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const images = files
      .filter((file) => {
        const ext = file.name.split(".").pop()?.toLowerCase();
        return ["jpg", "jpeg", "png", "webp", "gif"].includes(ext || "");
      })
      .map((file) => {
        const { data } = supabase.storage
          .from("images")
          .getPublicUrl(file.name);
        return {
          name: file.name,
          publicUrl: data.publicUrl,
          createdAt: file.created_at,
        };
      });

    return NextResponse.json({ images });
  } catch (e) {
    console.error("[images] exception", e);
    return NextResponse.json(
      { error: "Failed to list images" },
      { status: 500 }
    );
  }
}
