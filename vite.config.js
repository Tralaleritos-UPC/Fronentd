import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

<<<<<<< HEAD
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})
=======
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
>>>>>>> signlingo-vue
