import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import ProfileSummary, { ProfileSummaryProps } from './ProfileSummary';

const meta: Meta<ProfileSummaryProps> = {
  title: 'Profile/ProfileSummary',
  component: ProfileSummary,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onAvatarPress: { action: 'avatar press' },
    onAddPress: { action: 'add press' },
    onEditPress: { action: 'edit press' },
    onWebsitePress: { action: 'website press' },
  },
};

export default meta;

const Template: StoryFn<ProfileSummaryProps> = (args) => <ProfileSummary {...args} />;

export const Default = Template.bind({});
Default.args = {
  avatarUri:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
  name: 'AiPair.pro',
  username: '@ai_pair',
  stats: [
    { label: 'Following', value: '2' },
    { label: 'Follower', value: '1' },
    { label: 'Likes', value: '165' },
  ],
  website: 'https://aipair.pro',
};

export const WithoutAddButton = Template.bind({});
WithoutAddButton.args = {
  ...Default.args,
  showAddButton: false,
};

export const WithLongName = Template.bind({});
WithLongName.args = {
  ...Default.args,
  name: 'AiPair.pro — Personal AI assistant hub',
};
