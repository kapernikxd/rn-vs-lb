import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import SocialStatsPlace from './SocialStatsPlace';
import { ThemeProvider } from '../../../theme/themeContext';

type SocialStatsProps = React.ComponentProps<typeof SocialStatsPlace>;

const meta: Meta<SocialStatsProps> = {
  title: 'UI/Social/SocialStatsPlace',
  component: SocialStatsPlace,
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
    position: {
      control: 'radio',
      options: ['space-between', 'flex-start'],
    },
    hasLike: { control: 'boolean' },
    onLike: { control: false },
  },
};

export default meta;

const Template: StoryFn<SocialStatsProps> = (args) => <SocialStatsPlace {...args} />;

const likeLogger = () => {
  console.log('[storybook:place-like]');
};
const messageLogger = (message: string) => {
  console.log('[storybook:place-message]', message);
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
  messageLogger(message);
};

export const Default = Template.bind({});
Default.args = {
  likes: 15,
  hasLike: false,
};
Default.render = (args) => <SocialStatsPlace {...args} onLike={createAsyncLike(200, 2)} />;

export const AlreadyPinned = Template.bind({});
AlreadyPinned.args = {
  likes: 78,
  hasLike: true,
};
AlreadyPinned.render = (args) => (
  <SocialStatsPlace {...args} onLike={createMessageLike('Already pinned')} />
);

export const CompactAlignment = Template.bind({});
CompactAlignment.args = {
  likes: 3,
  position: 'flex-start',
  hasLike: false,
};
CompactAlignment.render = (args) => <SocialStatsPlace {...args} onLike={createAsyncLike()} />;

export const HighEngagement = Template.bind({});
HighEngagement.args = {
  likes: 1200,
  hasLike: false,
};
HighEngagement.render = (args) => <SocialStatsPlace {...args} onLike={createAsyncLike()} />;
