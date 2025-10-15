// components/Cards/PlaceCard.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PlaceCard from './PlaceCard';
import { ThemeProvider } from '../../theme';

type PlaceCardProps = React.ComponentProps<typeof PlaceCard>;

const meta: Meta<PlaceCardProps> = {
  title: 'Cards/PlaceCard',
  component: PlaceCard,
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
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    visible: {
      control: 'boolean',
    },
    triggerOnce: {
      control: 'boolean',
    },
  },
  args: {
    eventId: 'place-1',
    imageUri:
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80',
    title: 'Creative Hub Belgrade',
    description:
      'A cosy space for community gatherings, workshops and cultural events right in the city center.',
    visible: true,
  },
} satisfies Meta<typeof PlaceCard>;

export default meta;

type Story = StoryObj<typeof PlaceCard>;

export const Default: Story = {};

export const HiddenByDefault: Story = {
  args: {
    visible: false,
  },
};

export const CustomDescription: Story = {
  args: {
    title: 'City Museum',
    description:
      'Discover exhibitions that highlight the rich heritage of the city. Guided tours available every weekend.',
  },
};

export const TriggerMultipleTimes: Story = {
  args: {
    triggerOnce: false,
  },
};
