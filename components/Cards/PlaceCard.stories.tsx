import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PlaceCard from './PlaceCard';
import { ThemeProvider } from '../../theme/themeContext';

const meta: Meta<React.ComponentProps<typeof PlaceCard>> = {
  title: 'UI/Cards/PlaceCard',
  component: PlaceCard,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    imageUri: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    visible: { control: 'boolean' },
    triggerOnce: { control: 'boolean' },
    onView: { action: 'view place' },
  },
};

export default meta;

type Story = StoryObj<React.ComponentProps<typeof PlaceCard>>;

export const Default: Story = {
  args: {
    eventId: 'place-1',
    imageUri:
      'https://images.unsplash.com/photo-1464029902023-f42eba355bde?auto=format&fit=crop&w=900&q=80',
    title: 'Belgrade Innovation Hub',
    description:
      'Современное пространство для командной работы, тренингов и запусков социальных проектов.',
    visible: true,
  },
};

export const LongDescription: Story = {
  args: {
    ...Default.args,
    eventId: 'place-2',
    title: 'Riverside Community Center',
    description:
      'Центр, созданный для мероприятий, выставок и волонтёрских встреч. Оборудован звуковой системой, кухней и зоной для мастер-классов. Есть возможность забронировать отдельные комнаты для консультаций и тренингов.',
    visible: false,
  },
};

export const AnalyticsMode: Story = {
  args: {
    ...Default.args,
    eventId: 'place-3',
    title: 'Creative Loft',
    description: 'Многофункциональное пространство с яркой атмосферой и арт-галереей.',
    triggerOnce: false,
    visible: true,
  },
  render: (args) => {
    const analyticsPrimaryView = (eventId: string) => console.log('[storybook:place-card:primary-view]', eventId);
    const analyticsSecondaryView = (eventId: string) => console.log('[storybook:place-card:secondary-view]', eventId);

    return (
      <PlaceCard
        {...args}
        onView={(eventId) => {
          analyticsPrimaryView(eventId);
          analyticsSecondaryView(eventId);
        }}
      />
    );
  },
};

export const MinimalContent: Story = {
  args: {
    ...Default.args,
    eventId: 'place-4',
    title: 'Local Library Hall',
    description: 'Уютный зал для камерных встреч.',
    visible: false,
    onView: undefined,
  },
};
