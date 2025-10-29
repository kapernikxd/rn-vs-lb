import React, { useMemo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Feather, MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { ThemeType, useTheme } from '../../theme';
import SettingsHeader, { SettingsHeaderProps } from './SettingsHeader';
import SettingsProfileCard, { SettingsProfileCardProps } from './SettingsProfileCard';
import SettingsManageAccountButton, {
  SettingsManageAccountButtonProps,
} from './SettingsManageAccountButton';
import SettingsOptionList, { SettingsOptionItem } from './SettingsOptionList';

export interface SettingsScreenProps {
  headerProps?: SettingsHeaderProps;
  user?: SettingsProfileCardProps;
  manageAccountButtonProps?: SettingsManageAccountButtonProps;
  options?: SettingsOptionItem[];
  onOptionPress?: (id: string) => void;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_USER: SettingsProfileCardProps = {
  name: 'Vadim Stepanov',
  phone: '+7 ··· ·· ·· 82',
  caption: undefined,
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  headerProps,
  user,
  manageAccountButtonProps,
  options,
  onOptionPress,
  style,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const iconColor = theme.primary;

  const optionItems = useMemo<SettingsOptionItem[]>(
    () =>
      options ?? [
        {
          id: 'notifications',
          label: 'Notifications',
          icon: <Feather name="bell" size={20} color={iconColor} />,
        },
        {
          id: 'do-not-disturb',
          label: 'Do not disturb',
          icon: <MaterialCommunityIcons name="minus-circle-outline" size={22} color={iconColor} />,
        },
        {
          id: 'account',
          label: 'Account',
          icon: <Feather name="user" size={20} color={iconColor} />,
        },
        {
          id: 'appearance',
          label: 'Appearance',
          icon: <Ionicons name="color-palette-outline" size={22} color={iconColor} />,
        },
        {
          id: 'lower-menu',
          label: 'Lower menu',
          icon: <Feather name="grid" size={20} color={iconColor} />,
        },
        {
          id: 'app-settings',
          label: 'App settings',
          icon: <Feather name="settings" size={20} color={iconColor} />,
        },
        {
          id: 'privacy',
          label: 'Privacy',
          icon: <MaterialCommunityIcons name="shield-check-outline" size={22} color={iconColor} />,
        },
        {
          id: 'blocked',
          label: 'Blocked',
          icon: <FontAwesome5 name="ban" size={18} color={iconColor} />,
        },
      ],
    [options, iconColor],
  );

  const userData: SettingsProfileCardProps = {
    ...DEFAULT_USER,
    ...user,
  };

  const headerData: SettingsHeaderProps = {
    title: 'Settings',
    ...headerProps,
  };

  return (
    <View style={[styles.wrapper, style]}>
      <SettingsHeader {...headerData} />
      <View style={styles.profileWrapper}>
        <SettingsProfileCard {...userData} />
      </View>
      <View style={styles.buttonContainer}>
        <SettingsManageAccountButton {...manageAccountButtonProps} />
      </View>
      <SettingsOptionList items={optionItems} onItemPress={onOptionPress} />
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.card,
      paddingHorizontal: 20,
      paddingTop: 32,
      paddingBottom: 24,
    },
    profileWrapper: {
      marginBottom: 20,
    },
    buttonContainer: {
      width: '100%',
      marginBottom: 24,
    },
  });

export default SettingsScreen;
