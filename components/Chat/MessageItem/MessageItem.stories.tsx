// components/Chat/MessageItem/MessageItem.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, ScrollView, Alert } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from '../../../theme';
import MessageItem, {
  MessageDTO,
  LinkPreviewData,
  MessageItemProps,
} from './';

const meta: Meta<MessageItemProps> = {
  title: 'Chat/MessageItem',
  component: MessageItem,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ padding: 16, backgroundColor: '#f6f6f6', flex: 1 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof MessageItem>;

export default meta;

const MY_ID = 'me-1';
const OTHER_ID = 'user-2';

const mkMsg = (partial: Partial<MessageDTO>): MessageDTO => ({
  _id: partial._id ?? Math.random().toString(36).slice(2),
  sender: partial.sender ?? { _id: OTHER_ID, fullName: 'Alex Johnson' },
  content: partial.content ?? '',
  images: partial.images,
  attachments: partial.attachments,
  createdAt: partial.createdAt ?? '2025-10-15T10:24:00Z',
  isEdited: partial.isEdited ?? false,
  dateLabel: partial.dateLabel,
  replyTo: partial.replyTo ?? null,
});

const mockLinkHandler = (url: string) => {
  action('linkHandler')(url);
  Alert.alert('Open link', url);
};

const mockDownload = (url: string) => {
  action('onDownloadImage')(url);
  Alert.alert('Download image', url);
};

const mockShare = (url: string) => {
  action('onShareImage')(url);
  Alert.alert('Share image', url);
};

type Story = StoryObj<typeof MessageItem>;

export const IncomingText: Story = {
  args: {
    item: mkMsg({ content: 'Hey! How are you?' }),
    myId: MY_ID,
    isGroupChat: false,
    timeText: '10:24',
  },
};

export const OutgoingRead: Story = {
  args: {
    item: mkMsg({ sender: { _id: MY_ID, fullName: 'Me' }, content: 'All good, thanks!' }),
    myId: MY_ID,
    isGroupChat: false,
    timeText: '10:25',
    isReadByOpponent: true,
  },
};

export const GroupIncoming: Story = {
  args: {
    item: mkMsg({
      content: 'Don’t forget about standup.',
      sender: { _id: OTHER_ID, fullName: 'Nora Reed' },
    }),
    myId: MY_ID,
    isGroupChat: true,
    timeText: '09:00',
  },
};

export const WithReply: Story = {
  args: {
    item: mkMsg({
      content: 'Yes, that was the idea!',
      replyTo: {
        _id: 'r1',
        sender: { _id: 'user-3', fullName: 'Michael' },
        content: 'Let’s ship it tomorrow',
        images: [],
        attachments: [],
      },
    }),
    myId: MY_ID,
    isGroupChat: true,
    timeText: '11:12',
  },
};

export const WithImages: Story = {
  args: {
    item: mkMsg({
      sender: { _id: MY_ID, fullName: 'Me' },
      images: [
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=60',
      ],
      content: 'Check these out',
    }),
    myId: MY_ID,
    isGroupChat: false,
    timeText: '12:03',
    onDownloadImage: mockDownload,
    onShareImage: mockShare,
  },
};

export const WithLinkPreview: Story = {
  args: {
    item: mkMsg({
      content: 'Here is the event: https://pllace.su/event/123',
    }),
    myId: MY_ID,
    isGroupChat: false,
    timeText: '13:45',
    linkHandler: mockLinkHandler,
    linkPreview: {
      url: 'https://pllace.su/event/123',
      title: 'Community meetup',
      description: 'Join us for a local community gathering and workshops.',
      image:
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60',
    } as LinkPreviewData,
  },
};

export const LinkPreviewLoading: Story = {
  args: {
    item: mkMsg({
      content: 'Docs: https://developer.apple.com',
    }),
    myId: MY_ID,
    isGroupChat: false,
    timeText: '14:02',
    linkHandler: mockLinkHandler,
    linkPreview: null,
    linkPreviewLoading: true,
  },
};

export const SelectedState: Story = {
  args: {
    item: mkMsg({ content: 'This message is selected' }),
    myId: MY_ID,
    isGroupChat: false,
    timeText: '14:30',
    isSelected: true,
  },
};

export const LongText: Story = {
  args: {
    item: mkMsg({
      content:
        'This is a very long message intended to test wrapping and layout across multiple lines. ' +
        'Also check this: www.example.com and this one https://pllace.su/user/42 — both should be clickable. ' +
        'The message should still look fine and keep paddings consistent.',
    }),
    myId: MY_ID,
    isGroupChat: true,
    timeText: '15:05',
    linkHandler: mockLinkHandler,
  },
};

export const OutgoingNotRead: Story = {
  args: {
    item: mkMsg({
      sender: { _id: MY_ID, fullName: 'Me' },
      content: 'Ping?',
    }),
    myId: MY_ID,
    isGroupChat: false,
    timeText: '15:40',
    isReadByOpponent: false,
  },
};

export const DateSeparator: Story = {
  args: {
    item: mkMsg({ dateLabel: 'Today, Oct 15' }),
    myId: MY_ID,
    isGroupChat: false,
  },
};

export const ListDemo: Story = {
  render: () => {
    const items: MessageDTO[] = [
      mkMsg({ dateLabel: 'Yesterday' }),
      mkMsg({ content: 'Hi!', createdAt: '09:10' }),
      mkMsg({ sender: { _id: MY_ID, fullName: 'Me' }, content: 'Hello there 👋', createdAt: '09:11' }),
      mkMsg({
        content: 'In group we show names',
        sender: { _id: OTHER_ID, fullName: 'Elena Fisher' },
        createdAt: '09:12',
      }),
      mkMsg({
        content: 'Image here',
        images: [
          'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=600&q=60',
        ],
        createdAt: '09:20',
      }),
      mkMsg({
        content: 'See link: https://developer.apple.com',
        createdAt: '09:25',
      }),
      mkMsg({
        content: 'Replying to your note',
        replyTo: {
          _id: 'r2',
          sender: { _id: OTHER_ID, fullName: 'Nora' },
          content: 'Original message content',
        },
        createdAt: '09:30',
      }),
      mkMsg({
        sender: { _id: MY_ID, fullName: 'Me' },
        content:
          'Very long message to check multiline wrapping and spacing. It should remain neat and readable even with a lot of text and a URL like www.google.com inside.',
        createdAt: '09:45',
        isEdited: true,
      }),
    ];

    const [selected, setSelected] = useState<string | null>(null);

    return (
      <ScrollView
        style={{ maxHeight: 640, backgroundColor: '#f6f6f6' }}
        contentContainerStyle={{ gap: 8 }}
      >
        {items.map((m) => (
          <MessageItem
            key={m._id}
            item={m}
            myId={MY_ID}
            isGroupChat
            timeText={m.createdAt.slice(11, 16)}
            isSelected={selected === m._id}
            onLongPress={() => {
              setSelected((prev) => (prev === m._id ? null : m._id));
              action('onLongPress')(m._id);
            }}
            linkHandler={mockLinkHandler}
            onDownloadImage={mockDownload}
            onShareImage={mockShare}
          />
        ))}
      </ScrollView>
    );
  },
};
