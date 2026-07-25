import express from "express";
import corsMiddleware from "./middleware/cors";
import routes from "./routes";

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.use(routes);

export default app;