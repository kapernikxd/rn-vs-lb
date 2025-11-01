import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import AppSettingsScreen, { AppSettingsScreenProps, AppSettingsSectionData } from './AppSettingsScreen';

const meta: Meta<typeof AppSettingsScreen> = {
  title: 'Screens/Settings/AppSettingsScreen',
  component: AppSettingsScreen,
};

export default meta;

type Story = StoryObj<typeof AppSettingsScreen>;

export const Basic: Story = {
  render: (args: AppSettingsScreenProps) => (
    <View style={{ flex: 1 }}>
      <AppSettingsScreen {...args} />
    </View>
  ),
};

export const CustomSections: Story = {
  render: (args: AppSettingsScreenProps) => {
    const [toggles, setToggles] = React.useState<Record<string, boolean>>({
      'in-app-browser': true,
      'location-data': true,
      'application-data': false,
      'use-proxy': false,
      'save-data': true,
    });

    const handleToggleChange = (id: string, value: boolean) => {
      setToggles((prev) => ({
        ...prev,
        [id]: value,
      }));
    };

    const sections: AppSettingsSectionData[] = [
      {
        id: 'security',
        title: 'Security',
        items: [
          {
            type: 'value',
            id: 'biometric',
            label: 'Passcode, fingerprint or face ID',
            value: 'Enabled',
            valueTone: 'primary',
            onPress: () => console.log('Manage sign-in methods'),
            showChevron: true,
          },
        ],
      },
      {
        id: 'preferences',
        title: 'Preferences',
        items: [
          {
            type: 'value',
            id: 'font-size',
            label: 'Font size',
            value: 'Large',
            valueTone: 'primary',
            onPress: () => console.log('Change font size'),
            showChevron: true,
          },
          {
            type: 'value',
            id: 'language',
            label: 'Language',
            value: 'English',
            valueTone: 'muted',
            onPress: () => console.log('Change language'),
            showChevron: true,
          },
          {
            type: 'toggle',
            id: 'in-app-browser',
            label: 'In-app browser',
            description: 'Open external links within the app',
            value: toggles['in-app-browser'],
            onValueChange: (next) => handleToggleChange('in-app-browser', next),
          },
          {
            type: 'toggle',
            id: 'location-data',
            label: 'Location data',
            description: 'Improve recommendations in the news feed',
            value: toggles['location-data'],
            onValueChange: (next) => handleToggleChange('location-data', next),
          },
          {
            type: 'toggle',
            id: 'application-data',
            label: 'Application data',
            description: 'Improve recommendations in the news feed',
            value: toggles['application-data'],
            onValueChange: (next) => handleToggleChange('application-data', next),
          },
          {
            type: 'toggle',
            id: 'use-proxy',
            label: 'Use proxy server',
            value: toggles['use-proxy'],
            onValueChange: (next) => handleToggleChange('use-proxy', next),
          },
          {
            type: 'toggle',
            id: 'save-data',
            label: 'Save data',
            description: 'Disable video autoplay and load images in low quality',
            value: toggles['save-data'],
            onValueChange: (next) => handleToggleChange('save-data', next),
          },
          {
            type: 'link',
            id: 'default-apps',
            label: 'Default apps',
            description: 'Select which apps links to chats, calls and clips will open in',
            onPress: () => console.log('Open default apps settings'),
          },
        ],
      },
    ];

    return (
      <View style={{ flex: 1 }}>
        <AppSettingsScreen {...args} sections={sections} />
      </View>
    );
  },
};
