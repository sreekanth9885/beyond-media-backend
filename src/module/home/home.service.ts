import db from "../../config/db";

export const getHome = async () => {
  // =========================================================
  // HERO SLIDER
  // =========================================================
  const [hero] = await db.query(`
    SELECT
      n.id,
      n.title,
      n.slug,
      n.short_description,
      n.content,
      n.featured_image,
      n.youtube_url,
      n.category_id,
      n.sub_category_id,
      n.is_featured,
      n.is_breaking,
      n.views,
      n.published_at,
      c.name AS category_name,
      c.slug AS category_slug
    FROM news n
    JOIN categories c
      ON c.id = n.category_id
    WHERE
      n.status = 'published'
      AND n.is_featured = 1
    ORDER BY n.published_at DESC
    LIMIT 10
  `);

  // =========================================================
  // BREAKING NEWS
  // =========================================================
  const [breaking] = await db.query(`
    SELECT
      id,
      title,
      slug,
      youtube_url,
      published_at
    FROM news
    WHERE
      status = 'published'
      AND is_breaking = 1
    ORDER BY published_at DESC
    LIMIT 10
  `);

  // =========================================================
  // LATEST NEWS
  // =========================================================
  const [latest] = await db.query(`
    SELECT
      n.id,
      n.title,
      n.slug,
      n.short_description,
      n.featured_image,
      n.youtube_url,
      n.category_id,
      n.sub_category_id,
      n.published_at,
      c.name AS category_name,
      c.slug AS category_slug
    FROM news n
    JOIN categories c
      ON c.id = n.category_id
    WHERE
      n.status = 'published'
    ORDER BY n.published_at DESC
    LIMIT 12
  `);

  // =========================================================
  // TRENDING
  // =========================================================
  const [trending] = await db.query(`
    SELECT
      n.id,
      n.title,
      n.slug,
      n.short_description,
      n.featured_image,
      n.youtube_url,
      n.category_id,
      n.views,
      n.published_at,
      c.name AS category_name,
      c.slug AS category_slug
    FROM news n
    JOIN categories c
      ON c.id = n.category_id
    WHERE
      n.status = 'published'
    ORDER BY n.views DESC
    LIMIT 8
  `);

  // =========================================================
  // SIDEBAR LATEST
  // =========================================================
  const [sidebarLatest] = await db.query(`
    SELECT
      id,
      title,
      slug,
      youtube_url,
      published_at
    FROM news
    WHERE
      status = 'published'
    ORDER BY published_at DESC
    LIMIT 8
  `);

  // =========================================================
  // ADVERTISEMENTS
  // =========================================================
  const [ads]: any = await db.query(`
    SELECT *
    FROM advertisements
    WHERE
      status = 'active'
      AND (
        start_date IS NULL
        OR start_date <= NOW()
      )
      AND (
        end_date IS NULL
        OR end_date >= NOW()
      )
    ORDER BY
      position,
      sort_order ASC,
      id DESC
  `);

  const advertisements = {
    homepage_top: [],
    homepage_middle: [],
    homepage_bottom: [],
    sidebar_top: [],
    sidebar_bottom: [],
    news_top: [],
    news_middle: [],
    news_bottom: [],
  } as Record<string, any[]>;

  for (const ad of ads) {
    if (advertisements[ad.position]) {
      advertisements[ad.position].push(ad);
    }
  }

  // =========================================================
  // CATEGORY SECTIONS
  // =========================================================
  const [categories]: any = await db.query(`
    SELECT
      id,
      name,
      slug
    FROM categories
    WHERE
      status = 'active'
    ORDER BY sort_order
    LIMIT 6
  `);

  const categorySections = [];

  for (const category of categories) {
    const [news]: any = await db.query(
      `
      SELECT
        n.id,
        n.title,
        n.slug,
        n.featured_image,
        n.short_description,
        n.youtube_url,
        n.category_id,
        n.sub_category_id,
        n.published_at,
        c.name AS category_name,
        c.slug AS category_slug
      FROM news n
      JOIN categories c
        ON c.id = n.category_id
      WHERE
        n.category_id = ?
        AND n.status = 'published'
      ORDER BY n.published_at DESC
      LIMIT 6
      `,
      [category.id],
    );

    categorySections.push({
      category,
      news,
    });
  }

  // =========================================================
  // RESPONSE
  // =========================================================
  return {
    hero,
    breaking,
    latest,
    trending,
    advertisements,
    categories: categorySections,
    sidebar: {
      latest: sidebarLatest,
    },
  };
};