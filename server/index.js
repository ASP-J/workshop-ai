import "dotenv/config";
import cors from "cors";
import express from "express";
import { fetchUsers } from "./twygoApi.js";

const app = express();
const port = Number(process.env.PORT ?? 5184);
const baseUrl = process.env.TWYGO_API_BASE_URL ?? "https://api.twygo.com";

app.use(cors({ origin: ["http://localhost:5183", "http://127.0.0.1:5183"] }));

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

app.get("/api/users", async (request, response) => {
  try {
    const result = await fetchUsers({
      filters: request.query,
      token: process.env.TWYGO_API_TOKEN,
      baseUrl
    });
    response.status(result.status).json(result.body);
  } catch (error) {
    response.status(502).json({
      message: "Nao foi possivel consultar a API da Twygo.",
      detail: error instanceof Error ? error.message : String(error)
    });
  }
});

app.listen(port, () => {
  console.log(`Twygo Users Lab API em http://localhost:${port}`);
});
