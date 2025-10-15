import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import LoadingScreen from './LoadingScreen';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type LoadingScreenStoryArgs = WithThemeArgs & {};

const meta: Meta<LoadingScreenStoryArgs> = {
  title: 'Components/UI/LoadingScreen',
  component: LoadingScreen,
  args: {
    themeMode: 'light',
  },
  argTypes: {
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<LoadingScreenStoryArgs>((props) => {
    const { themeMode: _themeMode } = props;
    return <LoadingScreen />;
  }),
};

export default meta;

type Story = StoryObj<LoadingScreenStoryArgs>;

export const Default: Story = {};

export const DarkMode: Story = {
  args: {
    themeMode: 'dark',
  },
};
