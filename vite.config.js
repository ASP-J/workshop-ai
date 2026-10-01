import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    // So o proprio computador acessa (nada exposto para a rede/Wi-Fi).
    host: "127.0.0.1",
    port: 5183,
    proxy: {
      "/api": "http://127.0.0.1:5184"
    }
  }
});
