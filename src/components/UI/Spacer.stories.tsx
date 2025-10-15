import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import Spacer from './Spacer';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type SpacerStoryArgs = WithThemeArgs & React.ComponentProps<typeof Spacer>;

const meta: Meta<SpacerStoryArgs> = {
  title: 'Components/UI/Spacer',
  component: Spacer,
  args: {
    size: 'sm',
    style: {},
    themeMode: 'light',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    style: { control: 'object' },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<SpacerStoryArgs>((props) => {
    const { themeMode: _themeMode, ...rest } = props;
    return (
      <View>
        <View style={{ height: 10, backgroundColor: '#6f2da8' }} />
        <Spacer {...rest} />
        <View style={{ height: 10, backgroundColor: '#ff4a5c' }} />
      </View>
    );
  }, {
    align: 'stretch',
    maxWidth: 320,
  }),
};

export default meta;

type Story = StoryObj<SpacerStoryArgs>;

export const Default: Story = {};

export const LargeGap: Story = {
  args: {
    size: 'xl',
  },
};

export const DarkTheme: Story = {
  args: {
    themeMode: 'dark',
  },
};
