import express from "express";
import corsMiddleware from "./middleware/cors";
import routes from "./routes";
import path from "path";

const app = express();

app.use(corsMiddleware);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.json());

app.use(routes);

export default app;