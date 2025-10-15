// components/Header/HeaderEdit.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HeaderEdit } from './HeaderEdit';

const meta: Meta<typeof HeaderEdit> = {
  title: 'Header/HeaderEdit',
  component: HeaderEdit,
  args: {
    onClosePress: action('close'),
    onCopy: action('copy'),
    onReportMessage: action('report'),
    onPinToggle: action('toggle-pin'),
    isPinned: false,
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#f8f8f8' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof HeaderEdit>;

export default meta;

type Story = StoryObj<typeof HeaderEdit>;

export const Default: Story = {};

export const WithEditAction: Story = {
  args: {
    onEdit: action('edit'),
  },
};

export const PinnedMessage: Story = {
  args: {
    isPinned: true,
    onPinToggle: action('unpin'),
  },
};

export const MinimalActions: Story = {
  args: {
    onEdit: undefined,
    onCopy: action('copy-minimal'),
    onReportMessage: action('report-minimal'),
    onPinToggle: action('pin-minimal'),
    isPinned: false,
  },
};
