import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SizesType, useTheme } from '../../theme';

export interface SpacerProps {
  size?: keyof SizesType;
  style?: ViewStyle;
}

const Spacer: React.FC<SpacerProps> = ({ size = 'sm', style}) => {
   const { sizes } = useTheme();

  const marginBottom = sizes[size] || sizes.sm;
  return <View style={[styles.spacer, { marginBottom: marginBottom as number }, style]} />;
};

const styles = StyleSheet.create({
  spacer: {
    width: '100%', // Обеспечиваем, что это будет блочный отступ
  },
});

export default Spacer;