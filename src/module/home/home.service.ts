import db from "../../config/db";

export const getHome = async () => {
  // Hero Slider
  const [hero] = await db.query(`
      SELECT
          n.id,
          n.title,
          n.slug,
          n.short_description,
          n.featured_image,
          c.name category_name,
          c.slug category_slug
      FROM news n
      JOIN categories c ON c.id=n.category_id
      WHERE
          n.status='published'
          AND n.is_featured=1
      ORDER BY n.published_at DESC
      LIMIT 5
  `);

  // Breaking
  const [breaking] = await db.query(`
      SELECT
          id,
          title,
          slug
      FROM news
      WHERE
          status='published'
          AND is_breaking=1
      ORDER BY published_at DESC
      LIMIT 10
  `);

  // Latest
  const [latest] = await db.query(`
      SELECT
          n.id,
          n.title,
          n.slug,
          n.short_description,
          n.featured_image,
          c.name category_name,
          c.slug category_slug
      FROM news n
      JOIN categories c ON c.id=n.category_id
      WHERE n.status='published'
      ORDER BY n.published_at DESC
      LIMIT 12
  `);

  // Trending
  const [trending] = await db.query(`
      SELECT
          id,
          title,
          slug,
          featured_image,
          views
      FROM news
      WHERE status='published'
      ORDER BY views DESC
      LIMIT 8
  `);

  // Sidebar Latest
  const [sidebarLatest] = await db.query(`
      SELECT
          id,
          title,
          slug
      FROM news
      WHERE status='published'
      ORDER BY published_at DESC
      LIMIT 8
  `);

  // Homepage Ads
  // Advertisements
  const [ads]: any = await db.query(`
    SELECT *
    FROM advertisements
    WHERE
        status='active'
        AND (
            start_date IS NULL OR start_date <= NOW()
        )
        AND (
            end_date IS NULL OR end_date >= NOW()
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

  // Category Sections
  const [categories]: any = await db.query(`
      SELECT
          id,
          name,
          slug
      FROM categories
      WHERE status='active'
      ORDER BY sort_order
      LIMIT 6
  `);

  const categorySections = [];

  for (const category of categories) {
    const [news]: any = await db.query(
      `
      SELECT
          id,
          title,
          slug,
          featured_image,
          short_description
      FROM news
      WHERE
          category_id=?
          AND status='published'
      ORDER BY published_at DESC
      LIMIT 6
      `,
      [category.id],
    );

    categorySections.push({
      category,
      news,
    });
  }

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
};;