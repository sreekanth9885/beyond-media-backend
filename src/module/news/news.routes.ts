import { Router } from "express";
import upload from "../../middleware/upload";

import {
  createNews,
  getNews,
  getSingleNews,
  deleteNews,
} from "./news.controller";
import { authorize } from "../../middleware/authorize";

const router = Router();

router.post("/", upload.single("featuredImage"), createNews);

router.get("/", getNews);

router.get("/:id", getSingleNews);

router.delete("/:id", deleteNews);

export default router;
