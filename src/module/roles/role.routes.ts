import { Router } from "express";
import roleController from "./role.controller";
import { authenticate } from "../../middleware/authenticate";

const router = Router();

router.post("/", authenticate, roleController.create);

router.get("/", authenticate, roleController.getAll);

router.get("/:id", authenticate, roleController.getById);

router.put("/:id", authenticate, roleController.update);

router.delete("/:id", authenticate, roleController.delete);

router.post("/:roleId/permissions", authenticate, roleController.assignPermissions);

router.get("/:roleId/permissions",authenticate,roleController.getPermissions);

router.delete("/:roleId/permissions/:permissionId",authenticate,roleController.removePermission);

export default router;
