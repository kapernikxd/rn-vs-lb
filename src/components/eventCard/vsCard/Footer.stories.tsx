import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Footer from './Footer';
import { renderWithTheme, WithThemeArgs } from '../../../storybook/renderWithTheme';

type FooterStoryArgs = WithThemeArgs & React.ComponentProps<typeof Footer>;

const meta: Meta<FooterStoryArgs> = {
  title: 'Components/EventCard/Footer',
  component: Footer,
  args: {
    likes: 42,
    views: 900,
    position: 'space-between',
    themeMode: 'light',
  },
  argTypes: {
    likes: { control: 'number' },
    views: { control: 'number' },
    position: {
      control: 'radio',
      options: ['space-between', 'flex-start'],
    },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<FooterStoryArgs>((props) => {
    const { themeMode: _themeMode, ...rest } = props;
    return <Footer {...rest} />;
  }, {
    maxWidth: 360,
    align: 'stretch',
  }),
};

export default meta;

type Story = StoryObj<FooterStoryArgs>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    position: 'flex-start',
    likes: 5,
    views: 120,
  },
};

export const DarkTheme: Story = {
  args: {
    themeMode: 'dark',
  },
};
