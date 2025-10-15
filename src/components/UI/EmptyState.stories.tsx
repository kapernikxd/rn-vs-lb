import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import EmptyState from './EmptyState';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type EmptyStateStoryArgs = WithThemeArgs & {};

const meta: Meta<EmptyStateStoryArgs> = {
  title: 'Components/UI/EmptyState',
  component: EmptyState,
  args: {
    themeMode: 'light',
  },
  argTypes: {
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<EmptyStateStoryArgs>((props) => {
    const { themeMode: _themeMode } = props;
    return <EmptyState />;
  }),
};

export default meta;

type Story = StoryObj<EmptyStateStoryArgs>;

export const Default: Story = {};

export const DarkMode: Story = {
  args: {
    themeMode: 'dark',
  },
};
