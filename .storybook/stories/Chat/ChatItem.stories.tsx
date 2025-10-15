// stories/Chat/ChatItem.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, ScrollView } from 'react-native';
import { action } from '../../utils/actions';
import { ThemeProvider } from '../../../src/theme';
import ChatItem, { ChatItemProps } from '../../../src/components/Chat/ChatItem';

const meta: Meta<ChatItemProps> = {
  title: 'Chat/ChatItem',
  component: ChatItem,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ padding: 16, backgroundColor: '#f6f6f6' }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};
export default meta;

const Template: StoryFn<ChatItemProps> = (args) => <ChatItem {...args} />;

export const PersonOnline = Template.bind({});
PersonOnline.args = {
  variant: 'person',
  senderFullName: 'Alex Johnson',
  imgUrl:
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=60',
  isUserOnline: true,
  lastMessage: 'See you at 6pm near the station',
  createdAt: '10:42',
  unread: '+',
  onPress: action('onPress'),
};

export const PersonOffline = Template.bind({});
PersonOffline.args = {
  variant: 'person',
  senderFullName: 'Jane Doe',
  imgUrl:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60',
  isUserOnline: false,
  lastMessage: 'Got it, thanks!',
  createdAt: '09:15',
  onPress: action('onPress'),
};

export const GroupWithSender = Template.bind({});
GroupWithSender.args = {
  variant: 'group',
  chatName: 'Study Group',
  senderFullName: 'Michael',
  imgUrl:
    'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=200&q=60',
  lastMessage: 'Slides are uploaded to Drive, check the link above.',
  createdAt: 'Yesterday',
  unread: '+',
  onPress: action('onPress'),
};

export const Bot = Template.bind({});
Bot.args = {
  variant: 'bot',
  chatName: 'Assistant Bot',
  lastMessage: 'Daily summary is ready. Tap to view.',
  createdAt: '08:00',
  onPress: action('onPress'),
};

export const LongMessageTruncation = Template.bind({});
LongMessageTruncation.args = {
  variant: 'group',
  chatName: 'Project Phoenix',
  senderFullName: 'Elena',
  imgUrl:
    'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=200&q=60',
  lastMessage:
    'Here is a very long message intended to demonstrate two-line truncation in the preview area. It should cut off gracefully and not break the layout on smaller screens.',
  createdAt: 'Mon',
  onPress: action('onPress'),
};

export const ListOfItems: StoryFn = () => {
  const items: ChatItemProps[] = [
    {
      variant: 'person',
      senderFullName: 'Alex Johnson',
      imgUrl:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=60',
      isUserOnline: true,
      lastMessage: 'See you soon!',
      createdAt: '10:42',
      unread: '+',
    },
    {
      variant: 'person',
      senderFullName: 'Jane Doe',
      imgUrl:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60',
      isUserOnline: false,
      lastMessage: 'Thanks for the update.',
      createdAt: '09:15',
    },
    {
      variant: 'group',
      chatName: 'Team Alpha',
      senderFullName: 'Martin',
      imgUrl:
        'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=200&q=60',
      lastMessage: 'Standup in 5 minutes.',
      createdAt: '08:55',
      unread: '+',
    },
    {
      variant: 'group',
      chatName: 'Family',
      imgUrl:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=60',
      lastMessage: 'Dinner at 7?',
      createdAt: 'Yesterday',
    },
    {
      variant: 'bot',
      chatName: 'Reminder Bot',
      lastMessage: 'Your package is arriving today.',
      createdAt: '08:00',
    },
    {
      variant: 'person',
      senderFullName: 'Sam Lee',
      imgUrl:
        'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=200&q=60',
      isUserOnline: true,
      lastMessage:
        'Sending over the files now. Please review and let me know what you think.',
      createdAt: 'Sun',
    },
    {
      variant: 'group',
      chatName: 'Design Guild',
      senderFullName: 'Nora',
      imgUrl:
        'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=200&q=60',
      lastMessage:
        'Updated Figma frames are in the shared project. Comments are welcome.',
      createdAt: 'Sat',
    },
    {
      variant: 'bot',
      chatName: 'Alerts',
      lastMessage: 'Build #145 failed on main.',
      createdAt: 'Fri',
    },
  ];

  return (
    <ScrollView
      style={{ maxHeight: 640, backgroundColor: '#f6f6f6' }}
      contentContainerStyle={{ paddingVertical: 8, gap: 8 }}
    >
      {items.map((item, idx) => (
        <ChatItem key={idx} {...item} onPress={action('onPress')} />
      ))}
    </ScrollView>
  );
};
