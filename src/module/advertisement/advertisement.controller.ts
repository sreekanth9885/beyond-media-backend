import { Request, Response } from "express";
import * as service from "./advertisement.service";

export const createAdvertisement = async (
  req: Request,
  res: Response
) => {
    console.log("====== CREATE ADVERTISEMENT ======");
  console.log(req.method);
  console.log(req.originalUrl);
  console.log(req.headers);

  try {
    const advertisement = await service.create(
      req.body,
      req.file
    );

    return res.status(201).json({
      success: true,
      message: "Advertisement created successfully.",
      data: advertisement,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create advertisement.",
    });
  }
};

export const getAdvertisements = async (
  req: Request,
  res: Response
) => {
  try {
    const advertisements = await service.getAll();

    return res.json({
      success: true,
      data: advertisements,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleAdvertisement = async (
  req: Request,
  res: Response
) => {
  try {
    const advertisement = await service.getOne(
      Number(req.params.id)
    );

    if (!advertisement) {
      return res.status(404).json({
        success: false,
        message: "Advertisement not found.",
      });
    }

    return res.json({
      success: true,
      data: advertisement,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdvertisementsByPosition = async (
  req: Request,
  res: Response
) => {
  try {
    const advertisements =
      await service.getByPosition(
        req.params.position as string
      );

    return res.json({
      success: true,
      data: advertisements,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAdvertisement = async (
  req: Request,
  res: Response
) => {
  try {
    const advertisement =
      await service.update(
        Number(req.params.id),
        req.body,
        req.file
      );

    return res.json({
      success: true,
      message: "Advertisement updated successfully.",
      data: advertisement,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAdvertisement = async (
  req: Request,
  res: Response
) => {
  try {
    await service.remove(
      Number(req.params.id)
    );

    return res.json({
      success: true,
      message: "Advertisement deleted successfully.",
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};