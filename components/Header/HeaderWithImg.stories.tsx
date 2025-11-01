import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import HeaderWithImg from './HeaderWithImg';

const meta: Meta = {
  title: 'Layout/Header/HeaderWithImg',
  component: HeaderWithImg,
  args: {
    imgUrl: 'https://placekitten.com/200/200',
    title: 'Community volunteers',
    isGroupChat: false,
    users: [
      {
        _id: '1',
        userName: 'Alex Johnson',
      },
    ],
    typingText: 'typing…',
    onlineText: 'Online',
    offlineText: 'Offline',
    groupTypingSuffix: ': typing…',
    backAccessibilityLabel: 'Back',
    imageAccessibilityLabel: 'Open chat image',
    actionsAccessibilityLabel: 'More actions',
    onlineStatusAccessibilityLabel: 'online',
    offlineStatusAccessibilityLabel: 'offline',
  },
  argTypes: {
    onBackPress: { action: 'back' },
    onImgPress: { action: 'avatar press' },
    onActionPress: { action: 'action press' },
  },
};

export default meta;

type HeaderWithImgProps = React.ComponentProps<typeof HeaderWithImg>;

const Template: StoryFn<HeaderWithImgProps> = (args) => (
  <View style={{ padding: 16, backgroundColor: '#f2f2f2' }}>
    <HeaderWithImg {...args} />
  </View>
);

export const SingleUserOnline = Template.bind({});
SingleUserOnline.args = {
  isOnline: true,
};

export const SingleUserTyping = Template.bind({});
SingleUserTyping.args = {
  isTyping: true,
};

export const SingleUserWithMenu = Template.bind({});
SingleUserWithMenu.args = {
  title: 'Coordinator chat',
};

export const GroupChatWithActions = Template.bind({});
GroupChatWithActions.args = {
  title: 'Organizers chat',
  isGroupChat: true,
  users: [
    { _id: '1', userName: 'Helena' },
    { _id: '2', userName: 'Miguel' },
    { _id: '3', userName: 'Sara' },
  ],
  typingUserName: 'Miguel',
  isTyping: true,
};

export const GroupChatIdle = Template.bind({});
GroupChatIdle.args = {
  title: 'Neighborhood watch',
  isGroupChat: true,
  users: [
    { _id: '1', userName: 'Chris' },
    { _id: '2', userName: 'Lee' },
  ],
  isTyping: false,
  typingUserName: undefined,
};

export const OfflineUser = Template.bind({});
OfflineUser.args = {
  title: 'Offline contact',
  isOnline: false,
  users: [
    { _id: '1', userName: 'Taylor Smith' },
  ],
};
