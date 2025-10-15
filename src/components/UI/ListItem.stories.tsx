import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import ListItem from './ListItem';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type ListItemStoryArgs = WithThemeArgs & React.ComponentProps<typeof ListItem>;

const meta: Meta<ListItemStoryArgs> = {
  title: 'Components/UI/ListItem',
  component: ListItem,
  args: {
    icon: 'user',
    label: 'Profile',
    subLabel: 'Edit your personal information',
    hideArrow: false,
    hideBottomLine: false,
    report: false,
    big: false,
    action: action('onPress'),
    themeMode: 'light',
  },
  argTypes: {
    icon: { control: 'text' },
    label: { control: 'text' },
    subLabel: { control: 'text' },
    hideArrow: { control: 'boolean' },
    hideBottomLine: { control: 'boolean' },
    report: { control: 'boolean' },
    big: { control: 'boolean' },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<ListItemStoryArgs>((props) => {
    const { themeMode: _themeMode, ...rest } = props;
    return <ListItem {...rest} />;
  }, {
    align: 'stretch',
    maxWidth: 360,
  }),
};

export default meta;

type Story = StoryObj<ListItemStoryArgs>;

export const Default: Story = {};

export const Report: Story = {
  args: {
    report: true,
    icon: 'exclamation-circle',
    label: 'Report an issue',
    subLabel: 'Let us know what happened',
  },
};

export const LargeDark: Story = {
  args: {
    big: true,
    hideArrow: true,
    themeMode: 'dark',
  },
};
