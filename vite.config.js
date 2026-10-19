import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/Valana-presskit/" : "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        contact: fileURLToPath(new URL("./contact.html", import.meta.url)),
      },
    },
  },
});
