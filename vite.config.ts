import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import viteSvgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), viteSvgr()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      components: resolve(__dirname, "src", "components"),
      hooks: resolve(__dirname, "src", "hooks"),
      i18n: resolve(__dirname, "src", "i18n"),
      pages: resolve(__dirname, "src", "pages"),
      styles: resolve(__dirname, "src", "styles"),
      utils: resolve(__dirname, "src", "utils"),
      types: resolve(__dirname, "src", "types"),
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
