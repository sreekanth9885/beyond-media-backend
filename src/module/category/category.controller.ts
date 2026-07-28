import { Request, Response } from "express";

import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  updateCategoryStatusService,
} from "./category.service";

export const createCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const category = await createCategoryService(req.body);

    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: category,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await getAllCategoriesService();

    res.json({
      success: true,
      message: "Categories fetched successfully.",
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
) => {
  try {
    const category = await getCategoryByIdService(
      Number(req.params.id)
    );

    res.json({
      success: true,
      message: "Category fetched successfully.",
      data: category,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const category = await updateCategoryService(
      Number(req.params.id),
      req.body
    );

    res.json({
      success: true,
      message: "Category updated successfully.",
      data: category,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCategoryStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const category = await updateCategoryStatusService(
      Number(req.params.id),
      req.body.status
    );

    res.json({
      success: true,
      message: "Category status updated successfully.",
      data: category,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteCategoryService(
      Number(req.params.id)
    );

    res.json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};