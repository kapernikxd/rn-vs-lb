import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button, { MyButtonProps } from '../../../src/components/Button/Button';

const meta: Meta<MyButtonProps> = {
  title: 'Button/Base',
  component: Button,
  argTypes: {
    title: {
      control: 'text',
      description: 'Text displayed on the button',
      defaultValue: 'Press me',
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['primary', 'gray', 'primary-outline', 'gray-outline', 'report-outline'],
      description: 'Visual style of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows a loading indicator and disables the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button interaction',
    },
    onPress: { action: 'pressed' },
  },
};

export default meta;

const Template: StoryFn<MyButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Continue',
  type: 'primary',
  onPress: action('primary-pressed'),
};

export const Outline = Template.bind({});
Outline.args = {
  title: 'Learn more',
  type: 'primary-outline',
  onPress: action('outline-pressed'),
};

export const Gray = Template.bind({});
Gray.args = {
  title: 'Cancel',
  type: 'gray',
  onPress: action('gray-pressed'),
};

export const DangerOutline = Template.bind({});
DangerOutline.args = {
  title: 'Report content',
  type: 'report-outline',
  onPress: action('report-pressed'),
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  title: 'Submitting...',
  type: 'primary',
  loading: true,
};
