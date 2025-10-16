import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme, ThemeType, GlobalStyleSheetType } from '../../../theme';

export type SubTabButtonProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
};

const SubTabButton: React.FC<SubTabButtonProps> = ({ label, active, onPress, style, labelStyle }) => {
  const { theme, typography, globalStyleSheet } = useTheme();
  const s = getStyles({ theme, globalStyleSheet });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[s.tabButton, active && s.activeTabBorder, style]}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
    >
      <Text style={[typography.titleH6Regular, s.tabText, active && s.activeTabText, labelStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default SubTabButton;

const getStyles = ({ theme, globalStyleSheet }: { theme: ThemeType; globalStyleSheet: GlobalStyleSheetType }) =>
  StyleSheet.create({
    tabButton: {
      ...globalStyleSheet.flexRowCenterCenter,
      paddingHorizontal: 30,
      height: 58,
      position: 'relative',
    },
    activeTabBorder: {
      borderBottomWidth: 2,
      borderBottomColor: theme.primary,
    },
    tabText: {
      marginLeft: 0,
    },
    activeTabText: {
      color: theme.primary,
      fontWeight: 'bold',
    },
  });
