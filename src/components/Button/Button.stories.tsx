import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import Button, { MyButtonProps } from './Button';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type ButtonStoryArgs = MyButtonProps & WithThemeArgs;

const meta: Meta<ButtonStoryArgs> = {
  title: 'Components/Button/BasicButton',
  component: Button,
  args: {
    title: 'Tap me',
    type: 'primary',
    loading: false,
    disabled: false,
    onPress: action('onPress'),
    themeMode: 'light',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'gray', 'primary-outline', 'gray-outline', 'report-outline'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    style: { control: 'object' },
    textStyle: { control: 'object' },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<MyButtonProps>((props) => <Button {...props} />, {
    align: 'stretch',
  }),
};

export default meta;

type Story = StoryObj<ButtonStoryArgs>;

export const Primary: Story = {
  args: {
    title: 'Primary action',
    type: 'primary',
  },
};

export const Outline: Story = {
  args: {
    title: 'Outline action',
    type: 'primary-outline',
    themeMode: 'dark',
  },
};

export const Loading: Story = {
  args: {
    title: 'Submitting...',
    loading: true,
    disabled: true,
  },
};
