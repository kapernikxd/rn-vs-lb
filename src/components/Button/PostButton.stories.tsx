import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import PostButton from './PostButton';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

interface StoryArgs extends WithThemeArgs {
  title: string;
  buttonStyle?: React.ComponentProps<typeof PostButton>['buttonStyle'];
  textStyle?: React.ComponentProps<typeof PostButton>['textStyle'];
  onPress: () => void;
}

const meta: Meta<StoryArgs> = {
  title: 'Components/Button/PostButton',
  component: PostButton,
  args: {
    title: 'Create post',
    onPress: action('onPress'),
    themeMode: 'light',
  },
  argTypes: {
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
    buttonStyle: { control: 'object' },
    textStyle: { control: 'object' },
  },
  render: renderWithTheme<React.ComponentProps<typeof PostButton>>((props) => <PostButton {...props} />, {
    align: 'stretch',
  }),
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {};

export const CustomStyles: Story = {
  args: {
    buttonStyle: {
      borderRadius: 30,
    },
    textStyle: {
      fontSize: 18,
    },
    themeMode: 'dark',
  },
};
