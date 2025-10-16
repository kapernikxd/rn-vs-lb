// stories/Profile/PureProfileCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import PureProfileCard from  "./ProfileCard";

const meta = {
  title: 'Profile/ProfileCard',
  component: PureProfileCard,
  argTypes: {
    onBack: { action: 'onBack' },
    onOpenSettings: { action: 'onOpenSettings' },
    onOpenActivity: { action: 'onOpenActivity' },
    onOpenSpecialist: { action: 'onOpenSpecialist' },
    onOpenCreatePoll: { action: 'onOpenCreatePoll' },
    onOpenCreateEvent: { action: 'onOpenCreateEvent' },
    onOpenAiBots: { action: 'onOpenAiBots' },
    onOpenBots: { action: 'onOpenBots' },
    onOpenUserSheet: { action: 'onOpenUserSheet' },
    onLearnMorePress: { action: 'onLearnMorePress' },
    onMessage: { action: 'onMessage' },
    onFollowToggle: { action: 'onFollowToggle' },
  },
  decorators: [
    // если у тебя есть ThemeProvider — оберни им здесь
    (Story) => <View style={{ padding: 12 }}><Story /></View>,
  ],
  args: {
    name: 'Vadim Stepanov',
    imageUri: 'https://picsum.photos/seed/profile1/300/300',
    isAuth: true,
    isMe: false,
    isOnline: false,
    lastSeenText: 'Last seen: 2 hours ago',
    specialistEnabled: true,
    hideFollowBtn: false,
    isFollowing: false,
    hasNotifications: true,
  },
} satisfies Meta<typeof PureProfileCard>;

export default meta;
type S = StoryObj<typeof PureProfileCard>;

export const Default: S = {};
export const MeOwner: S = { args: { isMe: true, isOnline: undefined, lastSeenText: undefined } };
export const OnlineUser: S = { args: { isMe: false, isOnline: true, lastSeenText: undefined } };
export const Following: S = { args: { isFollowing: true } };
export const WithoutFollowBtn: S = { args: { hideFollowBtn: true } };
export const MeOwnerWithCreateActions: S = {
  args: {
    isMe: true,
    isAuth: true,
    isOnline: undefined,
    lastSeenText: undefined,
    // наличие коллбеков включает сами кнопки
    onOpenCreatePoll: () => {},
    onOpenCreateEvent: () => {},
  },
};
