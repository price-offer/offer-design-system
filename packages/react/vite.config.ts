import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import packageJson from './package.json'
import path from 'path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

type MakeExternalPredicateReturns = (id: string) => boolean
const makeExternalPredicate = (
  externals: string[]
): MakeExternalPredicateReturns => {
  if (externals.length === 0) {
    return (): boolean => false
  }
  const pattern = new RegExp(`^(${externals.join('|')})($|/)`)
  return (id: string): boolean => pattern.test(id)
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: makeExternalPredicate([
        ...Object.keys(packageJson.dependencies)
      ])
    },
    sourcemap: 'inline'
  },
  plugins: [dts(), react(), tsconfigPaths(), svgr()],
  publicDir: 'public',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.d.ts']
  }
})
