import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base를 './'로 설정하면 깃허브 Pages의 하위 경로(repo name)에서도 자동 대응됩니다.
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false
  },
  server: {
    port: 3000,
    host: true
  }
});