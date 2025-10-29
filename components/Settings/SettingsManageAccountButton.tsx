import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { ThemeType, useTheme } from '../../theme';

export interface SettingsManageAccountButtonProps {
  label?: string;
  badgeLabel?: string;
  onPress?: () => void;
}

const SettingsManageAccountButton: React.FC<SettingsManageAccountButtonProps> = ({
  label = 'Manage account',
  badgeLabel = 'VK ID',
  onPress,
}) => {
  const { theme, typography } = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.button}>
      <Text style={[typography.titleH6Regular, styles.label]}>{label}</Text>
      <View style={styles.badge}>
        <Text style={[typography.bodyXs, styles.badgeLabel]}>{badgeLabel}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    button: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 16,
      backgroundColor: theme.backgroundSecond,
      borderWidth: 1,
      borderColor: theme.background,
    },
    label: {
      color: theme.title,
    },
    badge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: theme.primaryLight,
    },
    badgeLabel: {
      color: theme.white,
      fontWeight: '600',
    },
  });

export default SettingsManageAccountButton;
