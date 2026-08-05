import { Router } from "express";
import upload from "../../middleware/upload";

import {
  createNews,
  getNews,
  getSingleNews,
  updateNews,
  deleteNews,
  getNewsByCategory,
  getNewsBySlug,
  changeNewsStatus,
} from "./news.controller";

const router = Router();

// Create
router.post("/", upload.single("featuredImage"), createNews);

// Get All
router.get("/", getNews);
router.get("/category/:slug", getNewsByCategory);
router.get("/:slug", getNewsBySlug);
// Get Single
router.get("/:id", getSingleNews);

// Update
router.put("/:id", upload.single("featuredImage"), updateNews);
router.patch("/:id/status", changeNewsStatus);
// Delete
router.delete("/:id", deleteNews);

export default router;