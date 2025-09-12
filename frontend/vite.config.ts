import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './', // Giúp load asset đúng khi deploy trên subfolder hoặc mở file trực tiếp
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: mode === 'development',
    target: 'esnext',
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(css)$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  server: {
    watch: {
      usePolling: true, // Giúp tránh lỗi khi chạy trong container hoặc môi trường mạng ảo
    },
    host: true, // Cho phép truy cập từ bên ngoài (0.0.0.0)
    strictPort: true, // Nếu port 5173 đang dùng thì báo lỗi, không tự đổi port
    port: 5173,
    fs: {
      strict: true, // Chỉ cho phép truy cập file trong root dự án
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Tăng tốc dev server
  },
}));