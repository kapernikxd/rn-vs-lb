import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import Spacer, { SpacerProps } from '../../../src/components/UI/Spacer';

const meta: Meta<SpacerProps> = {
  title: 'UI/Spacer',
  component: Spacer,
  argTypes: {
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;

const Template: StoryFn<SpacerProps> = (args) => (
  <View style={{ width: '100%' }}>
    <View style={{ height: 32, backgroundColor: '#CCE5FF', borderRadius: 6 }} />
    <Spacer {...args} />
    <View style={{ height: 32, backgroundColor: '#FFD6E0', borderRadius: 6 }} />
  </View>
);

export const Default = Template.bind({});
Default.args = {
  size: 'sm',
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  size: 'xxl',
};
