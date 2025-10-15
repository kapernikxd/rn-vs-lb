// components/Header/HeaderWithImg.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import HeaderWithImg from './HeaderWithImg';

const meta: Meta<typeof HeaderWithImg> = {
  title: 'Header/HeaderWithImg',
  component: HeaderWithImg,
  args: {
    imgUrl: 'https://placekitten.com/200/200',
    onBackPress: action('back'),
    onImgPress: action('open-profile'),
    title: 'Community volunteers',
    isGroupChat: false,
    users: [
      {
        _id: '1',
        userName: 'Alex Johnson',
      },
    ],
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#f2f2f2' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof HeaderWithImg>;

export default meta;

type Story = StoryObj<typeof HeaderWithImg>;

export const SingleUserOnline: Story = {
  args: {
    isOnline: true,
  },
};

export const SingleUserTyping: Story = {
  args: {
    isTyping: true,
  },
};

export const SingleUserWithMenu: Story = {
  args: {
    onActionPress: action('open-single-menu'),
    title: 'Coordinator chat',
  },
};

export const GroupChatWithActions: Story = {
  args: {
    title: 'Organizers chat',
    isGroupChat: true,
    users: [
      { _id: '1', userName: 'Helena' },
      { _id: '2', userName: 'Miguel' },
      { _id: '3', userName: 'Sara' },
    ],
    typingUserName: 'Miguel',
    isTyping: true,
    onActionPress: action('open-actions'),
  },
};

export const GroupChatIdle: Story = {
  args: {
    title: 'Neighborhood watch',
    isGroupChat: true,
    users: [
      { _id: '1', userName: 'Chris' },
      { _id: '2', userName: 'Lee' },
    ],
    isTyping: false,
    typingUserName: undefined,
    onActionPress: action('action-menu'),
  },
};

export const OfflineUser: Story = {
  args: {
    title: 'Offline contact',
    isOnline: false,
    users: [
      { _id: '1', userName: 'Taylor Smith' },
    ],
  },
};
