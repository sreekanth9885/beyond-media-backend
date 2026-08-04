import db from "../../config/db";

export const createAdvertisement = async (data: any) => {
  const [result]: any = await db.execute(
    `
    INSERT INTO advertisements (
      title,
      image,
      target_url,
      position,
      category_id,
      sub_category_id,
      start_date,
      end_date,
      sort_order,
      status
    )
    VALUES (?,?,?,?,?,?,?,?,?,?)
    `,
    [
      data.title,
      data.image,
      data.target_url,
      data.position,
      data.category_id || null,
      data.sub_category_id || null,
      data.start_date || null,
      data.end_date || null,
      data.sort_order || 0,
      data.status,
    ],
  );

  return result.insertId;
};

export const getAllAdvertisements = async () => {
  const [rows] = await db.execute(
    `
    SELECT
      a.*,
      c.name AS category_name,
      s.name AS sub_category_name
    FROM advertisements a
    LEFT JOIN categories c
      ON a.category_id = c.id
    LEFT JOIN subcategories s
      ON a.sub_category_id = s.id
    ORDER BY a.sort_order ASC, a.id DESC
    `,
  );

  return rows;
};

export const getAdvertisementById = async (id: number) => {
  const [rows]: any = await db.execute(
    `
    SELECT
      a.*,
      c.name AS category_name,
      s.name AS sub_category_name
    FROM advertisements a
    LEFT JOIN categories c
      ON a.category_id = c.id
    LEFT JOIN subcategories s
      ON a.sub_category_id = s.id
    WHERE a.id=?
    `,
    [id],
  );

  return rows[0];
};

export const getAdvertisementsByPosition = async (position: string) => {
  const [rows] = await db.execute(
    `
    SELECT
      a.*,
      c.name AS category_name,
      s.name AS sub_category_name
    FROM advertisements a
    LEFT JOIN categories c
      ON a.category_id = c.id
    LEFT JOIN subcategories s
      ON a.sub_category_id = s.id
    WHERE
a.position=?
AND a.status='active'
    ORDER BY a.sort_order ASC
    `,
    [position],
  );

  return rows;
};

export const updateAdvertisement = async (id: number, data: any) => {
  await db.execute(
    `
    UPDATE advertisements
    SET
      title=?,
      image=?,
      target_url=?,
      position=?,
      category_id=?,
      sub_category_id=?,
      start_date=?,
      end_date=?,
      sort_order=?,
      status=?
    WHERE id=?
    `,
    [
      data.title,
      data.image,
      data.target_url,
      data.position,
      data.category_id || null,
      data.sub_category_id || null,
      data.start_date || null,
      data.end_date || null,
      data.sort_order || 0,
      data.status,
      id,
    ],
  );
};

export const deleteAdvertisement = async (id: number) => {
  await db.execute(
    `
    DELETE FROM advertisements
    WHERE id=?
    `,
    [id],
  );
};
