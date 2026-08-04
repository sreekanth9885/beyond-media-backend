import slugify from "slugify";
import fs from "fs";
import path from "path";

import * as repository from "./news.repository";
import pool from "../../config/db";

export const create = async (body: any, file?: Express.Multer.File) => {
  const slug = slugify(body.title, {
    lower: true,
    strict: true,
  });

  const id = await repository.createNews({
    title: body.title,
    slug,
    category_id: body.category_id,
    sub_category_id: body.sub_category_id,
    short_description: body.short_description,
    content: body.content,
    tags: body.tags,
    youtube_url: body.youtube_url,
    featured_image: file ? `/uploads/news/${file.filename}` : null,
    status: body.status || "draft",
  });

  return repository.getNewsById(id);
};

export const getAll = () => repository.getAllNews();

export const getOne = (id: number) => repository.getNewsById(id);

/* ---------------- UPDATE ---------------- */

export const update = async (
  id: number,
  body: any,
  file?: Express.Multer.File,
) => {
  const news = await repository.getNewsById(id);

  if (!news) return null;

  const slug = slugify(body.title, {
    lower: true,
    strict: true,
  });

  let featuredImage = news.featured_image;

  if (file) {
    // Delete old image
    if (news.featured_image) {
      const oldImage = path.join(process.cwd(), news.featured_image);

      if (fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }
    }

    featuredImage = `/uploads/news/${file.filename}`;
  }

  await repository.updateNews(id, {
    title: body.title,
    slug,
    category_id: body.category_id,
    sub_category_id: body.sub_category_id,
    short_description: body.short_description,
    content: body.content,
    tags: body.tags || null,
    youtube_url: body.youtube_url || null,
    featured_image: featuredImage,
    status: body.status,
  });

  return repository.getNewsById(id);
};

/* ---------------- DELETE ---------------- */

export const remove = async (id: number) => {
  const news = await repository.getNewsById(id);

  if (!news) return;

  if (news.featured_image) {
    const filePath = path.join(process.cwd(), news.featured_image);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  await repository.deleteNews(id);
};

export const getNewsByCategory = async (slug: string) => {
  const [rows] = await pool.query(
    `
    SELECT
        n.*,
        c.name AS category_name,
        s.name AS sub_category_name
    FROM news n
    INNER JOIN categories c
        ON n.category_id = c.id
    LEFT JOIN subcategories s
        ON n.sub_category_id = s.id
    WHERE c.slug = ?
    ORDER BY n.created_at DESC
    `,
    [slug],
  );

  return rows;
};