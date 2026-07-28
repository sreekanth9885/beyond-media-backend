import db from "../../config/db";

export const createCategory = async (data: any) => {
  const [result]: any = await db.execute(
    `INSERT INTO categories
    (
      name,
      slug,
      description,
      image,
      status,
      sort_order
    )
    VALUES (?,?,?,?,?,?)`,
    [
      data.name,
      data.slug,
      data.description,
      data.image,
      data.status,
      data.sort_order,
    ]
  );

  return result.insertId;
};

export const getAllCategories = async () => {
  const [rows] = await db.execute(
    `SELECT *
     FROM categories
     ORDER BY sort_order ASC, id DESC`
  );

  return rows;
};

export const getCategoryById = async (id: number) => {
  const [rows]: any = await db.execute(
    `SELECT *
     FROM categories
     WHERE id=?`,
    [id]
  );

  return rows[0];
};

export const getCategoryBySlug = async (slug: string) => {
  const [rows]: any = await db.execute(
    `SELECT *
     FROM categories
     WHERE slug=?`,
    [slug]
  );

  return rows[0];
};

export const updateCategory = async (
  id: number,
  data: any
) => {
  await db.execute(
    `UPDATE categories SET
      name=?,
      slug=?,
      description=?,
      image=?,
      status=?,
      sort_order=?
    WHERE id=?`,
    [
      data.name,
      data.slug,
      data.description,
      data.image,
      data.status,
      data.sort_order,
      id,
    ]
  );
};

export const updateCategoryStatus = async (
  id: number,
  status: string
) => {
  await db.execute(
    `UPDATE categories
     SET status=?
     WHERE id=?`,
    [status, id]
  );
};

export const deleteCategory = async (
  id: number
) => {
  await db.execute(
    `DELETE FROM categories
     WHERE id=?`,
    [id]
  );
};