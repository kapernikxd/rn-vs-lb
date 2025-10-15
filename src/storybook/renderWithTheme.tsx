import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { StoryThemeProvider } from './StoryThemeProvider';
import { useTheme } from '../theme';

export type ThemeMode = 'light' | 'dark';

export type WithThemeArgs = {
  themeMode?: ThemeMode;
};

type FlexJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

type RenderOptions = {
  padded?: boolean;
  justify?: FlexJustify;
  align?: FlexAlign;
  maxWidth?: number;
};

const StoryContainer: React.FC<React.PropsWithChildren<RenderOptions>> = ({
  children,
  padded = true,
  justify = 'center',
  align = 'center',
  maxWidth,
}) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: padded ? 16 : 0,
          justifyContent: justify,
          alignItems: align,
        }}
      >
        <View style={maxWidth ? { width: '100%', maxWidth, alignSelf: align } : undefined}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const renderWithTheme = <P extends object>(
  component: (props: P) => React.ReactElement,
  options?: RenderOptions,
) => {
  return ({ themeMode = 'light', ...rest }: P & WithThemeArgs) => (
    <StoryThemeProvider initialMode={themeMode}>
      <StoryContainer {...options}>{component(rest as P)}</StoryContainer>
    </StoryThemeProvider>
  );
};
