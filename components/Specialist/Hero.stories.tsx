import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import Hero from './Hero';
import SocialIconsRow from '../UI/Social/SocialIconsRow';

const meta = {
  title: 'Features/Specialist/Hero',
  component: Hero,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#111', paddingBottom: 120 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onBack: { action: 'onBack' },
    onShare: { action: 'onShare' },
    onMessage: { action: 'onMessage' },
    onPressMap: { action: 'onPressMap' },
  },
  args: {
    coverUrl: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1600&auto=format&fit=crop',
    avatarUrl: 'https://i.pravatar.cc/200?img=12',
    fullName: 'Ava Carter',
    profession: 'Makeup Artist',
    addressLine: '12 Riverside Dr, NYC',
    showOnMap: true,
    mapLabel: 'On the map',
  },
} satisfies Meta<typeof Hero>;

export default meta;
type S = StoryObj<typeof Hero>;

export const Default: S = {};

export const WithSocials: S = {
  render: (args) => (
    <Hero
      {...args}
      socials={
        <SocialIconsRow
          visible={{ tg: true, instagram: true, facebook: true, vk: true }}
          onPressTg={() => console.log('tg')}
          onPressInstagram={() => console.log('ig')}
          onPressFacebook={() => console.log('fb')}
          onPressVk={() => console.log('vk')}
        />
      }
    />
  ),
};

export const NoMapNoProfession: S = {
  args: {
    profession: undefined,
    showOnMap: false,
    addressLine: 'Belgrade, Serbia',
  },
};
