import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { useTheme, ThemeType, GlobalStyleSheetType } from '../../../theme';

export type TabButtonProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  /** Иконка слева (например, <MaterialIcons .../>) */
  icon?: React.ReactNode;
  /** Доп. элемент справа (например, <Dot />) */
  rightAddon?: React.ReactNode;
  /** Внешний стиль кнопки (опционально) */
  style?: ViewStyle;
  /** Стиль текста (опционально) */
  labelStyle?: TextStyle;
};

const TabButton: React.FC<TabButtonProps> = ({ label, active, onPress, icon, rightAddon, style, labelStyle }) => {
  const { theme, typography, globalStyleSheet } = useTheme();
  const s = getStyles({ theme, globalStyleSheet });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[s.tabButton, active && s.activeTabBorder, style]}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
    >
      {icon ? <View style={{ marginRight: 5 }}>{icon}</View> : null}
      <Text style={[typography.titleH6Regular, s.tabText, active && s.activeTabText, labelStyle]}>
        {label}
      </Text>
      {rightAddon}
    </TouchableOpacity>
  );
};

export default TabButton;

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
