import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: [/^\/public.*/]
    }
  },
  plugins: [dts(), react(), svgr()],
  publicDir: '../react/public',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.d.ts']
  }
})
