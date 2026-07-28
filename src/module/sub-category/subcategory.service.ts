import slugify from "slugify";

import {
  createSubcategory,
  deleteSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  getSubcategoryBySlug,
  updateSubcategory,
  updateSubcategoryStatus,
} from "./subcategory.repository";

export const createSubcategoryService = async (data: any) => {
  if (!data.name?.trim()) {
    throw new Error("Subcategory name is required.");
  }

  if (!data.category_id) {
    throw new Error("Category is required.");
  }

  const slug = slugify(data.name, {
    lower: true,
    strict: true,
    trim: true,
  });

  const existing = await getSubcategoryBySlug(slug);

  if (existing) {
    throw new Error("Subcategory already exists.");
  }

  const id = await createSubcategory({
    ...data,

    slug,

    image: data.image ?? null,

    description: data.description ?? null,

    status: data.status ?? "active",

    sort_order: data.sort_order ?? 0,
  });

  return getSubcategoryById(id);
};

export const getAllSubcategoriesService = async () => {
  return getAllSubcategories();
};

export const getSubcategoryByIdService = async (id: number) => {
  const subcategory = await getSubcategoryById(id);

  if (!subcategory) {
    throw new Error("Subcategory not found.");
  }

  return subcategory;
};

export const updateSubcategoryService = async (id: number, data: any) => {
  const subcategory = await getSubcategoryById(id);

  if (!subcategory) {
    throw new Error("Subcategory not found.");
  }

  const slug = slugify(data.name, {
    lower: true,
    strict: true,
    trim: true,
  });

  const existing = await getSubcategoryBySlug(slug);

  if (existing && existing.id !== id) {
    throw new Error("Subcategory already exists.");
  }

  await updateSubcategory(id, {
    ...data,
    slug,
    image: data.image ?? null,
    description: data.description ?? null,
    status: data.status ?? "active",
    sort_order: data.sort_order ?? 0,
  });

  return getSubcategoryById(id);
};

export const updateSubcategoryStatusService = async (
  id: number,
  status: string,
) => {
  const subcategory = await getSubcategoryById(id);

  if (!subcategory) {
    throw new Error("Subcategory not found.");
  }

  await updateSubcategoryStatus(id, status);

  return getSubcategoryById(id);
};

export const deleteSubcategoryService = async (id: number) => {
  const subcategory = await getSubcategoryById(id);

  if (!subcategory) {
    throw new Error("Subcategory not found.");
  }

  await deleteSubcategory(id);
};
