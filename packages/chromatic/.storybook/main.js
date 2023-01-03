const path = require('path')
const tsconfigPaths = require("vite-tsconfig-paths");
const svgrPlugin = require("vite-plugin-svgr");

module.exports = {
  stories: ["../../react/src/components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  staticDirs: ["../../react/public"],
  async viteFinal(config) {
    return {
      ...config,
      plugins: [...config.plugins, tsconfigPaths.default(), svgrPlugin()],
      resolve: {
        alias: {
          '@offer-ui/components/*': path.resolve(__dirname, "../../react/src/components/*"),
          '@offer-ui/components': path.resolve(__dirname, "../../react/src/components"),
          '@offer-ui/constants/*': path.resolve(__dirname, "../../react/src/constants/*"),
          '@offer-ui/constants': path.resolve(__dirname, "../../react/src/constants"),
          '@offer-ui/hooks/*': path.resolve(__dirname, "../../react/src/hooks/*"),
          '@offer-ui/hooks': path.resolve(__dirname, "../../react/src/hooks"),
          '@offer-ui/styles/*': path.resolve(__dirname, "../../react/src/styles/*"),
          '@offer-ui/styles': path.resolve(__dirname, "../../react/src/styles"),
          "@offer-ui/themes/*": path.resolve(__dirname, "../../react/src/styles/themes/*"),
          "@offer-ui/themes": path.resolve(__dirname, "../../react/src/styles/themes"),
          "@offer-ui/types/*": path.resolve(__dirname, "../../react/src/types/*"),
          "@offer-ui/types": path.resolve(__dirname, "../../react/src/types"),
          "@offer-ui/utils/*": path.resolve(__dirname, "../../react/src/utils/*"),
          "@offer-ui/utils": path.resolve(__dirname, "../../react/src/utils")
        }
      }
    }
  },
};
