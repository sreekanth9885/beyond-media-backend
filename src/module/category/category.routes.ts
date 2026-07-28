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


/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management APIs
 */


/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Categories
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
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Politics
 *               description:
 *                 type: string
 *                 example: Latest political news
 *               image:
 *                 type: string
 *                 example: category.jpg
 *               status:
 *                 type: string
 *                 example: active
 *               sort_order:
 *                 type: integer
 *                 example: 1
 *
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.post(
  "/",
  authenticate,
  createCategory
);



/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 */
router.get(
  "/",
  getAllCategories
);



/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by id
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Category fetched successfully
 */
router.get(
  "/:id",
  getCategoryById
);



/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
router.put(
  "/:id",
  authenticate,
  updateCategory
);



/**
 * @swagger
 * /categories/{id}/status:
 *   patch:
 *     summary: Update category status
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: inactive
 *
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
router.patch(
  "/:id/status",
  authenticate,
  updateCategoryStatus
);



/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */
router.delete(
  "/:id",
  authenticate,
  deleteCategory
);


export default router;