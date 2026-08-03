import slugify from "slugify";
import fs from "fs";
import path from "path";

import * as repository from "./advertisement.repository";

export const create = async (
  body: any,
  file?: Express.Multer.File
) => {
  const id = await repository.createAdvertisement({
    title: body.title,
    image: file ? `/uploads/advertisements/${file.filename}` : null,
    target_url: body.target_url,
    position: body.position,
    category_id: body.category_id,
    sub_category_id: body.sub_category_id,
    start_date: body.start_date,
    end_date: body.end_date,
    sort_order: body.sort_order || 0,
    status: body.status || "active",
  });

  return repository.getAdvertisementById(id);
};

export const getAll = () =>
  repository.getAllAdvertisements();

export const getOne = (id: number) =>
  repository.getAdvertisementById(id);

export const getByPosition = (
  position: string
) =>
  repository.getAdvertisementsByPosition(position);

export const update = async (
  id: number,
  body: any,
  file?: Express.Multer.File
) => {
  const advertisement =
    await repository.getAdvertisementById(id);

  if (!advertisement) {
    throw new Error("Advertisement not found");
  }

  let image = advertisement.image;

  if (file) {
    // delete old image
    if (advertisement.image) {
      const oldImagePath = path.join(
        process.cwd(),
        advertisement.image
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    image = `/uploads/advertisements/${file.filename}`;
  }

  await repository.updateAdvertisement(id, {
    title: body.title,
    image,
    target_url: body.target_url,
    position: body.position,
    category_id: body.category_id,
    sub_category_id: body.sub_category_id,
    start_date: body.start_date,
    end_date: body.end_date,
    sort_order: body.sort_order,
    status: body.status,
  });

  return repository.getAdvertisementById(id);
};

export const remove = async (
  id: number
) => {
  const advertisement =
    await repository.getAdvertisementById(id);

  if (!advertisement) return;

  if (advertisement.image) {
    const imagePath = path.join(
      process.cwd(),
      advertisement.image
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await repository.deleteAdvertisement(id);
};