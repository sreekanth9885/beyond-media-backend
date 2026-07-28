import { Router } from "express";
import { login } from "../controllers/auth.controller";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Auth
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@beyondmedia.com
 *
 *               password:
 *                 type: string
 *                 example: password123
 *
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
  "/login",
  login
);


export default router;