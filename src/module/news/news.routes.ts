import { Router } from "express";
import upload from "../../middleware/upload";

const router = Router();

router.post(
  "/upload",
  upload.single("featuredImage"),
  (req, res) => {
    return res.json({
      success: true,
      file: req.file,
    });
  }
);

export default router;