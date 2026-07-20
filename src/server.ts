import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Srikanth Bethi An API is running 🚀",
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
