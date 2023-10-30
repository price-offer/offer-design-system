import path from 'path'
import react from '@vitejs/plugin-react'
import type { AliasOptions } from 'vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import packageJson from './package.json'
import tsconfigJson from './tsconfig.json'

const getTsAlias = (): AliasOptions => {
  const paths = tsconfigJson.compilerOptions.paths

  return Object.keys(paths).reduce((acc, cur) => {
    const pathName = cur as keyof typeof paths

    return {
      ...acc,
      [cur]: path.resolve(__dirname, `src/${paths[pathName][0]}`)
    }
  }, {})
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
    alias: {
      ...getTsAlias()
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.d.ts']
  }
})
