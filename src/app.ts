import express from "express";
import corsMiddleware from "./middleware/cors";
import routes from "./routes";
import path from "path";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(corsMiddleware);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.post("/test", (req, res) => {
  console.log("Request Headers:", req.headers);
  res.json({ ok: true });
});
app.use(routes);

export default app;