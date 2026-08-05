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
  getNewsDetails,
} from "./news.controller";

const router = Router();

// Create
router.post("/", upload.single("featuredImage"), createNews);

// Admin list
router.get("/", getNews);

// Public APIs
router.get("/category/:slug", getNewsByCategory);
router.get("/details/:slug", getNewsDetails);

// Admin APIs
router.get("/id/:id", getSingleNews);

// Update
router.put("/:id", upload.single("featuredImage"), updateNews);
router.patch("/:id/status", changeNewsStatus);

// Delete
router.delete("/:id", deleteNews);

export default router;