import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Text } from 'react-native';
import { HeaderSwitcher } from './HeaderSwitcher';

const meta: Meta = {
  title: 'Header/HeaderSwitcher',
  component: HeaderSwitcher,
  args: {
    isFirst: true,
  },
};

export default meta;

type HeaderSwitcherProps = React.ComponentProps<typeof HeaderSwitcher>;

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

const Template: StoryFn<HeaderSwitcherProps> = (args) => (
  <View style={{ padding: 16, backgroundColor: '#fafafa' }}>
    <HeaderSwitcher {...args} />
  </View>
);

export const ShowFirstComponent = Template.bind({});
ShowFirstComponent.args = {
  componentA,
  componentB,
  isFirst: true,
};

export const ShowSecondComponent = Template.bind({});
ShowSecondComponent.args = {
  componentA,
  componentB,
  isFirst: false,
};

export const CustomContent = Template.bind({});
CustomContent.args = {
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
};
