const path = require('path');

// Add fs mockFile because storybook broken without the fs
module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-controls'],
  webpackFinal: async (storybookBaseConfig, configType) => {
    storybookBaseConfig.resolve.alias = {
      ...storybookBaseConfig.resolve.alias,
      'fs': path.resolve(__dirname, 'fsMock.js')
    };
  
    return storybookBaseConfig;
  }
};
