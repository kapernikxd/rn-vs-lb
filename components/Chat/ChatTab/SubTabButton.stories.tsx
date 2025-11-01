import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import SubTabButton from './SubTabButton';

const meta = {
  title: 'Features/Chat/SubTabButton',
  component: SubTabButton,
  decorators: [(Story) => <View style={{ padding: 12 }}><Story /></View>],
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    label: 'Owned Bots',
    active: false,
  },
} satisfies Meta<typeof SubTabButton>;

export default meta;
type S = StoryObj<typeof SubTabButton>;

export const Default: S = {};

export const Active: S = {
  args: { active: true },
};

export const FeedbackTab: S = {
  args: { label: 'Feedback bots' },
};
