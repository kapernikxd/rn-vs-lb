import { mergeConfig } from "vite";
import { StorybookConfig } from "@storybook/react-native-web-vite";

const main: StorybookConfig = {
  stories: [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: ["@storybook/addon-docs", "@chromatic-com/storybook"],

  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "react-native": "react-native-web",
          "react-native$": "react-native-web",
          "react-native-vector-icons":
            "@expo/vector-icons/build/vendor/react-native-vector-icons",
        },
      },
    });
  },
};

export default main;
