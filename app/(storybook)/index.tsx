import type { ComponentType } from "react";

const storybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true";

const StorybookUI: ComponentType = storybookEnabled
  ? require("../../.storybook").default
  : () => null;

export default StorybookUI;
