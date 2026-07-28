import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  updateCategoryStatus,
} from "./category.controller";

const router = Router();

router.post("/", authenticate,createCategory);

router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.put("/:id", authenticate,updateCategory);

router.patch("/:id/status", authenticate,updateCategoryStatus);

router.delete("/:id", authenticate,deleteCategory);

export default router;