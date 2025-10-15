import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import HeaderWithImg from './HeaderWithImg';

const backPressHandler = () => {
  console.log('[storybook:header-with-img:back]');
};
const imgPressHandler = () => {
  console.log('[storybook:header-with-img:avatar]');
};
const actionPressHandler = () => {
  console.log('[storybook:header-with-img:action]');
};

const meta: Meta = {
  title: 'Header/HeaderWithImg',
  component: HeaderWithImg,
  args: {
    imgUrl: 'https://placekitten.com/200/200',
    onBackPress: backPressHandler,
    onImgPress: imgPressHandler,
    title: 'Community volunteers',
    isGroupChat: false,
    users: [
      {
        _id: '1',
        userName: 'Alex Johnson',
      },
    ],
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
  onActionPress: actionPressHandler,
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
  onActionPress: actionPressHandler,
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
  onActionPress: actionPressHandler,
};

export const OfflineUser = Template.bind({});
OfflineUser.args = {
  title: 'Offline contact',
  isOnline: false,
  users: [
    { _id: '1', userName: 'Taylor Smith' },
  ],
};
