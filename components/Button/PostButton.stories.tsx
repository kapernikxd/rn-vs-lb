import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PostButton from './PostButton';

const meta: Meta = {
  title: 'Button/PostButton',
  component: PostButton,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Create new event',
    },
    onPress: { action: 'press' },
  },
};

export default meta;

const Template: StoryFn<React.ComponentProps<typeof PostButton>> = (args) => <PostButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Create post',
};

export const CustomStyling = Template.bind({});
CustomStyling.args = {
  title: 'Invite a friend',
  buttonStyle: {
    backgroundColor: '#FFE8D6',
    borderRadius: 20,
  },
  textStyle: {
    fontWeight: '700',
  },
};
