import React, { useMemo, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemeProvider, useTheme } from '../../theme';
import HeaderDefault from '../Header/HeaderDefault';
import { ProfileMediaGallery } from '../Gallery/ProfileMediaGallery';

const previewStyles = StyleSheet.create({
  previewBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    backgroundColor: '#f5f6f8',
  },
  scrollContent: {
    gap: 24,
  },
});

const meta: Meta = {
  title: 'Screens/Library/MediaLibrary',
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

const previewTabs = [
  { key: 'photos', label: 'Photos', iconName: 'collections' as const },
  { key: 'events', label: 'Events', iconName: 'event' as const },
  { key: 'people', label: 'People', iconName: 'group' as const },
];

const previewImages = [
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1531256456869-ce942a665e80?auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=60',
];

export const MediaLibrary: Story = () => {
  const [activeTab, setActiveTab] = useState(previewTabs[0]?.key);

  return (
    <ScreenSurface>
      <HeaderDefault title="Library" subtitle="Media from community projects" />

      <ScrollView contentContainerStyle={previewStyles.scrollContent}>
        <ProfileMediaGallery
          tabs={previewTabs}
          activeTabKey={activeTab}
          onTabPress={(tab) => setActiveTab(tab.key)}
          images={previewImages}
          extraInfoLabel="+24 shared moments"
          extraInfoActionLabel="Browse"
          onExtraInfoPress={() => {}}
          onUploadPress={() => {}}
          onShowAllPress={() => {}}
        />
      </ScrollView>
    </ScreenSurface>
  );
};
