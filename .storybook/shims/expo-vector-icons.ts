import React from "react";
import { IconType } from "react-icons";
import * as IoniconsSet from "react-icons/io5";
import * as MaterialIconsSet from "react-icons/md";
import * as FontAwesomeSet from "react-icons/fa";
import * as FontAwesome6Set from "react-icons/fa6";
import * as MaterialCommunityIconsSet from "react-icons/md";
import * as FeatherSet from "react-icons/fi";
import * as OcticonsSet from "react-icons/go";

type IconBaseProps = Omit<React.ComponentProps<IconType>, "size" | "color">;

export type IconProps = IconBaseProps & {
  name?: string;
  size?: number;
  color?: string;
};

const toComponentName = (prefix: string, name?: string) => {
  if (!name) return null;

  return (
    prefix +
    name
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((chunk) => chunk[0].toUpperCase() + chunk.slice(1))
      .join("")
  );
};

const createIconComponent = (
  iconSet: Record<string, IconType>,
  prefix: string,
  fallbackLabel: string
) => {
  const IconComponent: React.FC<IconProps> = ({
    name,
    size = 24,
    color = "currentColor",
    ...rest
  }) => {
    const componentName = toComponentName(prefix, name || fallbackLabel);
    const Component = (componentName && iconSet[componentName]) || null;

    if (!Component) {
      return (
        <span
          style={{ display: "inline-flex", alignItems: "center", fontSize: size, color }}
          {...rest}
        >
          {name || fallbackLabel}
        </span>
      );
    }

    return <Component size={size} color={color} {...rest} />;
  };

  IconComponent.displayName = `${fallbackLabel}Icon`;
  return IconComponent;
};

export const Ionicons = createIconComponent(IoniconsSet, "Io", "Ionicons");
export const MaterialIcons = createIconComponent(MaterialIconsSet, "Md", "MaterialIcons");
export const FontAwesome = createIconComponent(FontAwesomeSet, "Fa", "FontAwesome");
export const FontAwesome5 = createIconComponent(FontAwesomeSet, "Fa", "FontAwesome5");
export const FontAwesome6 = createIconComponent(FontAwesome6Set, "Fa6", "FontAwesome6");
export const MaterialCommunityIcons = createIconComponent(
  MaterialCommunityIconsSet,
  "Md",
  "MaterialCommunity"
);
export const Feather = createIconComponent(FeatherSet, "Fi", "Feather");
export const Octicons = createIconComponent(OcticonsSet, "Go", "Octicons");

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
