import { Router } from "express";
import authRoutes from "./auth.routes";
import healthRoutes from "./health.routes";
import newsRoutes from "../module/news/news.routes";

const router = Router();

router.use("/", healthRoutes);
router.use("/api/auth", authRoutes);
router.use("/api/news", newsRoutes);
export default router;