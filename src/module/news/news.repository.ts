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
    status,
    is_featured,
is_breaking,
published_at
  )
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
      data.is_featured,
      data.is_breaking,
      data.published_at,
    ],
  );

  return result.insertId;
};

export const getAllNews = async (filters: any) => {
  const page = Number(filters.page || 1);
  const limit = Number(filters.limit || 10);
  const offset = (page - 1) * limit;

  let where = "WHERE 1=1";
  const params: any[] = [];

  if (filters.search) {
    where += ` AND (
      n.title LIKE ?
      OR n.short_description LIKE ?
      OR n.tags LIKE ?
    )`;

    const keyword = `%${filters.search}%`;

    params.push(keyword, keyword, keyword);
  }

  if (filters.category_id) {
    where += ` AND n.category_id=?`;
    params.push(filters.category_id);
  }

  if (filters.sub_category_id) {
    where += ` AND n.sub_category_id=?`;
    params.push(filters.sub_category_id);
  }

  if (filters.status) {
    where += ` AND n.status=?`;
    params.push(filters.status);
  }

  const [countRows]: any = await db.execute(
    `
    SELECT COUNT(*) total
    FROM news n
    ${where}
    `,
    params,
  );

  const total = countRows[0].total;

  params.push(offset, limit);

  const [rows] = await db.query(
    `
  SELECT
      n.*,
      c.name AS category_name,
      s.name AS sub_category_name
  FROM news n
  LEFT JOIN categories c
      ON c.id = n.category_id
  LEFT JOIN subcategories s
      ON s.id = n.sub_category_id

  ${where}

  ORDER BY n.created_at DESC

  LIMIT ${offset}, ${limit}
  `,
    params,
  );

  return {
    data: rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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
      status=?,
      is_featured=?,
is_breaking=?,
published_at=?
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
      data.is_featured,
      data.is_breaking,
      data.published_at,
      id,
    ],
  );
};

export const deleteNews = async (id: number) => {
  await db.execute(`DELETE FROM news WHERE id=?`, [id]);
};

export const updateNewsStatus = async (
  id: number,
  status: "draft" | "published",
) => {
  const [result]: any = await db.execute(
    `
    UPDATE news
    SET
      status = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
    `,
    [status, id],
  );

  return result.affectedRows;
};