import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Beyond Media API is Up and Running 🚀",
  });
});

router.get("/health", (_req, res) => {
  res.json({
    status: "UP",
    timestamp: new Date(),
  });
});

export default router;