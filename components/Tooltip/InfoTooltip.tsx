// components/InfoTooltip.tsx
import React from 'react';
import { useTheme } from '../../theme';
import { InfoTooltipBase } from './InfoTooltipBase';

type InfoTooltipProps = {
  content: React.ReactNode;
  iconSize?: number;
  style?: any;
};

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content, iconSize, style }) => {
  const { theme } = useTheme();

  return (
    <InfoTooltipBase
      content={content}
      iconName="help-circle-outline"
      iconColor={theme.info}
      iconSize={iconSize}
      style={style}
    />
  );
};