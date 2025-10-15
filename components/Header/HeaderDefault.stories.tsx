// components/Header/HeaderDefault.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text, TouchableOpacity, View } from 'react-native';
import { action } from '@storybook/addon-actions';
import HeaderDefault, { AccessType } from './HeaderDefault';

const meta: Meta<typeof HeaderDefault> = {
  title: 'Header/HeaderDefault',
  component: HeaderDefault,
  args: {
    title: 'Community event',
    onBackPress: action('go-back'),
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#f8f8f8' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof HeaderDefault>;

export default meta;

type Story = StoryObj<typeof HeaderDefault>;

export const Basic: Story = {};

export const WithActions: Story = {
  args: {
    children: (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={action('open-settings')}>
          <Text style={{ fontSize: 16 }}>⚙️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={action('open-share')} style={{ marginLeft: 12 }}>
          <Text style={{ fontSize: 16 }}>🔗</Text>
        </TouchableOpacity>
      </View>
    ),
  },
};

export const SubscribersOnly: Story = {
  args: {
    acceessType: AccessType.SUBSCRIBERS,
  },
};

export const PrivateAccess: Story = {
  args: {
    acceessType: AccessType.PRIVATE,
  },
};

export const WithInfoTooltip: Story = {
  args: {
    acceessType: AccessType.SUBSCRIBERS,
    infoTooltip: (
      <View>
        <Text>Subscribers can see additional content and chat.</Text>
      </View>
    ),
  },
};
