import { Request, Response } from "express";
import * as service from "./news.service";

export const createNews = async (
  req: Request,
  res: Response
) => {

  const news = await service.create(
    req.body,
    req.file
  );

  res.status(201).json({
    success: true,
    data: news,
  });
};

export const getNews = async (
  req: Request,
  res: Response
) => {

  const news = await service.getAll();

  res.json({
    success: true,
    data: news,
  });
};

export const getSingleNews = async (
  req: Request,
  res: Response
) => {

  const news = await service.getOne(
    Number(req.params.id)
  );

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

export const deleteNews = async (
  req: Request,
  res: Response
) => {

  await service.remove(
    Number(req.params.id)
  );

  res.json({
    success: true,
    message: "Deleted successfully",
  });
};