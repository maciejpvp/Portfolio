import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// eslint-disable-next-line
// @ts-ignore
import path from "path-browserify";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
