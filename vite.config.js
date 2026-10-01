import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// Portas: tela 5183 e backend 5184 (padrão). Dá para trocar sem mexer no código,
// em qualquer sistema (Mac, Windows, Linux), colocando no .env:
//   PORT=5184          (backend local)
//   CLIENT_PORT=5183   (tela)
export default defineConfig(({ mode }) => {
  // loadEnv lê o .env e também as variáveis já definidas no terminal.
  const env = loadEnv(mode, process.cwd(), "");
  const clientPort = Number(env.CLIENT_PORT || 5183);
  const serverPort = Number(env.PORT || 5184);

  return {
    plugins: [react()],
    server: {
      // So o proprio computador acessa (nada exposto para a rede/Wi-Fi).
      host: "127.0.0.1",
      port: clientPort,
      // Se a porta estiver ocupada, avisa em vez de abrir em outra porta escondida.
      strictPort: true,
      proxy: {
        "/api": `http://127.0.0.1:${serverPort}`
      }
    }
  };
});
