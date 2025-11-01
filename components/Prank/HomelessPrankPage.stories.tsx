import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { ThemeProvider, useTheme } from '../../theme';
import Spacer from '../UI/Spacer';
import HeroPrankCard from './HeroPrankCard';
import UploadPromptCard from './UploadPromptCard';

const PagePreview: React.FC = () => {
  const { sizes } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#070C1F' }}
      contentContainerStyle={{ padding: sizes.lg }}
    >
      <View>
        <HeroPrankCard
          imageUri="https://images.unsplash.com/photo-1621447462558-42b4d8bc5d9b?auto=format&fit=crop&w=900&q=80"
          title="Homeless Prank"
          description="Prank your loved ones with a unknown guest in your home!"
        />
        <Spacer size="lg" />
        <UploadPromptCard onPress={() => console.log('Upload pressed')} />
      </View>
      <Spacer size="xl" />
    </ScrollView>
  );
};

const meta: Meta<typeof PagePreview> = {
  title: 'Features/Prank/HomelessPrankPage',
  component: PagePreview,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
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

export const Default: StoryFn<typeof PagePreview> = () => <PagePreview />;
