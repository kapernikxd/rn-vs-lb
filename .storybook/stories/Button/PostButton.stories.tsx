import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PostButton, { PostButtonProps } from '../../../src/components/buttons/PostButton';

const meta: Meta<PostButtonProps> = {
  title: 'Buttons/PostButton',
  component: PostButton,
  argTypes: {
    title: {
      control: 'text',
    },
    iconName: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    onPress: { action: 'pressed' },
  },
  args: {
    title: 'Create new post',
    onPress: action('pressed'),
  },
};

export default meta;

type Story = StoryObj<PostButtonProps>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CustomIcon: Story = {
  args: {
    iconName: 'edit',
    title: 'Start writing',
  },
};
