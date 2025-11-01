import React, { useMemo } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemeProvider, useTheme } from '../../theme';
import HeaderDefault from '../Header/HeaderDefault';
import HorizontalCardSection, { HorizontalCard } from '../UI/HorizontalCardSection';

const previewStyles = StyleSheet.create({
  previewBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    backgroundColor: '#f5f6f8',
  },
  scrollContent: {
    gap: 32,
  },
});

const meta: Meta = {
  title: 'Screens/Home/Highlights',
  component: () => null,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={previewStyles.previewBackground}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryFn;

const ScreenSurface: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { sizes, theme } = useTheme();
  const surfaceStyles = useMemo(
    () =>
      StyleSheet.create({
        screen: {
          backgroundColor: theme.background,
          borderRadius: sizes.radius_lg as number,
          padding: sizes.lg as number,
          width: 360,
          minHeight: 640,
          gap: sizes.lg as number,
        },
      }),
    [sizes, theme],
  );

  return <View style={surfaceStyles.screen}>{children}</View>;
};

const eventsCards: HorizontalCard[] = [
  {
    id: 'events-1',
    title: 'Neighbourhood jazz night',
    image: {
      uri: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=60',
    },
  },
  {
    id: 'events-2',
    title: 'DIY solar workshop',
    image: {
      uri: 'https://images.unsplash.com/photo-1529338296731-c4280a6eb54d?auto=format&fit=crop&w=600&q=60',
    },
  },
  {
    id: 'events-3',
    title: 'Park clean-up sunday',
    image: {
      uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=60',
    },
  },
];

const storiesCards: HorizontalCard[] = [
  {
    id: 'stories-1',
    title: 'How volunteers renovated the library',
    image: {
      uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=60',
    },
  },
  {
    id: 'stories-2',
    title: 'Community garden harvest recap',
    image: {
      uri: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=60',
    },
  },
  {
    id: 'stories-3',
    title: 'Artists behind the murals',
    image: {
      uri: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=600&q=60',
    },
  },
];

const specialistsCards: HorizontalCard[] = [
  {
    id: 'specialists-1',
    title: 'Urban planning mentors',
    image: {
      uri: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=60',
    },
  },
  {
    id: 'specialists-2',
    title: 'Cultural heritage experts',
    image: {
      uri: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=60',
    },
  },
  {
    id: 'specialists-3',
    title: 'Storytelling coaches',
    image: {
      uri: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=60',
    },
  },
];

export const HomeHighlights: Story = () => (
  <ScreenSurface>
    <HeaderDefault title="Discover" subtitle="Fresh picks for your community" />

    <ScrollView contentContainerStyle={previewStyles.scrollContent}>
      <HorizontalCardSection
        title="Upcoming events"
        cards={eventsCards}
        onPressSeeAll={() => {}}
        seeAllLabel="All events"
      />

      <HorizontalCardSection
        title="Impact stories"
        cards={storiesCards}
        onPressSeeAll={() => {}}
        seeAllLabel="Read more"
      />

      <HorizontalCardSection
        title="Find specialists"
        cards={specialistsCards}
        onPressSeeAll={() => {}}
        seeAllLabel="View all"
      />
    </ScrollView>
  </ScreenSurface>
);
