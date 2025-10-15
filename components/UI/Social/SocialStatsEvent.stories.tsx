import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
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

export const Default = Template.bind({});
Default.args = {
  likes: 12,
  views: 340,
  hasLike: false,
  onLike: async () => {
    action('onLike start')();
    await new Promise((resolve) => setTimeout(resolve, 300));
    action('onLike finish')();
  },
};

export const AlreadyLiked = Template.bind({});
AlreadyLiked.args = {
  likes: 98,
  views: 1024,
  hasLike: true,
  onLike: async () => {
    action('toggle like')('Already liked story');
  },
};

export const CompactAlignment = Template.bind({});
CompactAlignment.args = {
  likes: 4,
  views: 56,
  position: 'flex-start',
  hasLike: false,
  onLike: async () => action('onLike compact')(),
};

export const LargeNumbers = Template.bind({});
LargeNumbers.args = {
  likes: 12450,
  views: 324000,
  hasLike: false,
  onLike: async () => action('onLike large')(),
};
