import cors from "cors";

export default cors({
  origin: ["https://admin.beyondpolitics.in", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});