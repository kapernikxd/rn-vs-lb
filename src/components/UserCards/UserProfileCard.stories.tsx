import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import UserProfileCard from './UserProfileCard';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type UserProfileCardStoryArgs = WithThemeArgs & React.ComponentProps<typeof UserProfileCard>;

const meta: Meta<UserProfileCardStoryArgs> = {
  title: 'Components/UserCards/UserProfileCard',
  component: UserProfileCard,
  args: {
    layout: 'grid',
    fullName: 'Alicia Navarro',
    profession: 'Product Designer',
    description: 'Designs intuitive experiences and facilitates design sprints for cross-functional teams.',
    avatarUrl: 'https://placekitten.com/300/300',
    goToPofile: action('goToProfile'),
    themeMode: 'light',
  },
  argTypes: {
    layout: {
      control: 'radio',
      options: ['grid', 'list'],
    },
    fullName: { control: 'text' },
    profession: { control: 'text' },
    description: { control: 'text' },
    avatarUrl: { control: 'text' },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<UserProfileCardStoryArgs>((props) => {
    const { themeMode: _themeMode, ...rest } = props;
    return <UserProfileCard {...rest} />;
  }, {
    maxWidth: 360,
    align: 'stretch',
  }),
};

export default meta;

type Story = StoryObj<UserProfileCardStoryArgs>;

export const Grid: Story = {};

export const List: Story = {
  args: {
    layout: 'list',
  },
};

export const DarkTheme: Story = {
  args: {
    layout: 'list',
    themeMode: 'dark',
  },
};
