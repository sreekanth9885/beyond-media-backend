import slugify from "slugify";
import fs from "fs";
import path from "path";

import * as repository from "./news.repository";

export const create = async (body: any, file?: Express.Multer.File) => {

  const slug = slugify(body.title, {
    lower: true,
    strict: true,
  });

  const id = await repository.createNews({
    title: body.title,
    slug,
    short_description: body.short_description,
    content: body.content,
    featured_image: file
      ? `/uploads/news/${file.filename}`
      : null,
    status: body.status || "draft",
  });

  return repository.getNewsById(id);
};

export const getAll = () => repository.getAllNews();

export const getOne = (id: number) =>
  repository.getNewsById(id);

export const remove = async (id: number) => {

  const news = await repository.getNewsById(id);

  if (!news) return;

  if (news.featured_image) {

    const filePath = path.join(
      process.cwd(),
      news.featured_image
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  await repository.deleteNews(id);
};