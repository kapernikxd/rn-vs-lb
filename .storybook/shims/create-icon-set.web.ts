import React, { PureComponent } from "react";
import { Platform, PixelRatio, processColor, Text, NativeModules } from "react-native";

import createIconButtonComponent from "@expo/vector-icons/build/vendor/react-native-vector-icons/lib/icon-button";

const getNativeIconAPI = () =>
  NativeModules?.RNVectorIconsManager || NativeModules?.RNVectorIconsModule || null;

const warnWebFallback = () => {
  if (Platform.OS === "web") {
    // eslint-disable-next-line no-console
    console.warn(
      "@expo/vector-icons: native icon generation is not available on web. Returning null instead."
    );
  }
};

export const DEFAULT_ICON_SIZE = 12;
export const DEFAULT_ICON_COLOR = "black";
export const NativeIconAPI = getNativeIconAPI();

export default function createIconSet(
  glyphMap: Record<string, string | number>,
  fontFamily: string,
  fontFile?: string | null,
  fontStyle?: Record<string, unknown>
) {
  const fontBasename = fontFile ? fontFile.replace(/\.(otf|ttf)$/, "") : fontFamily;

  const fontReference = Platform.select({
    windows: `/Assets/${fontFile}#${fontFamily}`,
    android: fontBasename,
    web: fontBasename,
    default: fontFamily,
  });

  class Icon extends PureComponent<{
    name?: string;
    size?: number;
    color?: string;
    style?: any;
    children?: React.ReactNode;
  }> {
    root: any = null;

    static defaultProps = {
      size: DEFAULT_ICON_SIZE,
      allowFontScaling: false,
    };

    render() {
      const { name, size, color, style, children, ...props } = this.props as any;

      let glyph = name ? (glyphMap[name] as any) || "?" : "";
      if (typeof glyph === "number") {
        glyph = String.fromCodePoint(glyph);
      }

      const styleDefaults = {
        fontSize: size,
        color,
      };

      const styleOverrides = {
        fontFamily: fontReference,
        fontWeight: "normal",
        fontStyle: "normal",
      };

      (props as any).style = [styleDefaults, style, styleOverrides, fontStyle || {}];

      return (
        <Text selectable={false} {...props}>
          {glyph}
          {children}
        </Text>
      );
    }
  }

  const imageSourceCache = new Map<string, any>();

  function resolveGlyph(name: string) {
    const glyph = (glyphMap as any)[name] || "?";
    if (typeof glyph === "number") {
      return String.fromCodePoint(glyph);
    }
    return glyph;
  }

  function getImageSourceSync(
    name: string,
    size = DEFAULT_ICON_SIZE,
    color = DEFAULT_ICON_COLOR
  ) {
    const nativeApi = getNativeIconAPI();
    if (!nativeApi) {
      warnWebFallback();
      return null;
    }

    const glyph = resolveGlyph(name);
    const processedColor = processColor(color);
    const cacheKey = `${glyph}:${size}:${processedColor}`;

    if (imageSourceCache.has(cacheKey)) {
      return imageSourceCache.get(cacheKey);
    }
    try {
      const imagePath = nativeApi.getImageForFontSync(
        fontReference,
        glyph,
        size,
        processedColor
      );
      const value = { uri: imagePath, scale: PixelRatio.get() };
      imageSourceCache.set(cacheKey, value);
      return value;
    } catch (error) {
      imageSourceCache.set(cacheKey, error);
      throw error;
    }
  }

  async function getImageSource(
    name: string,
    size = DEFAULT_ICON_SIZE,
    color = DEFAULT_ICON_COLOR
  ) {
    const nativeApi = getNativeIconAPI();
    if (!nativeApi) {
      warnWebFallback();
      return null;
    }

    const glyph = resolveGlyph(name);
    const processedColor = processColor(color);
    const cacheKey = `${glyph}:${size}:${processedColor}`;

    if (imageSourceCache.has(cacheKey)) {
      return imageSourceCache.get(cacheKey);
    }
    try {
      const imagePath = await nativeApi.getImageForFont(
        fontReference,
        glyph,
        size,
        processedColor
      );
      const value = { uri: imagePath, scale: PixelRatio.get() };
      imageSourceCache.set(cacheKey, value);
      return value;
    } catch (error) {
      imageSourceCache.set(cacheKey, error);
      throw error;
    }
  }

  async function loadFont(file = fontFile) {
    if (Platform.OS === "ios") {
      const nativeApi = getNativeIconAPI();
      if (!nativeApi) {
        warnWebFallback();
        if (!file) {
          throw new Error("Unable to load font, because no file was specified. ");
        }
        return null;
      }
      if (!file) {
        throw new Error("Unable to load font, because no file was specified. ");
      }
      await nativeApi.loadFontWithFileName(...(file as string).split("."));
    }
    return null;
  }

  function hasIcon(name: string) {
    return Object.prototype.hasOwnProperty.call(glyphMap, name);
  }

  function getRawGlyphMap() {
    return glyphMap;
  }

  function getFontFamily() {
    return fontReference;
  }

  Icon.Button = createIconButtonComponent(Icon as any);
  Icon.getImageSource = getImageSource as any;
  Icon.getImageSourceSync = getImageSourceSync as any;
  Icon.loadFont = loadFont as any;
  Icon.hasIcon = hasIcon;
  Icon.getRawGlyphMap = getRawGlyphMap;
  Icon.getFontFamily = getFontFamily;

  return Icon as any;
}
