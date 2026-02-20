import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import inject from '@rollup/plugin-inject'

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    vueDevTools(),
    inject({
      'window.Quill': ['@vueup/vue-quill', 'Quill'],
      Quill: ['@vueup/vue-quill', 'Quill']
    })
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
