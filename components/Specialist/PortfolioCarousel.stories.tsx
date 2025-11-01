import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import PortfolioCarousel from './PortfolioCarousel';

const IMAGES = [
  'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520975922351-6a43b87a37f1?q=80&w=1200&auto=format&fit=crop',
];

const meta = {
  title: 'Features/Specialist/PortfolioCarousel',
  component: PortfolioCarousel,
  decorators: [(Story) => <View style={{ paddingVertical: 12 }}><Story /></View>],
  argTypes: { onPressImage: { action: 'onPressImage' } },
  args: {
    title: 'Photo portfolio',
    images: IMAGES,
  },
} satisfies Meta<typeof PortfolioCarousel>;

export default meta;
type S = StoryObj<typeof PortfolioCarousel>;

export const Default: S = {};

export const ManyImages: S = {
  args: {
    images: [...IMAGES, ...IMAGES, ...IMAGES],
  },
};
