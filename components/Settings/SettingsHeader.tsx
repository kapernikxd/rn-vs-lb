import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeType, useTheme } from '../../theme';

export interface SettingsHeaderProps {
  title?: string;
  subtitle?: string;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ title = 'Settings', subtitle }) => {
  const { theme, typography } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={[typography.titleH4, styles.title]}>{title}</Text>
      {subtitle ? <Text style={[typography.bodySm, styles.subtitle]}>{subtitle}</Text> : null}
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: 24,
    },
    title: {
      color: theme.title,
    },
    subtitle: {
      marginTop: 4,
      color: theme.greyText,
    },
  });

export default SettingsHeader;
