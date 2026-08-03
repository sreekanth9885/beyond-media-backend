import { Router } from "express";
import upload from "../../middleware/upload";

import {
  createAdvertisement,
  getAdvertisements,
  getSingleAdvertisement,
  getAdvertisementsByPosition,
  updateAdvertisement,
  deleteAdvertisement,
} from "./advertisement.controller";

const router = Router();
console.log("Advertisement routes loaded");
// Create Advertisement
router.post(
  "/",
  upload.single("image"),
  createAdvertisement
);

// Get All Advertisements
router.get(
  "/",
  getAdvertisements
);

// Get Advertisements By Position
router.get(
  "/position/:position",
  getAdvertisementsByPosition
);

// Get Single Advertisement
router.get(
  "/:id",
  getSingleAdvertisement
);

// Update Advertisement
router.put(
  "/:id",
  upload.single("image"),
  updateAdvertisement
);

// Delete Advertisement
router.delete(
  "/:id",
  deleteAdvertisement
);

export default router;