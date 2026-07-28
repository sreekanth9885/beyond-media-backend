import db from "../../config/db";

export const createSubcategory = async (data: any) => {
  const [result]: any = await db.execute(
    `
 INSERT INTO subcategories
 (
  category_id,
  name,
  slug,
  description,
  image,
  status,
  sort_order
 )
 VALUES(?,?,?,?,?,?,?)
 `,
    [
      data.category_id,
      data.name,
      data.slug,
      data.description,
      data.image,
      data.status,
      data.sort_order,
    ],
  );

  return result.insertId;
};

export const getAllSubcategories = async () => {
  const [rows] = await db.execute(
    `
 SELECT 
 s.*,
 c.name AS category_name

 FROM subcategories s

 LEFT JOIN categories c
 ON c.id=s.category_id

 ORDER BY s.sort_order ASC, s.id DESC
 `,
  );

  return rows;
};

export const getSubcategoryById = async (id: number) => {
  const [rows]: any = await db.execute(
    `
 SELECT 
 s.*,
 c.name AS category_name

 FROM subcategories s

 LEFT JOIN categories c
 ON c.id=s.category_id

 WHERE s.id=?
 `,
    [id],
  );

  return rows[0];
};

export const getSubcategoryBySlug = async (slug: string) => {
  const [rows]: any = await db.execute(
    `
 SELECT *
 FROM subcategories
 WHERE slug=?
 `,
    [slug],
  );

  return rows[0];
};

export const updateSubcategory = async (id: number, data: any) => {
  await db.execute(
    `
 UPDATE subcategories SET

 category_id=?,
 name=?,
 slug=?,
 description=?,
 image=?,
 status=?,
 sort_order=?

 WHERE id=?

 `,
    [
      data.category_id,
      data.name,
      data.slug,
      data.description,
      data.image,
      data.status,
      data.sort_order,
      id,
    ],
  );
};

export const updateSubcategoryStatus = async (id: number, status: string) => {
  await db.execute(
    `
 UPDATE subcategories
 SET status=?
 WHERE id=?
 `,
    [status, id],
  );
};

export const deleteSubcategory = async (id: number) => {
  await db.execute(
    `
 DELETE FROM subcategories
 WHERE id=?
 `,
    [id],
  );
};
