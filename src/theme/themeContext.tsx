
import React, { createContext, useState, useContext, useEffect } from 'react';
import appTheme from './theme';
import { getGlobalStyleSheet, getTypography } from "./styles/styleSheet";
import { getCommonStyles } from './styles/style';
import { getFormStyles } from './styles/commonFormStyles';

import { CommonStylesType, FormStylesType, GlobalStyleSheetType, TypographytType, ThemeType } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { darkTheme, lightTheme , SIZES, FONTS } = appTheme;

const THEME_KEY = 'APP_THEME'; // 'dark' | 'light' | 'system';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  isDark: boolean;
  globalStyleSheet: GlobalStyleSheetType;
  commonStyles: CommonStylesType;
  formStyles: FormStylesType;
  sizes: typeof SIZES;
  typography: TypographytType;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => { },
  isDark: false,
  globalStyleSheet: getGlobalStyleSheet(lightTheme),
  commonStyles: getCommonStyles({theme: lightTheme, fonts: FONTS}),
  formStyles: getFormStyles(lightTheme),
  sizes: SIZES,
  typography: getTypography(lightTheme),
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

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

  const theme = isDark ? darkTheme : lightTheme;

  const globalStyleSheet = getGlobalStyleSheet(theme)
  const typography = getTypography(theme)
  const commonStyles = getCommonStyles({theme, fonts: FONTS})
  const formStyles = getFormStyles(theme)


  const controller = {
    theme,
    toggleTheme,
    isDark,
    globalStyleSheet,
    commonStyles,
    formStyles,
    sizes: SIZES,
    typography,
  }

  return (
    <ThemeContext.Provider value={controller}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);