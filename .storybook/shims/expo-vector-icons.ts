import React from "react";
import { Text } from "react-native";

export type IconProps = React.ComponentProps<typeof Text> & {
  name?: string;
  size?: number;
  color?: string;
};

const createIconComponent = (family: string) => {
  const Icon: React.FC<IconProps> = ({
    name,
    size = 24,
    color = "inherit",
    style,
    children,
    ...rest
  }) => {
    return (
      <Text {...rest} style={[{ fontSize: size, color }, style]}>
        {name || family}
        {children}
      </Text>
    );
  };

  Icon.displayName = `${family}Icon`;
  return Icon;
};

export const Ionicons = createIconComponent("Ionicons");
export const MaterialIcons = createIconComponent("MaterialIcons");
export const FontAwesome = createIconComponent("FontAwesome");
export const FontAwesome5 = createIconComponent("FontAwesome5");
export const FontAwesome6 = createIconComponent("FontAwesome6");
export const MaterialCommunityIcons = createIconComponent("MaterialCommunityIcons");
export const Feather = createIconComponent("Feather");
export const Octicons = createIconComponent("Octicons");

export default {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  Feather,
  Octicons,
};
