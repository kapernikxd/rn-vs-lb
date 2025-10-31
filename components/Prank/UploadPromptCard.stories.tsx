import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { ThemeProvider } from '../../theme';
import UploadPromptCard from './UploadPromptCard';

const meta: Meta<typeof UploadPromptCard> = {
  title: 'Prank/UploadPromptCard',
  component: UploadPromptCard,
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
    message: 'Tap here to upload the photo you want to bring to life!'
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

type Story = StoryObj<typeof UploadPromptCard>;

export const Default: Story = {
  args: {
    onPress: () => console.log('Upload pressed'),
  },
};

export const Uploading: Story = {
  args: {
    isUploading: true,
    progress: 0.45,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
