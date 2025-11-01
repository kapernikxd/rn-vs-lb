import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { ThemeProvider } from '../../theme';
import HeroPrankCard from './HeroPrankCard';

const meta: Meta<typeof HeroPrankCard> = {
  title: 'Features/Prank/HeroPrankCard',
  component: HeroPrankCard,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ padding: 24, backgroundColor: '#070C1F', flex: 1 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  args: {
    imageUri:
      'https://images.unsplash.com/photo-1621447462558-42b4d8bc5d9b?auto=format&fit=crop&w=900&q=80',
    title: 'Homeless Prank',
    description: 'Prank your loved ones with a unknown guest in your home!',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#070C1F' },
        { name: 'light', value: '#f5f5f5' },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof HeroPrankCard>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    onPress: () => console.log('Hero card pressed'),
  },
};
