import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import path from 'path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    },
    sourcemap: 'inline'
  },
  plugins: [dts(), react(), tsconfigPaths(), svgr()],
  publicDir: 'public',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.d.ts']
  }
})
