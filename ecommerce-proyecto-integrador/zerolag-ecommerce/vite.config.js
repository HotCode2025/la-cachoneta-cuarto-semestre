import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://backend-ecommerce-lc.onrender.com",
        changeOrigin: true,
        secure: false, // Desactiva la validación del certificado TLS para este proxy.
      },
      "/images": {
        target: "https://backend-ecommerce-lc.onrender.com/",
        changeOrigin: true,
        secure: false, // Desactiva la validación del certificado TLS para este proxy.
      },
    },
  },
});
