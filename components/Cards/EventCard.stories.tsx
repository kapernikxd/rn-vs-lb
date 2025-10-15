import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import EventCard from './EventCard';
import { ThemeProvider } from '../../theme/themeContext';

const meta: Meta<React.ComponentProps<typeof EventCard>> = {
  title: 'Cards/EventCard',
  component: EventCard,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    imageUri: { control: 'text' },
    date: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    organizerAvatarUri: { control: 'text' },
    organizerName: { control: 'text' },
    likes: { control: 'number' },
    views: { control: 'number' },
    isUserParticipantInPost: { control: 'boolean' },
    participantsCount: { control: 'number' },
    maxParticipants: { control: 'number' },
    categories: { control: 'object' },
    price: { control: 'text' },
    hasLike: { control: 'boolean' },
    visible: { control: 'boolean' },
    triggerOnce: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<React.ComponentProps<typeof EventCard>>;

const createAsyncHandler = (delay = 0) => async () => {
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};

const asyncLike = createAsyncHandler();
const viewAction = () => {};

export const Default: Story = {
  args: {
    eventId: 'event-1',
    imageUri:
      'https://images.unsplash.com/photo-1515162305280-d7c46c45d8d0?auto=format&fit=crop&w=900&q=80',
    date: '20:45 · 25 Feb, 2025',
    title: 'Crash Drums Studio',
    description:
      'Crash Drum Studio — пространство, где можно почувствовать силу ритма и научиться играть на ударных в любой форме.',
    organizerAvatarUri: 'https://i.pravatar.cc/150?img=11',
    organizerName: 'Admin Belgrade',
    onPress: () => {},
    likes: 42,
    views: 313,
    onView: viewAction,
    onLike: asyncLike,
    hasLike: false,
    isUserParticipantInPost: false,
    participantsCount: 0,
    visible: true,
  },
};

export const WithParticipants: Story = {
  args: {
    ...Default.args,
    eventId: 'event-2',
    title: 'Tech for Good Meetup',
    description:
      'Митап для разработчиков и волонтёров, обсуждающих цифровые решения для социальных инициатив.',
    organizerName: 'Community Hub',
    likes: 128,
    views: 1280,
    hasLike: true,
    isUserParticipantInPost: true,
    participantsCount: 18,
    maxParticipants: 25,
  },
};

export const WithCategoriesAndPrice: Story = {
  args: {
    ...Default.args,
    eventId: 'event-3',
    title: 'Design Sprint Intensive',
    description:
      'Пятидневный интенсив по быстрому прототипированию продуктов с наставниками из ведущих компаний.',
    categories: ['bot', 'premium'],
    price: '$120',
    likes: 256,
    views: 5400,
    hasLike: false,
    participantsCount: 12,
    maxParticipants: 12,
  },
};

export const CompactDescription: Story = {
  args: {
    ...Default.args,
    eventId: 'event-4',
    date: null,
    title: 'Community Cleanup',
    description: 'Уборка набережной вместе с соседями.',
    organizerName: 'Green City',
    likes: 6,
    views: 85,
    hasLike: false,
    visible: false,
  },
};

export const AsyncLikeDemo: Story = {
  args: {
    ...Default.args,
    eventId: 'event-5',
    title: 'Open Source Hacknight',
    description:
      'Вечер совместной работы над open source-проектами. Наставники помогут настроить окружение и выбрать задачу.',
    hasLike: false,
    onLike: createAsyncHandler(500),
  },
};
