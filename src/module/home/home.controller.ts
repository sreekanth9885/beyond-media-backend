import { Request, Response } from "express";
import * as service from "./home.service";

export const getHome = async (_req: Request, res: Response) => {
  const data = await service.getHome();

  res.json({
    success: true,
    data,
  });
};