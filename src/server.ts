import express from "express";
import cors from "cors";
import db from "./config/db";

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
    message: "Beyond Media API is running 🚀",
  });
});

app.get("/health", (_req, res) => {
  res.json({
    status: "UP",
    timestamp: new Date(),
  });
});
// LOGIN API
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const [rows]: any = await db.execute(
      `SELECT id, name, email
       FROM users
       WHERE email = ?
       AND password = ?
       LIMIT 1`,
      [email, password],
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return res.json({
      success: true,
      message: "Login successful",
      user: rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});