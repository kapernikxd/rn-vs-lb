import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import EventCard from './EventCard';
import { renderWithTheme, WithThemeArgs } from '../../../storybook/renderWithTheme';

type EventCardStoryArgs = WithThemeArgs & React.ComponentProps<typeof EventCard>;

const meta: Meta<EventCardStoryArgs> = {
  title: 'Components/EventCard/EventCard',
  component: EventCard,
  args: {
    imageUri: 'https://placekitten.com/800/600',
    date: '24 Oct 2024 · 18:00',
    title: 'Community meetup for makers and builders',
    description: 'Connect with other makers to share your experience, learn new tactics, and build the future together.',
    organizerAvatarUri: 'https://placekitten.com/120/120',
    organizerName: 'Makers Hub',
    organizerLink: 'https://example.com',
    likes: 128,
    views: 4300,
    tags: [
      { label: 'Offline', backgroundColor: '#fff1f1', textColor: '#ff4a5c', borderColor: '#ff4a5c' },
      { label: 'Workshop', backgroundColor: '#f3f1f7', textColor: '#6f2da8', borderColor: '#6f2da8' },
    ],
    themeMode: 'light',
  },
  argTypes: {
    imageUri: { control: 'text' },
    date: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    organizerAvatarUri: { control: 'text' },
    organizerName: { control: 'text' },
    organizerLink: { control: 'text' },
    likes: { control: 'number' },
    views: { control: 'number' },
    tags: { control: 'object' },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<EventCardStoryArgs>((props) => {
    const { themeMode: _themeMode, ...rest } = props;
    return <EventCard {...rest} />;
  }, {
    align: 'stretch',
    maxWidth: 380,
  }),
};

export default meta;

type Story = StoryObj<EventCardStoryArgs>;

export const Default: Story = {};

export const DarkTheme: Story = {
  args: {
    themeMode: 'dark',
  },
};

export const MinimalTags: Story = {
  args: {
    tags: [
      { label: 'Online', backgroundColor: '#f3f1f7', textColor: '#6f2da8', borderColor: '#6f2da8' },
    ],
    likes: 12,
    views: 180,
  },
};
