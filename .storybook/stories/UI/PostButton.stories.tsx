import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PostButton from '../../../src/components/UI/Button/PostButton';

const meta: Meta = {
  title: 'UI/Button/PostButton',
  component: PostButton,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Create new event',
    },
  },
};

export default meta;

const Template: StoryFn<React.ComponentProps<typeof PostButton>> = (args) => <PostButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Create post',
  onPress: action('post-button-pressed'),
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
  onPress: action('custom-style-pressed'),
};
