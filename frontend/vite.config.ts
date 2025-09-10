import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteSourceLocator } from "@metagptx/vite-plugin-source-locator";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    viteSourceLocator({
      prefix: "mgx",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "./", // 👈 giúp load asset đúng khi deploy
  build: {
    outDir: "dist", // thư mục output
    emptyOutDir: true, // xóa dist cũ trước khi build
  },
  server: {
    port: 5173, // cổng dev mặc định của Vite
    open: true, // tự mở trình duyệt khi chạy dev
  },
}));
