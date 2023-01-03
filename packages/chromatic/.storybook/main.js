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
    };
  },
};
