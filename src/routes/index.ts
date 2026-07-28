import { Router } from "express";
import authRoutes from "./auth.routes";
import healthRoutes from "./health.routes";
import newsRoutes from "../module/news/news.routes";
import categoryRoutes from "../module/category/category.routes";
import subCategoryRoutes from "../module/sub-category/subcategory.routes";
const router = Router();

router.use("/", healthRoutes);
router.use("/api/auth", authRoutes);
router.use("/api/news", newsRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/api/sub-categories", subCategoryRoutes);
export default router;