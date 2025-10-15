import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import Tag from './Tag';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type TagStoryArgs = WithThemeArgs & React.ComponentProps<typeof Tag>;

const meta: Meta<TagStoryArgs> = {
  title: 'Components/EventCard/Tag',
  component: Tag,
  args: {
    label: 'Online',
    backgroundColor: '#f3f1f7',
    textColor: '#6f2da8',
    borderColor: '#6f2da8',
    themeMode: 'light',
  },
  argTypes: {
    label: { control: 'text' },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    borderColor: { control: 'color' },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<TagStoryArgs>((props) => {
    const { themeMode: _themeMode, ...rest } = props;
    return (
      <View style={{ flexDirection: 'row' }}>
        <Tag {...rest} />
      </View>
    );
  }),
};

export default meta;

type Story = StoryObj<TagStoryArgs>;

export const Default: Story = {};

export const Danger: Story = {
  args: {
    label: 'Offline',
    backgroundColor: '#fff1f1',
    borderColor: '#ff4a5c',
    textColor: '#ff4a5c',
  },
};

export const DarkTheme: Story = {
  args: {
    themeMode: 'dark',
    backgroundColor: '#2a2a2a',
    borderColor: '#7BAEFF',
    textColor: '#7BAEFF',
  },
};
