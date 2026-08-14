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
      c.slug AS category_slug,
      creator.name AS created_by_name,
      updater.name AS updated_by_name
    FROM news n
    JOIN categories c ON c.id = n.category_id
    LEFT JOIN users creator ON creator.id = n.created_by
    LEFT JOIN users updater ON updater.id = n.updated_by
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
      n.id,
      n.title,
      n.slug,
      n.youtube_url,
      n.published_at,
      creator.name AS created_by_name,
      updater.name AS updated_by_name
    FROM news n
    LEFT JOIN users creator ON creator.id = n.created_by
    LEFT JOIN users updater ON updater.id = n.updated_by
    WHERE
      n.status = 'published'
      AND n.is_breaking = 1
    ORDER BY n.published_at DESC
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
      n.views,
      n.sub_category_id,
      n.published_at,
      c.name AS category_name,
      c.slug AS category_slug,
      creator.name AS created_by_name,
      updater.name AS updated_by_name
    FROM news n
    JOIN categories c ON c.id = n.category_id
    LEFT JOIN users creator ON creator.id = n.created_by
    LEFT JOIN users updater ON updater.id = n.updated_by
    WHERE
      n.status = 'published'
    ORDER BY n.published_at DESC
    LIMIT 8
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
      c.slug AS category_slug,
      creator.name AS created_by_name,
      updater.name AS updated_by_name
    FROM news n
    JOIN categories c ON c.id = n.category_id
    LEFT JOIN users creator ON creator.id = n.created_by
    LEFT JOIN users updater ON updater.id = n.updated_by
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
      n.id,
      n.title,
      n.slug,
      n.youtube_url,
      n.published_at,
      creator.name AS created_by_name,
      updater.name AS updated_by_name
    FROM news n
    LEFT JOIN users creator ON creator.id = n.created_by
    LEFT JOIN users updater ON updater.id = n.updated_by
    WHERE
      n.status = 'published'
    ORDER BY n.published_at DESC
    LIMIT 8
  `);

  // =========================================================
  // ADVERTISEMENTS – includes all positions
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

  // Initialise all advertisement positions (add new ones)
  const advertisements = {
    homepage_top: [],
    homepage_middle: [],
    homepage_bottom: [],
    homepage_left: [], // new
    homepage_right: [], // new
    homepage_down: [], // new
    sidebar_top: [],
    sidebar_bottom: [],
    news_top: [],
    news_middle: [],
    news_bottom: [],
    // you can also include popup here if needed, but it's not used on the home page
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
        c.slug AS category_slug,
        creator.name AS created_by_name,
        updater.name AS updated_by_name
      FROM news n
      JOIN categories c ON c.id = n.category_id
      LEFT JOIN users creator ON creator.id = n.created_by
      LEFT JOIN users updater ON updater.id = n.updated_by
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
    advertisements, // now includes all positions (including left, right, down)
    categories: categorySections,
    sidebar: {
      latest: sidebarLatest,
    },
  };
};
