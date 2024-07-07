import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)]
    },
    sourcemap: 'inline'
  },
  plugins: [
    dts({ insertTypesEntry: true }),
    react({
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    }),
    svgr()
  ],
  publicDir: 'public',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.d.ts']
  }
})
