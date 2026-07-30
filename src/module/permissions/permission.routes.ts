import { Router } from "express";
import permissionController from "./permission.controller";
import { authenticate } from "../../middleware/authenticate";

const router = Router();

router.post("/", authenticate, permissionController.create);

router.get("/", authenticate, permissionController.getAll);

router.get("/:id", authenticate, permissionController.getById);

router.put("/:id", authenticate, permissionController.update);

router.delete("/:id", authenticate, permissionController.delete);

export default router;