// stories/Button/Button.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button, { MyButtonProps } from './Button';

const meta: Meta<MyButtonProps> = {
  title: 'Button/Base',
  component: Button,
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' }, // на всякий случай: все onXxx попадут в Actions
  },
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
      description: 'Shows a loading indicator and disables the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button interaction',
    },
    // вместо action() — auto actions
    onPress: { action: 'onPress' },
  },
  // дефолтные значения задаём через args (в v9 не используем defaultValue в argTypes)
  args: {
    title: 'Press me',
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    title: 'Continue',
    type: 'primary',
    // onPress не задаём — Storybook сам подставит функцию и залогирует в Actions
  },
};

export const Outline: Story = {
  args: {
    title: 'Learn more',
    type: 'primary-outline',
  },
};

export const Gray: Story = {
  args: {
    title: 'Cancel',
    type: 'gray',
  },
};

export const DangerOutline: Story = {
  args: {
    title: 'Report content',
    type: 'report-outline',
  },
};

export const LoadingState: Story = {
  args: {
    title: 'Submitting...',
    type: 'primary',
    loading: true,
  },
};
