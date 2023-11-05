import { dirname, join } from "path";
const tsconfigPaths = require('vite-tsconfig-paths')
const { mergeConfig } = require('vite')

module.exports = {
  stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions")
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
  },

  features: {
    storyStoreV7: false
  },

  staticDirs: ['../public'],

  viteFinal: async (config) => mergeConfig(config, {
    public: '../public',
    plugins: [tsconfigPaths.default()]
  }),

  docs: {
    autodocs: true
  }
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
