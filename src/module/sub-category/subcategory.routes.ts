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


/**
 * @swagger
 * tags:
 *   name: Subcategories
 *   description: Subcategory management APIs
 */


/**
 * @swagger
 * /sub-categories:
 *   post:
 *     summary: Create subcategory
 *     tags:
 *       - Subcategories
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category_id
 *               - name
 *             properties:
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Telangana Politics
 *               description:
 *                 type: string
 *                 example: Latest Telangana political news
 *               image:
 *                 type: string
 *                 example: image.jpg
 *               status:
 *                 type: string
 *                 example: active
 *               sort_order:
 *                 type: integer
 *                 example: 1
 *
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 */
router.post("/", authenticate, createSubcategory);



/**
 * @swagger
 * /sub-categories:
 *   get:
 *     summary: Get all subcategories
 *     tags:
 *       - Subcategories
 *     responses:
 *       200:
 *         description: Subcategories fetched successfully
 */
router.get("/", getAllSubcategories);



/**
 * @swagger
 * /sub-categories/{id}:
 *   get:
 *     summary: Get subcategory by id
 *     tags:
 *       - Subcategories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Subcategory fetched successfully
 */
router.get("/:id", getSubcategoryById);



/**
 * @swagger
 * /sub-categories/{id}:
 *   put:
 *     summary: Update subcategory
 *     tags:
 *       - Subcategories
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authenticate, updateSubcategory);



/**
 * @swagger
 * /sub-categories/{id}/status:
 *   patch:
 *     summary: Update subcategory status
 *     tags:
 *       - Subcategories
 *     security:
 *       - bearerAuth: []
 */
router.patch("/:id/status", authenticate, updateSubcategoryStatus);



/**
 * @swagger
 * /sub-categories/{id}:
 *   delete:
 *     summary: Delete subcategory
 *     tags:
 *       - Subcategories
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authenticate, deleteSubcategory);


export default router;