import { Request, Response } from "express";
import db from "../../config/db";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const [rows] = await db.query(`
      SELECT
        (SELECT COUNT(*) FROM news) AS totalNews,
        (SELECT COUNT(*) FROM news WHERE status = 'published') AS publishedNews,
        (SELECT COUNT(*) FROM news WHERE status = 'draft') AS draftNews,
        (SELECT COUNT(*) FROM categories) AS categories,
        (SELECT COUNT(*) FROM users) AS users
    `);

    const stats = (rows as any[])[0];

    res.json({
      success: true,
      data: {
        totalNews: Number(stats.totalNews),
        publishedNews: Number(stats.publishedNews),
        draftNews: Number(stats.draftNews),
        categories: Number(stats.categories),
        users: Number(stats.users),
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};