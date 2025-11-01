import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import AiAgentHeroCard from './AiAgentHeroCard';

const meta = {
  title: 'Features/UserCards/AiAgentHeroCard',
  component: AiAgentHeroCard,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  args: {
    avatarUri: 'https://i.pravatar.cc/150?img=47',
    displayName: 'Алина Лебедева',
    profession: 'HR-аналитик и карьерный консультант',
    categories: ['HR', 'Карьера', 'AI-инструменты'],
    followButtonTitle: 'Подписаться',
    isFollowUpdating: false,
    disableFollowAction: false,
    isChatLoading: false,
    aiBotId: 'ai-agent-42',
    isFollowing: false,
  },
  argTypes: {
    onToggleFollow: { action: 'toggle-follow' },
    onStartChat: { action: 'start-chat' },
    onAvatarPress: { action: 'avatar-press' },
  },
} satisfies Meta<typeof AiAgentHeroCard>;

export default meta;

type Story = StoryObj<typeof AiAgentHeroCard>;

export const Default: Story = {};

export const Following: Story = {
  args: {
    isFollowing: true,
    followButtonTitle: 'Отписаться',
  },
};

export const LoadingStates: Story = {
  args: {
    isFollowUpdating: true,
    isChatLoading: true,
  },
};

export const WithoutCategories: Story = {
  args: {
    categories: [],
  },
};

export const ChatUnavailable: Story = {
  args: {
    aiBotId: undefined,
  },
};
