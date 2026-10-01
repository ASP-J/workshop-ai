import "dotenv/config";
import cors from "cors";
import express from "express";
import { fetchAllUsers, fetchUsers } from "./twygoApi.js";

const app = express();
const port = Number(process.env.PORT ?? 5184);
// Só o próprio computador acessa: os dados de pessoas não ficam expostos na rede/Wi-Fi.
const host = "127.0.0.1";
const baseUrl = process.env.TWYGO_API_BASE_URL ?? "https://api.twygo.com";

// Porta da tela (padrão 5183; pode mudar com CLIENT_PORT no .env, igual ao vite.config.js).
const clientPort = Number(process.env.CLIENT_PORT ?? 5183);
app.use(cors({ origin: [`http://localhost:${clientPort}`, `http://127.0.0.1:${clientPort}`] }));

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

app.get("/api/users", async (request, response) => {
  try {
    // ?all=true busca todas as paginas da API (usado pelo painel para cruzar com o CSV)
    const loader = request.query.all === "true" ? fetchAllUsers : fetchUsers;
    const result = await loader({
      filters: request.query,
      // trim(): ignora espaços/quebras de linha que o editor (ex.: Bloco de Notas) possa deixar.
      token: process.env.TWYGO_API_TOKEN?.trim(),
      baseUrl
    });
    response.status(result.status).json(result.body);
  } catch (error) {
    response.status(502).json({
      message: "Não foi possível consultar a API da Twygo.",
      detail: error instanceof Error ? error.message : String(error)
    });
  }
});

app.listen(port, host, () => {
  console.log(`Painel de capacitação (API local) em http://${host}:${port} (somente este computador)`);
});
