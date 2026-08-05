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
    is_featured: Number(body.is_featured),
    is_breaking: Number(body.is_breaking),
    published_at: body.published_at || null,
  });

  return repository.getNewsById(id);
};

export const getAll = (query: any) => {
  return repository.getAllNews(query);
};

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
    is_featured: Number(body.is_featured),
    is_breaking: Number(body.is_breaking),
    published_at: body.published_at || null,
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

export const getNewsBySlug = async (slug: string) => {
  const [rows]: any = await pool.query(
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
      WHERE n.slug = ?
      LIMIT 1
      `,
    [slug],
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
};

export const changeStatus = async (
  id: number,
  status: "draft" | "published",
) => {
  const news = await repository.getNewsById(id);

  if (!news) {
    return null;
  }

  await repository.updateNewsStatus(id, status);

  return repository.getNewsById(id);
};
export const getNewsDetails = async (slug: string) => {
  // Main News
  const [rows]: any = await pool.query(
    `
    SELECT
        n.*,
        c.name category_name,
        c.slug category_slug,
        s.name sub_category_name,
        s.slug sub_category_slug
    FROM news n
    INNER JOIN categories c
        ON c.id=n.category_id
    INNER JOIN subcategories s
        ON s.id=n.sub_category_id
    WHERE
        n.slug=?
        AND n.status='published'
    LIMIT 1
    `,
    [slug],
  );

  if (!rows.length) {
    return null;
  }

  const news = rows[0];

  // Increase Views
  await pool.query(
    `
    UPDATE news
    SET views=views+1
    WHERE id=?
    `,
    [news.id],
  );

  news.views += 1;

  // Related News
  const [related] = await pool.query(
    `
    SELECT
        id,
        title,
        slug,
        featured_image,
        short_description,
        published_at
    FROM news
    WHERE
        category_id=?
        AND id<>?
        AND status='published'
    ORDER BY published_at DESC
    LIMIT 6
    `,
    [news.category_id, news.id],
  );

  // Previous News
  const [previous]: any = await pool.query(
    `
    SELECT
        id,
        title,
        slug
    FROM news
    WHERE
        id<?
        AND status='published'
    ORDER BY id DESC
    LIMIT 1
    `,
    [news.id],
  );

  // Next News
  const [next]: any = await pool.query(
    `
    SELECT
        id,
        title,
        slug
    FROM news
    WHERE
        id>?
        AND status='published'
    ORDER BY id ASC
    LIMIT 1
    `,
    [news.id],
  );

  // Sidebar Latest
  const [latest] = await pool.query(
    `
    SELECT
        id,
        title,
        slug
    FROM news
    WHERE status='published'
    ORDER BY published_at DESC
    LIMIT 8
    `,
  );

  // Sidebar Trending
  const [trending] = await pool.query(
    `
    SELECT
        id,
        title,
        slug,
        views
    FROM news
    WHERE status='published'
    ORDER BY views DESC
    LIMIT 8
    `,
  );

  // News Ads
  const [ads] = await pool.query(
    `
    SELECT *
    FROM advertisements
    WHERE
        status='active'
        AND position IN
        (
            'news_top',
            'news_middle',
            'news_bottom'
        )
    ORDER BY sort_order
    `,
  );

  return {
    news,

    previous: previous[0] || null,

    next: next[0] || null,

    related,

    sidebar: {
      latest,
      trending,
    },

    advertisements: ads,
  };
};