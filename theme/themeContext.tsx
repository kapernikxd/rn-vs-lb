
import React, { createContext, useState, useContext, useEffect } from 'react';
import appTheme, { AppThemeConfig, ThemeOverrides, createAppTheme } from './theme';
import { getGlobalStyleSheet, getTypography } from "./styles/styleSheet";
import { getCommonStyles } from './styles/style';
import { getFormStyles } from './styles/commonFormStyles';

import { CommonStylesType, FormStylesType, GlobalStyleSheetType, SizesType, TypographytType, ThemeType } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultThemeConfig = appTheme;
const { lightTheme: defaultLightTheme, SIZES: defaultSizes, FONTS: defaultFonts } = defaultThemeConfig;

const THEME_KEY = 'APP_THEME'; // 'dark' | 'light' | 'system';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  isDark: boolean;
  globalStyleSheet: GlobalStyleSheetType;
  commonStyles: CommonStylesType;
  formStyles: FormStylesType;
  sizes: SizesType;
  typography: TypographytType;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultLightTheme,
  toggleTheme: () => { },
  isDark: false,
  globalStyleSheet: getGlobalStyleSheet(defaultLightTheme),
  commonStyles: getCommonStyles({theme: defaultLightTheme, fonts: defaultFonts}),
  formStyles: getFormStyles(defaultLightTheme),
  sizes: defaultSizes,
  typography: getTypography(defaultLightTheme),
});

type ThemeProviderProps = {
  children: React.ReactNode;
  theme?: ThemeOverrides | AppThemeConfig;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme: customTheme }) => {
  const [isDark, setIsDark] = useState(false);

  const themeConfig = React.useMemo(
    () => {
      if (!customTheme) {
        return defaultThemeConfig;
      }

      if ('lightTheme' in customTheme && 'darkTheme' in customTheme) {
        return customTheme;
      }

      return createAppTheme(customTheme);
    },
    [customTheme],
  );

  const { darkTheme, lightTheme, SIZES: sizes, FONTS: fonts } = themeConfig;

  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (storedTheme === 'dark') setIsDark(true);
    })();
  }, []);

  const toggleTheme = async () => {
    const newValue = !isDark;
    setIsDark(newValue);
    await AsyncStorage.setItem(THEME_KEY, newValue ? 'dark' : 'light');
  };

  const resolvedTheme = isDark ? darkTheme : lightTheme;

  const globalStyleSheet = getGlobalStyleSheet(resolvedTheme)
  const typography = getTypography(resolvedTheme)
  const commonStyles = getCommonStyles({theme: resolvedTheme, fonts})
  const formStyles = getFormStyles(resolvedTheme)


  const controller = {
    theme: resolvedTheme,
    toggleTheme,
    isDark,
    globalStyleSheet,
    commonStyles,
    formStyles,
    sizes,
    typography,
  }

  return (
    <ThemeContext.Provider value={controller}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);