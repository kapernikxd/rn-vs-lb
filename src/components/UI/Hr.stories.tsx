import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Hr from './Hr';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type HrStoryArgs = WithThemeArgs & React.ComponentProps<typeof Hr>;

const meta: Meta<HrStoryArgs> = {
  title: 'Components/UI/Hr',
  component: Hr,
  args: {
    size: 'sm',
    display: true,
    style: { width: '100%' },
    themeMode: 'light',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    display: { control: 'boolean' },
    style: { control: 'object' },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<HrStoryArgs>((props) => {
    const { themeMode: _themeMode, ...rest } = props;
    return <Hr {...rest} />;
  }, {
    align: 'stretch',
    maxWidth: 360,
  }),
};

export default meta;

type Story = StoryObj<HrStoryArgs>;

export const Default: Story = {};

export const Hidden: Story = {
  args: {
    display: false,
  },
};

export const ThickSpacing: Story = {
  args: {
    size: 'xl',
    themeMode: 'dark',
  },
};
