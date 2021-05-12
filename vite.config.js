import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const publicPath = process.env.NODE_ENV === 'production' ? '/vatch-vite/' : '/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  publicPath: publicPath,
})
