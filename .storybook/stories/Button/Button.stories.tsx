import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import Button, { MyButtonProps } from '../../../src/components/buttons/Button';

const meta: Meta<MyButtonProps> = {
  title: 'Buttons/Button',
  component: Button,
  argTypes: {
    title: {
      control: 'text',
      description: 'Text displayed on the button',
    },
    type: {
      control: { type: 'select' },
      options: ['primary', 'gray', 'primary-outline', 'gray-outline', 'report-outline'],
      description: 'Visual style of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state with spinner',
    },
    disabled: {
      control: 'boolean',
    },
    onPress: { action: 'pressed' },
  },
  args: {
    title: 'Update Profile',
    type: 'primary',
    onPress: action('pressed'),
  },
};

export default meta;

type Story = StoryObj<MyButtonProps>;

export const Primary: Story = {};

export const Gray: Story = {
  args: {
    title: 'Cancel',
    type: 'gray',
  },
};

export const PrimaryOutline: Story = {
  args: {
    title: 'Contact us',
    type: 'primary-outline',
  },
};

export const GrayOutline: Story = {
  args: {
    title: 'Secondary action',
    type: 'gray-outline',
  },
};

export const ReportOutline: Story = {
  args: {
    title: 'Report user',
    type: 'report-outline',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    title: 'Saving...',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled button',
    disabled: true,
  },
};
