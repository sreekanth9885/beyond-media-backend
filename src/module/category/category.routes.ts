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
import { authorize } from "../../middleware/authorize";

const router = Router();

router.post("/", authenticate, authorize("categories.create"), createCategory);

router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.put(
  "/:id",
  authenticate,
  authorize("categories.update"),
  updateCategory,
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("categories.update"),
  updateCategoryStatus,
);

router.delete(
  "/:id",
  authenticate,
  authorize("categories.delete"),
  deleteCategory,
);

export default router;
