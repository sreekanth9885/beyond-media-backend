import { Request, Response } from "express";
import * as service from "./news.service";

export const createNews = async (req: Request, res: Response) => {
  const news = await service.create(req.body, req.file);

  res.status(201).json({
    success: true,
    data: news,
  });
};

export const getNews = async (req: Request, res: Response) => {
  const result = await service.getAll(req.query);

  res.json({
    success: true,
    ...result,
  });
};

export const getSingleNews = async (req: Request, res: Response) => {
  const news = await service.getOne(Number(req.params.id));

  if (!news)
    return res.status(404).json({
      success: false,
      message: "News not found",
    });

  res.json({
    success: true,
    data: news,
  });
};
export const updateNews = async (req: Request, res: Response) => {
  const news = await service.update(Number(req.params.id), req.body, req.file);

  if (!news) {
    return res.status(404).json({
      success: false,
      message: "News not found",
    });
  }

  res.json({
    success: true,
    message: "News updated successfully.",
    data: news,
  });
};
export const deleteNews = async (req: Request, res: Response) => {
  await service.remove(Number(req.params.id));

  res.json({
    success: true,
    message: "Deleted successfully",
  });
};
export const getNewsByCategory = async (req: Request, res: Response) => {
  try {
    const slugParam = req.params.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

    const news = await service.getNewsByCategory(slug);

    return res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch category news",
    });
  }
};

export const getNewsBySlug = async (req: Request, res: Response) => {
  try {
    const slugParam = req.params.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

    const news = await service.getNewsBySlug(slug);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    return res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch news",
    });
  }
};
export const changeNewsStatus = async (req: Request, res: Response) => {
  const { status } = req.body;

  if (!["draft", "published"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status",
    });
  }

  const news = await service.changeStatus(Number(req.params.id), status);

  if (!news) {
    return res.status(404).json({
      success: false,
      message: "News not found",
    });
  }

  res.json({
    success: true,
    message: "Status updated successfully",
    data: news,
  });
};
export const getNewsDetails = async (req: Request, res: Response) => {
  try {
    const slugParam = req.params.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    const data = await service.getNewsDetails(slug);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load news",
    });
  }
};