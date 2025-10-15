import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../../src/components/Button/Button';

const meta = {
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
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Continue',
    type: 'primary',
  },
  argTypes: {
    onPress: { action: 'primary-pressed' },
  },
};

export const Outline: Story = {
  args: {
    title: 'Learn more',
    type: 'primary-outline',
  },
  argTypes: {
    onPress: { action: 'outline-pressed' },
  },
};

export const Gray: Story = {
  args: {
    title: 'Cancel',
    type: 'gray',
  },
  argTypes: {
    onPress: { action: 'gray-pressed' },
  },
};

export const DangerOutline: Story = {
  args: {
    title: 'Report content',
    type: 'report-outline',
  },
  argTypes: {
    onPress: { action: 'report-pressed' },
  },
};

export const LoadingState: Story = {
  args: {
    title: 'Submitting...',
    type: 'primary',
    loading: true,
  },
};
