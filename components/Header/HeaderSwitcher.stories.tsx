// components/Header/HeaderSwitcher.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { HeaderSwitcher } from './HeaderSwitcher';

const componentA = (
  <View style={{ padding: 12, backgroundColor: '#e6f0ff', borderRadius: 8 }}>
    <Text style={{ fontWeight: '600' }}>Upcoming events</Text>
  </View>
);

const componentB = (
  <View style={{ padding: 12, backgroundColor: '#ffe6f0', borderRadius: 8 }}>
    <Text style={{ fontWeight: '600' }}>Past events</Text>
  </View>
);

const meta: Meta<typeof HeaderSwitcher> = {
  title: 'Header/HeaderSwitcher',
  component: HeaderSwitcher,
  args: {
    isFirst: true,
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#fafafa' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof HeaderSwitcher>;

export default meta;

type Story = StoryObj<typeof HeaderSwitcher>;

export const ShowFirstComponent: Story = {
  args: {
    componentA,
    componentB,
    isFirst: true,
  },
};

export const ShowSecondComponent: Story = {
  args: {
    componentA,
    componentB,
    isFirst: false,
  },
};

export const CustomContent: Story = {
  args: {
    isFirst: false,
    componentA: (
      <View style={{ padding: 12, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
        <Text>Compact header</Text>
      </View>
    ),
    componentB: (
      <View style={{ padding: 12, backgroundColor: '#d6f5e5', borderRadius: 8 }}>
        <Text>Expanded header with stats</Text>
      </View>
    ),
  },
};
