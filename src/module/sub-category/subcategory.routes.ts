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

const router = Router();

router.post("/", authenticate, createSubcategory);

router.get("/", getAllSubcategories);

router.get("/:id", getSubcategoryById);

router.put("/:id", authenticate,updateSubcategory);

router.patch("/:id/status", authenticate,updateSubcategoryStatus);

router.delete("/:id", authenticate,deleteSubcategory);

export default router;
