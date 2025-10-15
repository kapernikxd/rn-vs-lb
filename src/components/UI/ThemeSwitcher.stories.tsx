import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type ThemeSwitcherStoryArgs = WithThemeArgs & {};

const meta: Meta<ThemeSwitcherStoryArgs> = {
  title: 'Components/UI/ThemeSwitcher',
  component: ThemeSwitcher,
  args: {
    themeMode: 'light',
  },
  argTypes: {
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<ThemeSwitcherStoryArgs>((props) => {
    const { themeMode: _themeMode } = props;
    return <ThemeSwitcher />;
  }, {
    maxWidth: 320,
    align: 'stretch',
  }),
};

export default meta;

type Story = StoryObj<ThemeSwitcherStoryArgs>;

export const Default: Story = {};

export const DarkTheme: Story = {
  args: {
    themeMode: 'dark',
  },
};
