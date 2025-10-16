// stories/UI/StoryCard.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollView, View } from 'react-native';
import StoryCard from './StoryCard';

const meta = {
  title: 'UserCards/StoryCard',
  component: StoryCard,
  // любой onPress будет логироваться в панель Actions
  argTypes: { onPress: { action: 'onPress' } },
  // чуть ограничим ширину, чтобы карта выглядела как в сетке (2 колонки)
  decorators: [
    (Story) => (
      <View style={{ padding: 12, width: 220 }}>
        <Story />
      </View>
    ),
  ],
  args: {
    imageUri: 'https://fastly.picsum.photos/id/349/600/800.jpg?hmac=vx1pfdqmH7uA_MGHITPRB7s9G30K__dfIUC6ePj1XYE',
    title: 'Ruby',
    description:
      'You hear a knock on your apartment door, upon opening it, your c...',
    authorName: 'MILF_BUSTER',
    authorAvatar: 'https://picsum.photos/seed/a/64/64',
    handle: '@MILF_BUSTER',
    views: 3084,
  },
} satisfies Meta<typeof StoryCard>;

export default meta;

type S = StoryObj<typeof StoryCard>;

export const Default: S = {};

export const Party: S = {
  args: {
    imageUri: 'https://picsum.photos/seed/12/600/800',
    title: 'Julia',
    description: "Your friend’s sister at his birthday party",
    authorName: 'Faustynka',
    authorAvatar: 'https://picsum.photos/seed/b/64/64',
    handle: '@Faustynka',
    views: 3355,
  },
};

export const Officer: S = {
  args: {
    imageUri: 'https://picsum.photos/seed/13/600/800',
    title: 'Officer Daisy',
    description:
      'You’re arriving home from work and walking up to your front door...',
    authorName: 'Talkior-GpD8wBi6',
    authorAvatar: 'https://picsum.photos/seed/c/64/64',
    handle: '@Talkior-GpD8wBi6',
    views: 3595,
  },
};

export const WhiteDress: S = {
  args: {
    imageUri: 'https://picsum.photos/seed/14/600/800',
    title: 'Sendi',
    description:
      'I am your sister’s best friend. I have a key and sometimes come unannounced…',
    authorName: 'Sgen',
    authorAvatar: 'https://picsum.photos/seed/d/64/64',
    handle: '@Sgen',
    views: 10456,
  },
};

export const NoHandle: S = {
  args: {
    imageUri: 'https://picsum.photos/seed/15/600/800',
    title: 'Neighbor',
    description: 'Someone knocks at your door late at night…',
    authorName: 'Unknown',
    handle: undefined,
    views: 512,
  },
};

export const NoAvatar: S = {
  args: {
    imageUri: 'https://picsum.photos/seed/16/600/800',
    title: 'Mystery',
    description: 'A short teaser description goes here.',
    authorName: 'Anon',
    authorAvatar: undefined,
    handle: '@anon',
    views: 42,
  },
};

export const LongTextTruncation: S = {
  args: {
    imageUri: 'https://picsum.photos/seed/17/600/800',
    title:
      'A very long headline that should be trimmed to a single line gracefully',
    description:
      'This is an intentionally long description to demonstrate how the text wraps and gets truncated to two lines with an ellipsis in the gradient overlay at the bottom of the card.',
    authorName: 'LongWriter',
    authorAvatar: 'https://picsum.photos/seed/e/64/64',
    handle: '@longwriter',
    views: 9876,
  },
};

export const HugeViews: S = {
  args: {
    imageUri: 'https://picsum.photos/seed/18/600/800',
    title: 'Viral Story',
    description: 'This one blew up overnight.',
    authorName: 'TopAuthor',
    authorAvatar: 'https://picsum.photos/seed/f/64/64',
    handle: '@top',
    views: 120340, // форматирование покажет "120k"
  },
};


const DATA = [
  { seed: '101', title: 'Ruby', desc: 'You hear a knock on your door…', author: 'MILF_BUSTER', handle: '@MILF_BUSTER', views: 3084 },
  { seed: '102', title: 'Julia', desc: 'Friend’s sister at a birthday party', author: 'Faustynka', handle: '@Faustynka', views: 3355 },
  { seed: '103', title: 'Officer Daisy', desc: 'Arriving home after work…', author: 'Talkior-GpD8wBi6', handle: '@Talkior', views: 3595 },
  { seed: '104', title: 'Sendi', desc: 'Sister’s best friend with a spare key…', author: 'Sgen', handle: '@Sgen', views: 10456 },
  { seed: '105', title: 'City Walk', desc: 'Golden hour in old town', author: 'Urbanite', handle: '@urbanite', views: 2140 },
  { seed: '106', title: 'Chef’s Special', desc: 'Secret recipe revealed', author: 'ChefMira', handle: '@chefmira', views: 8421 },
  { seed: '107', title: 'Street Artist', desc: 'Chalk portraits come alive', author: 'Sketcher', handle: '@sketcher', views: 1299 },
  { seed: '108', title: 'Night Runner', desc: '5K under city lights', author: 'PaceFox', handle: '@pacefox', views: 5033 },
  { seed: '109', title: 'Retro Gamer', desc: 'Pixels and perfect combos', author: '8bitNora', handle: '@8bitnora', views: 667 },
  { seed: '110', title: 'Traveler', desc: 'Foggy cliffs, morning ferries', author: 'Sora', handle: '@sora', views: 12034 },
  { seed: '111', title: 'Photographer', desc: 'Framing reflections', author: 'LensLee', handle: '@lenslee', views: 3789 },
  { seed: '112', title: 'Musician', desc: 'Acoustic set under lights', author: 'Aria', handle: '@aria', views: 948 },
  { seed: '113', title: 'Designer', desc: 'From sketch to sleek', author: 'Kite', handle: '@kite', views: 2311 },
  { seed: '114', title: 'Night Coder', desc: 'Refactors at 2 AM', author: 'Vad', handle: '@vad', views: 7642 },
  { seed: '115', title: 'Pilot View', desc: 'Sunrise above clouds', author: 'AeroMax', handle: '@aeromax', views: 18976 },
];

export const Gallery15: S = {
  render: (args) => (
    <ScrollView>
      {/* простая 2-колоночная сетка через flexWrap */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 12, rowGap: 12 }}>
        {DATA.map((it, i) => (
          <View
            key={i}
            style={{
              width: '100%', // две колонки с небольшим отступом
            }}
          >
            <StoryCard
              {...args}
              imageUri={`https://picsum.photos/seed/${it.seed}/600/800`}
              title={it.title}
              description={it.desc}
              authorName={it.author}
              authorAvatar={`https://picsum.photos/seed/${it.seed}a/64/64`}
              handle={it.handle}
              views={it.views}
              onPress={args.onPress}
              // сам компонент задаёт aspectRatio, так что высота выровняется
            />
          </View>
        ))}
      </View>
    </ScrollView>
  ),
};
