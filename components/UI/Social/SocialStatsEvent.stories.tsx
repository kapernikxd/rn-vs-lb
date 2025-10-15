import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import SocialStatsEvent from '../../../../src/components/UI/Social/SocialStatsEvent';
import { ThemeProvider } from '../../../../src/theme/themeContext';

type SocialStatsProps = React.ComponentProps<typeof SocialStatsEvent>;

const meta: Meta<SocialStatsProps> = {
  title: 'UI/Social/SocialStatsEvent',
  component: SocialStatsEvent,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ padding: 24, backgroundColor: '#ffffff' }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    likes: { control: 'number' },
    views: { control: 'number' },
    position: {
      control: 'radio',
      options: ['space-between', 'flex-start'],
    },
    hasLike: { control: 'boolean' },
  },
};

export default meta;

const Template: StoryFn<SocialStatsProps> = (args) => <SocialStatsEvent {...args} />;

const likeLogger = () => {
  console.log('[storybook:event-like]');
};
const messageLikeLogger = (message: string) => {
  console.log('[storybook:event-like:message]', message);
};
const createAsyncLike = (delay = 0, repeat = 1) => async () => {
  for (let i = 0; i < repeat; i += 1) {
    likeLogger();

    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
const createMessageLike = (message: string) => () => {
  messageLikeLogger(message);
};

export const Default = Template.bind({});
Default.args = {
  likes: 12,
  views: 340,
  hasLike: false,
  onLike: createAsyncLike(300, 2),
};

export const AlreadyLiked = Template.bind({});
AlreadyLiked.args = {
  likes: 98,
  views: 1024,
  hasLike: true,
  onLike: createMessageLike('Already liked story'),
};

export const CompactAlignment = Template.bind({});
CompactAlignment.args = {
  likes: 4,
  views: 56,
  position: 'flex-start',
  hasLike: false,
  onLike: createAsyncLike(),
};

export const LargeNumbers = Template.bind({});
LargeNumbers.args = {
  likes: 12450,
  views: 324000,
  hasLike: false,
  onLike: createAsyncLike(),
};
