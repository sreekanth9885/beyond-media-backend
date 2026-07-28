import { Request, Response } from "express";

import {
  createSubcategoryService,
  deleteSubcategoryService,
  getAllSubcategoriesService,
  getSubcategoryByIdService,
  updateSubcategoryService,
  updateSubcategoryStatusService,
} from "./subcategory.service";

export const createSubcategory = async (req: Request, res: Response) => {
  try {
    const subcategory = await createSubcategoryService(req.body);

    res.status(201).json({
      success: true,
      message: "Subcategory created successfully.",
      data: subcategory,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllSubcategories = async (req: Request, res: Response) => {
  try {
    const subcategories = await getAllSubcategoriesService();

    res.json({
      success: true,
      message: "Subcategories fetched successfully.",
      data: subcategories,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSubcategoryById = async (req: Request, res: Response) => {
  try {
    const subcategory = await getSubcategoryByIdService(Number(req.params.id));

    res.json({
      success: true,
      message: "Subcategory fetched successfully.",
      data: subcategory,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSubcategory = async (req: Request, res: Response) => {
  try {
    const subcategory = await updateSubcategoryService(
      Number(req.params.id),
      req.body,
    );

    res.json({
      success: true,
      message: "Subcategory updated successfully.",
      data: subcategory,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSubcategoryStatus = async (req: Request, res: Response) => {
  try {
    const subcategory = await updateSubcategoryStatusService(
      Number(req.params.id),
      req.body.status,
    );

    res.json({
      success: true,
      message: "Subcategory status updated successfully.",
      data: subcategory,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSubcategory = async (req: Request, res: Response) => {
  try {
    await deleteSubcategoryService(Number(req.params.id));

    res.json({
      success: true,
      message: "Subcategory deleted successfully.",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
