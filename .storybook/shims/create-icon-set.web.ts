import React from "react";
import { Text } from "react-native";

export const DEFAULT_ICON_SIZE = 12;
export const DEFAULT_ICON_COLOR = "black";
export const NativeIconAPI = null;

type IconProps = {
  name?: string;
  size?: number;
  color?: string;
  style?: any;
  children?: React.ReactNode;
};

export default function createIconSet(
  glyphMap: Record<string, string | number>,
  fontFamily: string,
  fontFile?: string | null,
  fontStyle?: Record<string, unknown>
) {
  const Icon: React.FC<IconProps> & Record<string, any> = ({
    name,
    size = DEFAULT_ICON_SIZE,
    color = DEFAULT_ICON_COLOR,
    style,
    children,
    ...props
  }) => {
    const glyph = name && glyphMap[name] ? glyphMap[name] : "";
    const resolvedGlyph = typeof glyph === "number" ? String.fromCodePoint(glyph) : glyph;

    return (
      <Text selectable={false} {...props} style={[{ fontSize: size, color }, style, fontStyle]}>
        {resolvedGlyph || name}
        {children}
      </Text>
    );
  };

  Icon.Button = (buttonProps: IconProps) => <Icon {...buttonProps} />;
  Icon.getImageSource = async () => null;
  Icon.getImageSourceSync = () => null;
  Icon.loadFont = async () => null;
  Icon.hasIcon = (iconName: string) => Object.prototype.hasOwnProperty.call(glyphMap, iconName);
  Icon.getRawGlyphMap = () => glyphMap;
  Icon.getFontFamily = () => fontFamily || fontFile;

  return Icon as any;
}
