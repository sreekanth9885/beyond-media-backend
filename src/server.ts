import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from your frontend
app.use(
  cors({
    origin: [
      "https://admin.dinnusmart.com",
      "http://localhost:5173", // Vite development
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Srikanth Bethi API running 🚀",
  });
});

app.get("/health", (_req, res) => {
  res.json({
    status: "UP",
    timestamp: new Date(),
  });
});

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});