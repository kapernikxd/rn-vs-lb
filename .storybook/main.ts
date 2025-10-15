const config = {
  stories: ['./stories/**/*.stories.?(ts|tsx|js|jsx)'],
  addons: ["@storybook/addon-docs", "@chromatic-com/storybook"],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
};

export default config;
