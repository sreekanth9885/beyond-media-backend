import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads/news directory if it doesn't exist
const uploadPath = path.join(process.cwd(), "uploads", "news");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },

  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);

    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

    cb(null, fileName);
  },
});

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default upload;