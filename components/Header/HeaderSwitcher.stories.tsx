import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { HeaderSwitcher } from './HeaderSwitcher';

const meta: Meta<typeof HeaderSwitcher> = {
  title: 'Layout/Header/HeaderSwitcher',
  component: HeaderSwitcher,
  args: {
    isFirst: true,
  },
};

export default meta;

type Story = StoryObj<typeof HeaderSwitcher>;

const componentA = (
  <View style={{ padding: 12, backgroundColor: '#e6f0ff', borderRadius: 8 }}>
    <Text style={{ fontWeight: '600' }}>Upcoming events</Text>
  </View>
);

const componentB = (
  <View style={{ padding: 12, backgroundColor: '#ffe6f1', borderRadius: 8 }}>
    <Text style={{ fontWeight: '600' }}>Past events</Text>
  </View>
);

export const ShowFirstComponent: Story = {
  args: {
    isFirst: true,
  },
  render: (args) => (
    <View style={{ padding: 16, backgroundColor: '#fafafa' }}>
      <HeaderSwitcher {...args} componentA={componentA} componentB={componentB} />
    </View>
  ),
};

export const ShowSecondComponent: Story = {
  args: {
    isFirst: false,
  },
  render: (args) => (
    <View style={{ padding: 16, backgroundColor: '#fafafa' }}>
      <HeaderSwitcher {...args} componentA={componentA} componentB={componentB} />
    </View>
  ),
};

export const CustomContent: Story = {
  args: {
    isFirst: false,
  },
  render: (args) => (
    <View style={{ padding: 16, backgroundColor: '#fafafa' }}>
      <HeaderSwitcher
        {...args}
        componentA={
          <View style={{ padding: 12, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
            <Text>Compact header</Text>
          </View>
        }
        componentB={
          <View style={{ padding: 12, backgroundColor: '#d6f5e5', borderRadius: 8 }}>
            <Text>Expanded header with stats</Text>
          </View>
        }
      />
    </View>
  ),
};
