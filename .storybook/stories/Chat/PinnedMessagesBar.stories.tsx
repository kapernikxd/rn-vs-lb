import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from '../../../src/theme';
import PinnedMessagesBar from '../../../src/components/Chat/PinnedMessagesBar/';
import { MessageDTO } from '../../../src/types/message';

type Props = React.ComponentProps<typeof PinnedMessagesBar>;

const meta: Meta<Props> = {
  title: 'Chat/PinnedMessagesBar',
  component: PinnedMessagesBar,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ paddingTop: 24, backgroundColor: '#f6f6f6', flex: 1 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};
export default meta;

// --------------------------------------------------------
// 🧩 MOCK HELPERS
// --------------------------------------------------------

const MY_ID = 'user_me';
const OTHER_ID = 'user_1';

const mkMsg = (partial: Partial<MessageDTO>): MessageDTO => ({
  _id: partial._id ?? Math.random().toString(36).slice(2),
  sender: partial.sender ?? { _id: OTHER_ID },
  content: partial.content ?? 'Pinned message text',
  chat: partial.chat ?? { _id: 'chat_1' },
  readBy: partial.readBy ?? [],
  createdAt: partial.createdAt ?? new Date().toISOString(),
  replyTo: partial.replyTo,
  isEdited: partial.isEdited ?? false,
  images: partial.images ?? [],
  attachments: partial.attachments ?? [],
});

// --------------------------------------------------------
// 🧾 STORIES
// --------------------------------------------------------

const Template: StoryFn<Props> = (args) => <PinnedMessagesBar {...args} />;

// 1️⃣ Один закреплённый
export const SinglePinned = Template.bind({});
SinglePinned.args = {
  pinnedMessages: [
    mkMsg({
      content: 'Welcome! This is a single pinned message.',
      createdAt: '2025-10-15T10:01:00Z',
    }),
  ],
  myId: MY_ID,
  isGroupChat: false,
  onUnpin: action('onUnpin'),
  onPress: action('onPress'),
};

// 2️⃣ Несколько закреплённых
export const MultiplePinned = Template.bind({});
MultiplePinned.args = {
  pinnedMessages: [
    mkMsg({
      content: 'Morning standup at 10:00! 🕙',
      createdAt: '2025-10-15T09:00:00Z',
      readBy: [MY_ID],
    }),
    mkMsg({
      content: 'Check this out → https://pllace.su/event/123',
      createdAt: '2025-10-15T09:15:00Z',
    }),
    mkMsg({
      content: 'Design review today at 4pm.',
      createdAt: '2025-10-15T09:45:00Z',
      isEdited: true,
    }),
  ],
  myId: MY_ID,
  isGroupChat: true,
  onUnpin: action('onUnpin'),
  onPress: action('onPress'),
};

// 3️⃣ С фиксированной высотой карточки
export const FixedHeightCards = Template.bind({});
FixedHeightCards.args = {
  pinnedMessages: [
    mkMsg({ content: 'Short message', createdAt: '2025-10-15T08:55:00Z' }),
    mkMsg({
      content: 'This pinned message has more text and should truncate gracefully.',
      createdAt: '2025-10-15T09:30:00Z',
    }),
    mkMsg({
      content:
        'Another pinned message that is even longer to show ellipsis truncation on fixed height items.',
      createdAt: '2025-10-15T09:45:00Z',
    }),
  ],
  myId: MY_ID,
  isGroupChat: false,
  fixedItemHeight: 70,
  onUnpin: action('onUnpin'),
  onPress: action('onPress'),
};

// 4️⃣ С кастомным отступом
export const CustomSpacing = Template.bind({});
CustomSpacing.args = {
  pinnedMessages: [
    mkMsg({ content: 'Card #1 with spacing', createdAt: '2025-10-15T10:01:00Z' }),
    mkMsg({ content: 'Card #2 with spacing', createdAt: '2025-10-15T10:02:00Z' }),
    mkMsg({ content: 'Card #3 with spacing', createdAt: '2025-10-15T10:03:00Z' }),
  ],
  myId: MY_ID,
  isGroupChat: false,
  itemSpacing: 16,
  onUnpin: action('onUnpin'),
  onPress: action('onPress'),
};

// 5️⃣ Реплай и картинка
export const WithReplyAndImage = Template.bind({});
WithReplyAndImage.args = {
  pinnedMessages: [
    mkMsg({
      content: 'Reply + Image demo',
      createdAt: '2025-10-15T12:00:00Z',
      replyTo: mkMsg({
        _id: 'r1',
        sender: { _id: OTHER_ID },
        content: 'This was the original message being replied to',
        images: [
          'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=60',
        ],
      }),
      images: [
        'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=600&q=60',
      ],
    }),
  ],
  myId: MY_ID,
  isGroupChat: true,
  onUnpin: action('onUnpin'),
  onPress: action('onPress'),
};

// 6️⃣ Прочитанное оппонентом
export const ReadByOpponent = Template.bind({});
ReadByOpponent.args = {
  pinnedMessages: [
    mkMsg({
      _id: 'm-read',
      content: 'This message was read by the opponent',
      readBy: [MY_ID, OTHER_ID],
      createdAt: '2025-10-15T11:00:00Z',
    }),
    mkMsg({
      _id: 'm-unread',
      content: 'This message is not read yet',
      readBy: [MY_ID],
      createdAt: '2025-10-15T11:05:00Z',
    }),
  ],
  myId: MY_ID,
  isGroupChat: false,
  lastReadMessageIdOpponent: 'm-read',
  onUnpin: action('onUnpin'),
  onPress: action('onPress'),
};
