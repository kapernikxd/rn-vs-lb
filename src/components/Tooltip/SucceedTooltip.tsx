// components/InfoTooltip.tsx
import React from 'react';
import { useTheme } from '../../theme';
import { InfoTooltipBase } from './InfoTooltipBase';
import { ViewStyle } from 'react-native';

type InfoTooltipProps = {
  content: React.ReactNode;
  iconSize?: number;
  style?: ViewStyle;
};

export const SucceedTooltip: React.FC<InfoTooltipProps> = ({ content, iconSize, style }) => {
  const { theme } = useTheme();

  return (
    <InfoTooltipBase
      content={content}
      iconName="checkmark-circle-outline"
      iconColor={theme.success}
      iconSize={iconSize}
      style={style}
    />
  );
};