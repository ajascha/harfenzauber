"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createEvent(formData: FormData) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    throw new Error("Nicht autorisiert");
  }

  const title = formData.get("title") as string;
  const subtitle = (formData.get("subtitle") as string) || null;
  const description = formData.get("description") as string;
  const longDescription = (formData.get("longDescription") as string) || null;
  const imageUrl = (formData.get("imageUrl") as string) || null;
  const startsAtStr = formData.get("startsAt") as string;
  const address = formData.get("address") as string;
  const venueName = (formData.get("venueName") as string) || null;
  const timeText = (formData.get("timeText") as string) || null;
  const priceText = ((formData.get("priceText") as string) || "").trim() || null;
  const registrationUrl = (formData.get("registrationUrl") as string) || null;
  const showContactRegistration = formData.get("showContactRegistration") === "true";

  const startsAt = new Date(startsAtStr);
  const slug = slugify(title);

  await prisma.hfzEvent.create({
    data: {
      title,
      subtitle,
      description,
      image_url: imageUrl,
      starts_at: startsAt,
      address,
      venue_name: venueName,
      time_text: timeText,
      price_text: priceText,
      registration_url: registrationUrl,
      show_contact_registration: showContactRegistration,
    },
  });

  revalidatePath("/veranstaltungen");
  revalidatePath("/");
}

export async function updateEvent(formData: FormData) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    throw new Error("Nicht autorisiert");
  }

  const id = parseInt(formData.get("id") as string);
  const title = formData.get("title") as string;
  const subtitle = (formData.get("subtitle") as string) || null;
  const description = formData.get("description") as string;
  const longDescription = (formData.get("longDescription") as string) || null;
  const imageUrl = (formData.get("imageUrl") as string) || null;
  const startsAtStr = formData.get("startsAt") as string;
  const address = formData.get("address") as string;
  const venueName = (formData.get("venueName") as string) || null;
  const timeText = (formData.get("timeText") as string) || null;
  const priceText = ((formData.get("priceText") as string) || "").trim() || null;
  const registrationUrl = (formData.get("registrationUrl") as string) || null;
  const showContactRegistration = formData.get("showContactRegistration") === "true";

  const startsAt = new Date(startsAtStr);
  const slug = slugify(title);

  await prisma.hfzEvent.update({
    where: { id },
    data: {
      title,
      subtitle,
      description,
      image_url: imageUrl,
      starts_at: startsAt,
      address,
      venue_name: venueName,
      time_text: timeText,
      price_text: priceText,
      registration_url: registrationUrl,
      show_contact_registration: showContactRegistration,
    },
  });

  revalidatePath("/veranstaltungen");
  revalidatePath("/");
}

export async function deleteEvent(id: number) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    throw new Error("Nicht autorisiert");
  }

  await prisma.hfzEvent.delete({
    where: { id },
  });

  revalidatePath("/veranstaltungen");
  revalidatePath("/");
}
