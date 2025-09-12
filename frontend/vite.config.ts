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
  base: "./", // Giúp load asset đúng khi deploy trên subfolder hoặc file://
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: mode === "development", // Tạo sourcemap khi dev để debug dễ hơn
    target: "esnext", // Đặt target hiện đại, React + SWC hỗ trợ tốt
    rollupOptions: {
      output: {
        // Đặt tên file rõ ràng, tránh cache issues
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: ({ name }) => {
          if (/\.(css)$/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
    strictPort: true, // Nếu port 5173 đang dùng thì báo lỗi, không tự đổi port
    fs: {
      strict: true, // Chỉ cho phép truy cập file trong root dự án, tăng bảo mật
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      // Thêm các thư viện bạn dùng nhiều để tăng tốc dev server
    ],
  },
}));