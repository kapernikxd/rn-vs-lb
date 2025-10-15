import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import SocialStatsPlace from '../../../../src/components/UI/Social/SocialStatsPlace';
import { ThemeProvider } from '../../../../src/theme/themeContext';

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
  },
};

export default meta;

const Template: StoryFn<SocialStatsProps> = (args) => <SocialStatsPlace {...args} />;

export const Default = Template.bind({});
Default.args = {
  likes: 15,
  hasLike: false,
  onLike: async () => {
    action('onLike start')();
    await new Promise((resolve) => setTimeout(resolve, 200));
    action('onLike finish')();
  },
};

export const AlreadyPinned = Template.bind({});
AlreadyPinned.args = {
  likes: 78,
  hasLike: true,
  onLike: async () => action('toggle pin')('Already pinned'),
};

export const CompactAlignment = Template.bind({});
CompactAlignment.args = {
  likes: 3,
  position: 'flex-start',
  hasLike: false,
  onLike: async () => action('compact pin')(),
};

export const HighEngagement = Template.bind({});
HighEngagement.args = {
  likes: 1200,
  hasLike: false,
  onLike: async () => action('popular place pin')(),
};
