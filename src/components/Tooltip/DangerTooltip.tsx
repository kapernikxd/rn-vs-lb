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

export const DangerTooltip: React.FC<InfoTooltipProps> = ({ content, iconSize, style }) => {
  const { theme } = useTheme();

  return (
    <InfoTooltipBase
      content={content}
      iconName="ban"
      iconColor={theme.danger}
      iconSize={iconSize}
      style={style}
    />
  );
};