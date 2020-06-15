import path from "path";
import { StorybookConfig } from "@storybook/core/types";

const tsconfig = path.resolve(__dirname, "../tsconfig.json");

const storybookConfig: StorybookConfig = {
  stories: ["../src/components/*.stories.tsx"],
  addons: [
    "@storybook/addon-actions/register",
    "@storybook/addon-toolbars",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
  ],
  typescript: {
    check: true,
    checkOptions: { tsconfig },
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      tsconfigPath: tsconfig,
      propFilter: (prop) => !/^(testID)$/.test(prop.name),
    },
  },
  webpackFinal: async (config) => {
    if (!config?.resolve) {
      return config;
    }

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Replace react-native dependencies with react-native-web
      "react-native$": "react-native-web",
      // Replace @storybook/react-native with @storybook/react
      "@storybook/react-native": "@storybook/react",
      // Make react-native-svg work
      "react-native-svg": "react-native-svg/lib/commonjs/ReactNativeSVG.web",
    };

    return config;
  },
};

export default storybookConfig;
