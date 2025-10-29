import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../theme';

interface SettingsSectionTitleProps {
  title: string;
}

const SettingsSectionTitle: React.FC<SettingsSectionTitleProps> = ({ title }) => {
  const { commonStyles, sizes } = useTheme();

  return (
    <Text style={[commonStyles.descriptionCard, { marginBottom: sizes.xs as number }]}>
      {title.toUpperCase()}
    </Text>
  );
};

export default SettingsSectionTitle;
