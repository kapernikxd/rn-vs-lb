import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import SettingsScreen, { SettingsScreenProps } from './SettingsScreen';

const meta: Meta<typeof SettingsScreen> = {
  title: 'Features/Settings/SettingsScreen',
  component: SettingsScreen,
  args: {
    headerProps: { title: 'Settings' },
  },
  argTypes: {
    onOptionPress: { action: 'option-press' },
  },
};

export default meta;

type Story = StoryFn<SettingsScreenProps>;

const Template: Story = (args) => (
  <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
    <SettingsScreen {...args} />
  </View>
);

export const Basic = Template.bind({});

export const CustomUser = Template.bind({});
CustomUser.args = {
  user: {
    name: 'Jane Doe',
    phone: '+1 (202) 555-0118',
    caption: 'Premium account',
    avatar: {
      uri: 'https://i.pravatar.cc/150?img=47',
    },
  },
};

export const CustomOptions: Story = (args) => (
  <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
    <SettingsScreen
      {...args}
      options={[
        {
          id: 'security',
          label: 'Security',
          icon: (
            <MaterialCommunityIcons
              name="lock-check-outline"
              size={22}
              color="#377dff"
            />
          ),
        },
        {
          id: 'language',
          label: 'Language',
          icon: <Feather name="globe" size={20} color="#377dff" />,
        },
      ]}
    />
  </View>
);
