
import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";          
import { openapi } from "./docs/openapi";   

export const app = express();

app.use(cors());

app.use(express.json({ limit: "1mb" }));


app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.use(routes);

app.use((_req, res) => res.status(404).json({ error: "Rota não encontrada" }));


app.use(errorHandler);
