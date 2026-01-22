import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      // scss: { api: 'modern-compiler' },
    }
  },
  server: {
    port: 3001,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8899/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  base: "./"
})
