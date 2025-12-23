import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// Convert a human-readable title into a URL-friendly slug.
// Handles German umlauts and accents reasonably well.
export function toSlug(input: string): string {
  if (!input) return "";
  const normalized = input
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    // strip remaining diacritics
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");

  return normalized
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Truncate text to a maximum length, appending an ellipsis if needed.
export function truncate(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, Math.max(0, maxLength - 1)).trimEnd() + "…";
}

/**
 * Normalize price text to a consistent format.
 * Detects patterns like "50 euro", "50 EUR", "50 Eur", "50€", etc.
 * and normalizes to "50 €" format.
 * Non-numeric prices (like "Auf Spendenbasis") are returned as-is.
 */
export function formatPrice(priceText: string | null | undefined): string | null {
  if (!priceText) return null;
  
  const trimmed = priceText.trim();
  if (!trimmed) return null;

  // Match patterns: number (with optional decimals) followed by EUR/euro/Eur/€
  // Also handles: EUR 50, € 50, euro 50, etc.
  const eurVariations = /\b(eur|euro|€)\b/gi;
  
  // Check if the text contains any EUR variation
  if (!eurVariations.test(trimmed)) {
    // No EUR found, return as-is (could be "Auf Spendenbasis", "Kostenlos", etc.)
    return trimmed;
  }

  // Extract numbers (including decimals with , or .)
  const numberMatch = trimmed.match(/(\d+(?:[.,]\d{1,2})?)/);
  if (!numberMatch) {
    // Has EUR but no number - return as-is
    return trimmed;
  }

  const numericValue = numberMatch[1].replace(",", ".");
  const num = parseFloat(numericValue);
  
  if (isNaN(num)) {
    return trimmed;
  }

  // Format: use comma as decimal separator for German locale
  const formatted = num % 1 === 0 
    ? num.toString() 
    : num.toFixed(2).replace(".", ",");
  
  return `${formatted} €`;
}
