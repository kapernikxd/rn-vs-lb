import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SizesType, useTheme } from '../../../theme';

interface IconLabelProps {
  icon?: 'location-outline' | 'calendar-outline' | 'people-outline' | 'cash-outline';
  label: string;
  value?: string | number | null;
  valueStyle?: StyleProp<TextStyle>;
  showIf?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const IconLabel: React.FC<IconLabelProps> = ({
  icon,
  label,
  value,
  valueStyle,
  showIf = true,
  style
}) => {
  if (!showIf) return null; // Если условие false — компонент не отобразится

  const { globalStyleSheet, theme, sizes, typography } = useTheme();
  const styles = getStyles({ sizes });

  return (
    <View style={[globalStyleSheet.flexRowCenter, style]}>
      {icon && <Ionicons name={icon} size={sizes.lg} color={theme.greyText} />}
      <Text style={[typography.body, styles.label]}>{label}</Text>
      {value && <Text style={valueStyle ? valueStyle : [typography.body, styles.text]}>{value}</Text>}
    </View>
  );
};

const getStyles = ({ sizes }: { sizes: SizesType }) => StyleSheet.create({
  label: {
    marginLeft: sizes.xs,
  },
  text: {
    marginLeft: sizes.xs,
    flex: 1,
  },
});
