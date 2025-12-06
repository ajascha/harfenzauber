import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function sanitizeFileName(originalName: string): string {
  const normalized = originalName
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
  const match = normalized.match(/^(.*?)(?:\.([^.]+))?$/);
  const baseRaw = (match?.[1] ?? "file").toLowerCase();
  const ext = (match?.[2] ?? "jpg").toLowerCase();
  const base = baseRaw
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
  return `${base || "file"}.${ext}`;
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getClaims();
    if (!userData?.claims) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      console.error("No file provided or invalid type");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const safeName = sanitizeFileName(file.name);
    const key = `${safeName}`;

    console.log("[upload] start", {
      name: file.name,
      safeName,
      size: file.size,
      type: file.type,
      key,
    });

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(key, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type || undefined,
      });

    if (uploadError) {
      console.error("[upload] error", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 400 });
    }

    const { data } = supabase.storage.from("images").getPublicUrl(key);
    console.log("[upload] success", { key, publicUrl: data.publicUrl });

    return NextResponse.json({ key, publicUrl: data.publicUrl });
  } catch (e) {
    console.error("[upload] exception", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
