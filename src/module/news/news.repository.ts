import db from "../../config/db";

export const createNews = async (data: any) => {
  const [result]: any = await db.execute(
    `INSERT INTO news
    (
      title,
      slug,
      short_description,
      content,
      featured_image,
      status
    )
    VALUES (?,?,?,?,?,?)`,
    [
      data.title,
      data.slug,
      data.short_description,
      data.content,
      data.featured_image,
      data.status,
    ]
  );

  return result.insertId;
};

export const getAllNews = async () => {
  const [rows] = await db.execute(
    `SELECT *
     FROM news
     ORDER BY id DESC`
  );

  return rows;
};

export const getNewsById = async (id: number) => {
  const [rows]: any = await db.execute(
    `SELECT *
     FROM news
     WHERE id=?`,
    [id]
  );

  return rows[0];
};

export const updateNews = async (id: number, data: any) => {
  await db.execute(
    `UPDATE news SET
      title=?,
      slug=?,
      short_description=?,
      content=?,
      featured_image=?,
      status=?
      WHERE id=?`,
    [
      data.title,
      data.slug,
      data.short_description,
      data.content,
      data.featured_image,
      data.status,
      id,
    ]
  );
};

export const deleteNews = async (id: number) => {
  await db.execute(
    `DELETE FROM news WHERE id=?`,
    [id]
  );
};