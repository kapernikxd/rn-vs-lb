const config = {
  stories: ['./stories/**/*.stories.?(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
};

export default config;
