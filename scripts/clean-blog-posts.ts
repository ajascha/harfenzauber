import { readFileSync, writeFileSync } from "fs";
import { parse } from "csv-parse/sync";

// Read the CSV file
const csvContent = readFileSync(
  "/Users/arne/Projects/mama/harfenzauber/content/original_page/Narratic HFZ - Blogbeiträge.csv",
  "utf-8"
);

// Parse CSV
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
});

// Function to clean HTML content
function cleanHtmlContent(html: string): string {
  if (!html) return "";

  // Remove HTML tags but keep the content
  let cleaned = html
    .replace(/<[^>]*>/g, "") // Remove all HTML tags
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&amp;/g, "&") // Replace &amp; with &
    .replace(/&lt;/g, "<") // Replace &lt; with <
    .replace(/&gt;/g, ">") // Replace &gt; with >
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim();

  return cleaned;
}

// Clean the content
const cleanedRecords = records.map((record: any) => ({
  ...record,
  "Post Body": cleanHtmlContent(record["Post Body"]),
}));

// Convert back to CSV
const headers = Object.keys(cleanedRecords[0]);
const csvOutput = [
  headers.join(","),
  ...cleanedRecords.map((record) =>
    headers
      .map((header) => {
        const value = record[header] || "";
        // Escape commas and quotes in CSV
        if (
          value.includes(",") ||
          value.includes('"') ||
          value.includes("\n")
        ) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      })
      .join(",")
  ),
].join("\n");

// Write the cleaned CSV
writeFileSync(
  "/Users/arne/Projects/mama/harfenzauber/content/original_page/Narratic HFZ - Blogbeiträge_cleaned.csv",
  csvOutput
);

console.log("Cleaned blog posts CSV created successfully!");
console.log("Sample of cleaned content:");
console.log(cleanedRecords[0]["Post Body"].substring(0, 200) + "...");
