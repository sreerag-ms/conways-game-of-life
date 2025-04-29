import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: process.env.NODE_ENV === 'production' ? '/conways-game-of-life/' : '/',
  css: {
    postcss: './postcss.config.js',
  }
})
