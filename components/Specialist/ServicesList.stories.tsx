import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import ServicesList, { type ServiceItem } from './ServicesList';

const SERVICES: ServiceItem[] = [
  {
    name: 'Bridal Makeup Trial',
    description: 'Skin prep, natural glam, lashes included.',
    price: 120,
    currency: '€',
    time: '1h 30m',
    photos: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=60'],
  },
  {
    name: 'Evening Glam',
    description: 'Smokey eye or colorful look, lashes included.',
    price: 90,
    currency: '€',
    time: '1h',
    photos: ['https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&auto=format&fit=crop&q=60'],
  },
  {
    name: 'Photoshoot Makeup',
    description: 'Long-wear base, shine control, 2 looks.',
    price: 150,
    currency: '€',
    time: '2h',
  },
];

const meta = {
  title: 'Features/Specialist/ServicesList',
  component: ServicesList,
  decorators: [(Story) => <View style={{ paddingVertical: 12 }}><Story /></View>],
  argTypes: {
    onPressService: { action: 'onPressService' },
    onPressMore: { action: 'onPressMore' },
  },
  args: {
    title: 'Services',
    total: 12,
    services: SERVICES,
    moreLabel: 'MORE',
  },
} satisfies Meta<typeof ServicesList>;

export default meta;
type S = StoryObj<typeof ServicesList>;

export const Default: S = {};

export const WithoutMore: S = {
  args: { total: undefined, onPressMore: undefined },
};

export const LongList: S = {
  args: { services: [...SERVICES, ...SERVICES, ...SERVICES] },
};
