import { Router } from "express";
import upload from "../../middleware/upload";

import {
  createNews,
  getNews,
  getSingleNews,
  updateNews,
  deleteNews,
  getNewsByCategory,
} from "./news.controller";

const router = Router();

// Create
router.post("/", upload.single("featuredImage"), createNews);

// Get All
router.get("/", getNews);
router.get("/category/:slug", getNewsByCategory);
// Get Single
router.get("/:id", getSingleNews);

// Update
router.put("/:id", upload.single("featuredImage"), updateNews);

// Delete
router.delete("/:id", deleteNews);

export default router;