import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { NoAuth } from './NoAuth';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type NoAuthStoryArgs = WithThemeArgs & React.ComponentProps<typeof NoAuth>;

const meta: Meta<NoAuthStoryArgs> = {
  title: 'Components/UI/NoAuth',
  component: NoAuth,
  args: {
    onPress: action('onPress'),
    themeMode: 'light',
  },
  argTypes: {
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<NoAuthStoryArgs>((props) => {
    const { themeMode: _themeMode, ...rest } = props;
    return <NoAuth {...rest} />;
  }),
};

export default meta;

type Story = StoryObj<NoAuthStoryArgs>;

export const Default: Story = {};

export const DarkTheme: Story = {
  args: {
    themeMode: 'dark',
  },
};
