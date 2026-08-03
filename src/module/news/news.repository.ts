import db from "../../config/db";

export const createNews = async (data: any) => {
  const [result]: any = await db.execute(
    `INSERT INTO news
  (
    title,
    slug,
    category_id,
    sub_category_id,
    short_description,
    content,
    tags,
    youtube_url,
    featured_image,
    status
  )
  VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [
      data.title,
      data.slug,
      data.category_id,
      data.sub_category_id,
      data.short_description,
      data.content,
      data.tags,
      data.youtube_url,
      data.featured_image,
      data.status,
    ],
  );

  return result.insertId;
};

export const getAllNews = async () => {
  const [rows] = await db.execute(`
      SELECT
          n.*,
          c.name AS category_name,
          s.name AS sub_category_name
      FROM news n
      LEFT JOIN categories c
          ON n.category_id = c.id
      LEFT JOIN subcategories s
          ON n.sub_category_id = s.id
      ORDER BY n.id DESC
  `);

  return rows;
};

export const getNewsById = async (id: number) => {
  const [rows]: any = await db.execute(
    `SELECT *
     FROM news
     WHERE id=?`,
    [id],
  );

  return rows[0];
};

export const updateNews = async (id: number, data: any) => {
  await db.execute(
    `UPDATE news SET
      title=?,
      slug=?,
      category_id=?,
      sub_category_id=?,
      short_description=?,
      content=?,
      tags=?,
      youtube_url=?,
      featured_image=?,
      status=?
   WHERE id=?`,
    [
      data.title,
      data.slug,
      data.category_id,
      data.sub_category_id,
      data.short_description,
      data.content,
      data.tags,
      data.youtube_url,
      data.featured_image,
      data.status,
      id,
    ],
  );
};

export const deleteNews = async (id: number) => {
  await db.execute(
    `DELETE FROM news WHERE id=?`,
    [id]
  );
};