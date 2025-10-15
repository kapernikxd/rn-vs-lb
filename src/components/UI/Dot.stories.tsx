import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Dot from './Dot';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

interface DotStoryArgs extends WithThemeArgs {
  display: boolean;
  style?: React.ComponentProps<typeof Dot>['style'];
}

const meta: Meta<DotStoryArgs> = {
  title: 'Components/UI/Dot',
  component: Dot,
  args: {
    display: true,
    style: { backgroundColor: '#6f2da8', right: -4, top: -4 },
    themeMode: 'light',
  },
  argTypes: {
    display: { control: 'boolean' },
    style: { control: 'object' },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<DotStoryArgs>((props) => {
    const { themeMode: _themeMode, ...rest } = props;
    return (
      <Dot {...rest} />
    );
  }),
};

export default meta;

type Story = StoryObj<DotStoryArgs>;

export const Default: Story = {};

export const Hidden: Story = {
  args: {
    display: false,
  },
};

export const CustomColor: Story = {
  args: {
    style: { backgroundColor: '#ff4a5c', right: -6, top: -6 },
    themeMode: 'dark',
  },
};
