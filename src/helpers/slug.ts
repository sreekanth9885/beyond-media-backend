import slugify from "slugify";
import pool from "../config/db";

export async function generateUniqueSlug(title: string): Promise<string> {
  let slug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  // Telugu or unsupported language
  if (!slug) {
    slug = "news";
  }

  let uniqueSlug = slug;
  let counter = 1;

  while (true) {
    const [rows]: any = await pool.query(
      "SELECT id FROM news WHERE slug = ? LIMIT 1",
      [uniqueSlug]
    );

    if (rows.length === 0) {
      break;
    }

    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}