import { Router } from "express";
import userController from "./user.controller";
import { authenticate } from "../../middleware/authenticate";

const router = Router();

// Create User
router.post("/", authenticate, userController.create);

// Get All Users
router.get("/", authenticate, userController.getAll);

// Get User By ID
router.get("/:id", authenticate, userController.getById);

// Update User
router.put("/:id", authenticate, userController.update);

// Delete User
router.delete("/:id", authenticate, userController.delete);

export default router;
