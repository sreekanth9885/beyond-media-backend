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
  authorize("subcategory.create"),
  createSubcategory,
);

router.get("/", getAllSubcategories);

router.get("/:id", getSubcategoryById);

router.put(
  "/:id",
  authenticate,
  authorize("subcategory.update"),
  updateSubcategory,
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("subcategory.update"),
  updateSubcategoryStatus,
);

router.delete(
  "/:id",
  authenticate,
  authorize("subcategory.delete"),
  deleteSubcategory,
);


export default router;