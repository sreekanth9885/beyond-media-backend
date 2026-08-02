import { Router } from "express";

import { authenticate } from "../../middleware/authenticate";

import {
  createSubcategory,
  deleteSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
  updateSubcategoryStatus,
} from "./subcategory.controller";
import { authorize } from "../../middleware/authorize";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("subcategories.create"),
  createSubcategory,
);

router.get("/", getAllSubcategories);

router.get("/:id", getSubcategoryById);

router.put(
  "/:id",
  authenticate,
  authorize("subcategories.update"),
  updateSubcategory,
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("subcategories.update"),
  updateSubcategoryStatus,
);

router.delete(
  "/:id",
  authenticate,
  authorize("subcategories.delete"),
  deleteSubcategory,
);


export default router;