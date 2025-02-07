import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": `http://localhost:${process.env.PORT}`,
      "/socket.io": `http://localhost:${process.env.PORT}`,
      "/images": `http://localhost:${process.env.PORT}`,
    },
  },
});
