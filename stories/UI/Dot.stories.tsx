import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import Dot from '../../../src/components/UI/Dot';

type DotProps = React.ComponentProps<typeof Dot>;

const meta: Meta<DotProps> = {
  title: 'UI/Dot',
  component: Dot,
  argTypes: {
    display: {
      control: 'boolean',
      description: 'Controls whether the dot is rendered',
    },
    style: {
      control: 'object',
      description: 'Additional style overrides',
    },
  },
};

export default meta;

const Template: StoryFn<DotProps> = (args) => (
  <View style={{ width: 48, height: 48, backgroundColor: '#E7ECF4', borderRadius: 24, justifyContent: 'center', alignItems: 'center' }}>
    <Dot {...args} />
  </View>
);

export const Visible = Template.bind({});
Visible.args = {
  display: true,
  style: {
    backgroundColor: '#ff3366',
  },
};

export const Hidden = Template.bind({});
Hidden.args = {
  display: false,
};
