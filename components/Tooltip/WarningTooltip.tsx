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

export const WarningTooltip: React.FC<InfoTooltipProps> = ({ content, iconSize, style }) => {
  const { theme } = useTheme();

  return (
    <InfoTooltipBase
      content={content}
      iconName="warning-outline"
      iconColor={theme.warning}
      iconSize={iconSize}
      style={style}
    />
  );
};