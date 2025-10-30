import React from 'react';
import { ScrollView, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ThemeType, useTheme } from '../../theme';
import SettingsSection from './SettingsSection';
import SettingsListItem, { SettingsListItemProps } from './SettingsListItem';
import SettingsToggleItem, { SettingsToggleItemProps } from './SettingsToggleItem';

type ValueItem = {
  type: 'value';
  id: string;
  label: string;
  value: string;
  valueTone?: SettingsListItemProps['valueTone'];
  description?: string;
  showChevron?: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

type ToggleItem = {
  type: 'toggle';
  id: string;
  label: string;
  description?: string;
  value?: SettingsToggleItemProps['value'];
  defaultValue?: SettingsToggleItemProps['defaultValue'];
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  switchProps?: SettingsToggleItemProps['switchProps'];
  toggleOnPress?: SettingsToggleItemProps['toggleOnPress'];
};

type LinkItem = {
  type: 'link';
  id: string;
  label: string;
  description?: string;
  showChevron?: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

export type AppSettingsItem = ValueItem | ToggleItem | LinkItem;

export interface AppSettingsSectionData {
  id: string;
  title: string;
  items: AppSettingsItem[];
}

export interface AppSettingsScreenProps {
  sections?: AppSettingsSectionData[];
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const DEFAULT_SECTIONS: AppSettingsSectionData[] = [
  {
    id: 'app-sign-in',
    title: 'App sign-in',
    items: [
      {
        type: 'value',
        id: 'biometric',
        label: 'Passcode, fingerprint or face ID',
        value: 'Disabled',
        valueTone: 'muted',
      },
    ],
  },
  {
    id: 'application',
    title: 'Application',
    items: [
      {
        type: 'value',
        id: 'font-size',
        label: 'Font size',
        value: 'Match system',
        valueTone: 'primary',
      },
      {
        type: 'value',
        id: 'language',
        label: 'Language',
        value: 'System',
        valueTone: 'muted',
      },
      {
        type: 'toggle',
        id: 'in-app-browser',
        label: 'In-app browser',
        description: 'Open external links within the app',
        defaultValue: true,
      },
      {
        type: 'toggle',
        id: 'location-data',
        label: 'Location data',
        description: 'Improve recommendations in the news feed',
        defaultValue: true,
      },
      {
        type: 'toggle',
        id: 'application-data',
        label: 'Application data',
        description: 'Improve recommendations in the news feed',
        defaultValue: true,
      },
      {
        type: 'toggle',
        id: 'use-proxy',
        label: 'Use proxy server',
        defaultValue: false,
      },
      {
        type: 'toggle',
        id: 'save-data',
        label: 'Save data',
        description: 'Disable video autoplay and load images in low quality',
        defaultValue: true,
      },
      {
        type: 'link',
        id: 'default-apps',
        label: 'Default apps',
        description: 'Select which apps links to chats, calls and clips will open in',
        showChevron: true,
      },
    ],
  },
];

const AppSettingsScreen: React.FC<AppSettingsScreenProps> = ({ sections = DEFAULT_SECTIONS, style, contentContainerStyle }) => {
  const { theme } = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  return (
    <ScrollView
      style={[styles.wrapper, style]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
    >
      {sections.map((section, index) => (
        <SettingsSection
          key={section.id}
          title={section.title}
          style={index !== sections.length - 1 ? styles.section : undefined}
        >
          {section.items.map((item) => {
            switch (item.type) {
              case 'value':
                return (
                  <SettingsListItem
                    key={item.id}
                    label={item.label}
                    value={item.value}
                    valueTone={item.valueTone}
                    description={item.description}
                    showChevron={item.showChevron}
                    onPress={item.onPress}
                    disabled={item.disabled}
                  />
                );
              case 'toggle':
                return (
                  <SettingsToggleItem
                    key={item.id}
                    label={item.label}
                    description={item.description}
                    value={item.value}
                    defaultValue={item.defaultValue}
                    onValueChange={item.onValueChange}
                    disabled={item.disabled}
                    switchProps={item.switchProps}
                    toggleOnPress={item.toggleOnPress}
                  />
                );
              case 'link':
              default:
                return (
                  <SettingsListItem
                    key={item.id}
                    label={item.label}
                    description={item.description}
                    showChevron={item.showChevron ?? true}
                    onPress={item.onPress}
                    disabled={item.disabled}
                  />
                );
            }
          })}
        </SettingsSection>
      ))}
    </ScrollView>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.background,
    },
    contentContainer: {
      paddingHorizontal: 20,
      paddingTop: 24,
      paddingBottom: 32,
    },
    section: {
      marginBottom: 24,
    },
  });

export default AppSettingsScreen;
