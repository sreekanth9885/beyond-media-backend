import { Router } from "express";
import upload from "../../middleware/upload";

import {
  createNews,
  getNews,
  getSingleNews,
  deleteNews,
} from "./news.controller";


const router = Router();


/**
 * @swagger
 * tags:
 *   name: News
 *   description: News management APIs
 */


/**
 * @swagger
 * /news:
 *   post:
 *     summary: Create news article
 *     tags:
 *       - News
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Telangana Election Updates
 *
 *               description:
 *                 type: string
 *                 example: Latest political updates
 *
 *               category_id:
 *                 type: integer
 *                 example: 1
 *
 *               subcategory_id:
 *                 type: integer
 *                 example: 2
 *
 *               featuredImage:
 *                 type: string
 *                 format: binary
 *
 *     responses:
 *       201:
 *         description: News created successfully
 */
router.post(
  "/",
  upload.single("featuredImage"),
  createNews
);



/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get all news
 *     tags:
 *       - News
 *
 *     responses:
 *       200:
 *         description: News fetched successfully
 */
router.get("/", getNews);



/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get single news
 *     tags:
 *       - News
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
 *         description: News fetched successfully
 */
router.get("/:id", getSingleNews);



/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Delete news
 *     tags:
 *       - News
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
 *         description: News deleted successfully
 */
router.delete("/:id", deleteNews);


export default router;