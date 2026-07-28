import slugify from "slugify";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  updateCategoryStatus,
} from "./category.repository";

export const createCategoryService = async (data: any) => {
  if (!data.name?.trim()) {
    throw new Error("Category name is required.");
  }

  const slug = slugify(data.name, {
    lower: true,
    strict: true,
    trim: true,
  });

  const existing = await getCategoryBySlug(slug);

  if (existing) {
    throw new Error("Category already exists.");
  }

  const id = await createCategory({
    ...data,
    slug,
    image: data.image ?? null,
    description: data.description ?? null,
    status: data.status ?? "active",
    sort_order: data.sort_order ?? 0,
  });

  return getCategoryById(id);
};

export const getAllCategoriesService = async () => {
  return getAllCategories();
};

export const getCategoryByIdService = async (id: number) => {
  const category = await getCategoryById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  return category;
};

export const updateCategoryService = async (
  id: number,
  data: any
) => {
  const category = await getCategoryById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  if (!data.name?.trim()) {
    throw new Error("Category name is required.");
  }

  const slug = slugify(data.name, {
    lower: true,
    strict: true,
    trim: true,
  });

  const existing = await getCategoryBySlug(slug);

  if (existing && existing.id !== id) {
    throw new Error("Category already exists.");
  }

  await updateCategory(id, {
    ...data,
    slug,
    image: data.image ?? null,
    description: data.description ?? null,
    status: data.status ?? "active",
    sort_order: data.sort_order ?? 0,
  });

  return getCategoryById(id);
};

export const updateCategoryStatusService = async (
  id: number,
  status: string
) => {
  const category = await getCategoryById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  await updateCategoryStatus(id, status);

  return getCategoryById(id);
};

export const deleteCategoryService = async (
  id: number
) => {
  const category = await getCategoryById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  await deleteCategory(id);
};