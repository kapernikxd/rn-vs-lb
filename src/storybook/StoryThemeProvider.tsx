import React, { PropsWithChildren, useMemo, useState } from 'react';
import appTheme from '../theme/theme';
import { ThemeContext } from '../theme/themeContext';
import { getGlobalStyleSheet, getTypography } from '../theme/styles/styleSheet';
import { getCommonStyles } from '../theme/styles/style';
import { getFormStyles } from '../theme/styles/commonFormStyles';

type ThemeMode = 'light' | 'dark';

export type StoryThemeProviderProps = PropsWithChildren<{
  initialMode?: ThemeMode;
}>;

export const StoryThemeProvider: React.FC<StoryThemeProviderProps> = ({ children, initialMode = 'light' }) => {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const isDark = mode === 'dark';
  const theme = isDark ? appTheme.darkTheme : appTheme.lightTheme;

  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    isDark,
    globalStyleSheet: getGlobalStyleSheet(theme),
    commonStyles: getCommonStyles({ theme, fonts: appTheme.FONTS }),
    formStyles: getFormStyles(theme),
    sizes: appTheme.SIZES,
    typography: getTypography(theme),
  }), [isDark, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default StoryThemeProvider;
