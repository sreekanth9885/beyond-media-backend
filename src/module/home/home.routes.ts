import { Router } from "express";
import { getHome } from "./home.controller";

const router = Router();

router.get("/", getHome);

export default router;