import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import ListBlockItem from './ListBlockItem';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type ListBlockItemProps = React.ComponentProps<typeof ListBlockItem>;

type ListBlockItemStoryArgs = WithThemeArgs & ListBlockItemProps;

const meta: Meta<ListBlockItemStoryArgs> = {
  title: 'Components/UI/ListBlockItem',
  component: ListBlockItem,
  args: {
    icon: 'bell',
    label: 'Notifications',
    hideArrow: false,
    hideBottomLine: false,
    report: false,
    big: false,
    fullWidth: false,
    action: action('onPress'),
    themeMode: 'light',
  },
  argTypes: {
    icon: { control: 'text' },
    label: { control: 'text' },
    hideArrow: { control: 'boolean' },
    hideBottomLine: { control: 'boolean' },
    report: { control: 'boolean' },
    big: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<ListBlockItemStoryArgs>((props) => {
    const { themeMode: _themeMode, ...rest } = props;
    return <ListBlockItem {...(rest as ListBlockItemProps)} />;
  }, {
    align: 'stretch',
    maxWidth: 360,
  }),
};

export default meta;

type Story = StoryObj<ListBlockItemStoryArgs>;

export const Default: Story = {};

export const ReportAction: Story = {
  args: {
    report: true,
    icon: 'exclamation-triangle',
    label: 'Report content',
  },
};

export const BigLayout: Story = {
  args: {
    big: true,
    fullWidth: true,
    themeMode: 'dark',
  },
};
