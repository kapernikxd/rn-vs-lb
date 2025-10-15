// components/Cards/EventCard.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import EventCard from './EventCard';
import { ThemeProvider } from '../../theme';

type EventCardProps = React.ComponentProps<typeof EventCard>;

const meta: Meta<EventCardProps> = {
  title: 'Cards/EventCard',
  component: EventCard,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  argTypes: {
    imageUri: {
      control: 'text',
      description: 'URI of the cover image',
    },
    date: {
      control: 'text',
      description: 'Date label shown above the title',
    },
    title: {
      control: 'text',
      description: 'Event title',
    },
    description: {
      control: 'text',
      description: 'Short description displayed under the title',
    },
    organizerAvatarUri: {
      control: 'text',
      description: 'Avatar shown in the organizer row',
    },
    organizerName: {
      control: 'text',
      description: 'Organizer name shown next to the avatar',
    },
    likes: {
      control: { type: 'number' },
    },
    views: {
      control: { type: 'number' },
    },
    isUserParticipantInPost: {
      control: 'boolean',
    },
    participantsCount: {
      control: { type: 'number' },
    },
    maxParticipants: {
      control: { type: 'number' },
    },
    categories: {
      control: 'object',
    },
    price: {
      control: 'text',
    },
    hasLike: {
      control: 'boolean',
    },
    visible: {
      control: 'boolean',
    },
    triggerOnce: {
      control: 'boolean',
    },
  },
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
    likes: 42,
    views: 313,
    hasLike: false,
    isUserParticipantInPost: false,
    participantsCount: 0,
    visible: true,
  },
} satisfies Meta<typeof EventCard>;

export default meta;

type Story = StoryObj<typeof EventCard>;

export const Default: Story = {};

export const WithParticipants: Story = {
  args: {
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
    eventId: 'event-5',
    title: 'Open Source Hacknight',
    description:
      'Вечер совместной работы над open source-проектами. Наставники помогут настроить окружение и выбрать задачу.',
    onLike: async () => {
      // eslint-disable-next-line no-console
      console.log('onLike start');
      await new Promise((resolve) => setTimeout(resolve, 500));
      // eslint-disable-next-line no-console
      console.log('onLike finish');
    },
  },
};
