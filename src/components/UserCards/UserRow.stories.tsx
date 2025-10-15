import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import UserRow from './UserRow';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type UserRowStoryArgs = WithThemeArgs & React.ComponentProps<typeof UserRow>;

const meta: Meta<UserRowStoryArgs> = {
  title: 'Components/UserCards/UserRow',
  component: UserRow,
  args: {
    avatarUri: 'https://placekitten.com/120/120',
    userName: 'Taylor Swift',
    size: 'sm',
    onPress: action('onPress'),
    themeMode: 'light',
  },
  argTypes: {
    avatarUri: { control: 'text' },
    userName: { control: 'text' },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<UserRowStoryArgs>((props) => {
    const { themeMode: _themeMode, ...rest } = props;
    return <UserRow {...rest} />;
  }, {
    maxWidth: 320,
    align: 'stretch',
  }),
};

export default meta;

type Story = StoryObj<UserRowStoryArgs>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    size: 'xs',
  },
};

export const DarkTheme: Story = {
  args: {
    themeMode: 'dark',
  },
};
