import { Router } from "express";
import userroleController from "./userrole.controller";
import { authenticate } from "../../middleware/authenticate";

const router = Router();

router.post("/:userId/roles", authenticate, userroleController.assignRoles);

router.get("/:userId/roles", authenticate, userroleController.getRoles);

router.delete("/:userId/roles/:roleId",authenticate,userroleController.removeRole);

export default router;
