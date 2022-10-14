const path = require('path')
const tsconfigPaths = require('vite-tsconfig-paths')
const svgrPlugin = require('vite-plugin-svgr')

module.exports = {
  stories: ['../../react/src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite'
  },
  features: {
    storyStoreV7: true
  },
  staticDirs: ['../../react/public'],
  async viteFinal(config) {
    return {
      ...config,
      plugins: [...config.plugins, tsconfigPaths.default(), svgrPlugin()],
      resolve: {
        alias: {
          '@components/*': path.resolve(__dirname, "../../react/src/components/*"),
          '@components': path.resolve(__dirname, "../../react/src/components"),
          '@constants/*': path.resolve(__dirname, "../../react/src/constants/*"),
          '@constants': path.resolve(__dirname, "../../react/src/constants"),
          '@hooks/*': path.resolve(__dirname, "../../react/src/hooks/*"),
          '@hooks': path.resolve(__dirname, "../../react/src/hooks"),
          '@styles/*': path.resolve(__dirname, "../../react/src/styles/*"),
          '@styles': path.resolve(__dirname, "../../react/src/styles"),
          "@themes/*": path.resolve(__dirname, "../../react/src/styles/themes/*"),
          "@themes": path.resolve(__dirname, "../../react/src/styles/themes"),
          "@types/*": path.resolve(__dirname, "../../react/src/types/*"),
          "@types": path.resolve(__dirname, "../../react/src/types"),
          "@utils/*": path.resolve(__dirname, "../../react/src/utils/*"),
          "@utils": path.resolve(__dirname, "../../react/src/utils")
        }
      }
    }
  }
}