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
import { authenticate } from "../../middleware/authenticate";

const router = Router();

// Create
router.post("/", upload.single("featuredImage"), authenticate, createNews);

// Admin list
router.get("/", getNews);

// Public APIs
router.get("/category/:slug", getNewsByCategory);
router.get("/details/:slug", getNewsDetails);

// Admin APIs
router.get("/id/:id", getSingleNews);

// Update
router.put("/:id", upload.single("featuredImage"), authenticate, updateNews);
router.patch("/:id/status", changeNewsStatus);

// Delete
router.delete("/:id", authenticate, deleteNews);

export default router;
