import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import viteSvgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), viteSvgr()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:7878",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
