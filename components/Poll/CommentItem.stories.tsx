// stories/Comments/CommentItem.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Alert } from 'react-native';
import CommentItem, { Comment, User } from '../../../src/components/Poll/CommentItem';
import { ThemeProvider } from '../../../src/theme';
import { ScrollView } from 'react-native';

// Базовые данные
const baseUser: User = {
    _id: 'u1',
    fullName: 'Alex Johnson',
    avatarUrl:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=60',
};

const baseComment: Comment = {
    _id: 'c1',
    text: 'Hey! Check this site: https://pllace.su/event/123 and also www.google.com',
    createdAt: '2025-10-15T10:24:00Z',
    createdBy: baseUser,
};

type Props = React.ComponentProps<typeof CommentItem>;


const generateComments = (count: number): Comment[] =>
    Array.from({ length: count }, (_, i) => ({
        _id: `c${i + 1}`,
        text:
            i % 3 === 0
                ? `Comment ${i + 1}: check out https://pllace.su/event/${i + 100}`
                : i % 3 === 1
                    ? `Comment ${i + 1}: plain text with no link.`
                    : `Comment ${i + 1}: visit www.example${i + 1}.com for info.`,
        createdAt: `2025-10-15T10:${(i + 10).toString().padStart(2, '0')}:00Z`,
        createdBy: {
            ...baseUser,
            _id: `u${i + 1}`,
            fullName: i % 2 === 0 ? `Alex Johnson ${i + 1}` : `Jane Doe ${i + 1}`,
            avatarUrl:
                i % 2 === 0
                    ? 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=60'
                    : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60',
        },
    }));

const meta: Meta<Props> = {
    title: 'Poll/CommentItem',
    component: CommentItem,
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

const Template: StoryFn<Props> = (args) => <CommentItem {...args} />;

const userPressLogger = (userId: string) => {
    console.log('[storybook:comment-item:user]', userId);
};
const linkPressLogger = (url: string) => {
    console.log('[storybook:comment-item:link]', url);
};
const handleUserPress: Props['onPressUser'] = (userId) => userPressLogger(userId);
const handleLink = (url: string) => {
    linkPressLogger(url);
    Alert.alert('Custom link handler', url);
};

export const Default = Template.bind({});
Default.args = {
    comment: baseComment,
    onPressUser: handleUserPress,
    // linkHandler не передаем — ссылки откроются через Linking.openURL
};

export const WithCustomLinkHandler = Template.bind({});
WithCustomLinkHandler.args = {
    comment: baseComment,
    onPressUser: handleUserPress,
    linkHandler: handleLink,
};

export const LongTextTruncated = Template.bind({});
LongTextTruncated.args = {
    comment: {
        ...baseComment,
        _id: 'c2',
        text:
            'This is a very long comment with multiple links and words to demonstrate wrapping and truncation. ' +
            'Visit www.example.com for details, or read docs at https://developer.apple.com. ' +
            'Also our portal: https://pllace.su/user/42. Thanks!',
    },
    onPressUser: handleUserPress,
    // Можно подать отформатированную дату
    timeTextOverride: '5m ago',
};

export const WithoutAvatar = Template.bind({});
WithoutAvatar.args = {
    comment: {
        ...baseComment,
        _id: 'c3',
        createdBy: { _id: 'u2', fullName: 'No Avatar User' }, // без avatarUrl
        text: 'Plain text without links. Looks clean.',
    },
    onPressUser: handleUserPress,
};

export const OnlyPlainText = Template.bind({});
OnlyPlainText.args = {
    comment: {
        ...baseComment,
        _id: 'c4',
        text:
            'No links here. Just a short message to verify default text rendering and spacing.',
    },
    timeTextOverride: 'Yesterday 14:32',
    onPressUser: handleUserPress,
};


export const FifteenComments: StoryFn = () => {
  const comments = generateComments(15);

  return (
    <ScrollView
      style={{ maxHeight: 600 }}
      contentContainerStyle={{ gap: 8 }} // небольшой вертикальный интервал
    >
      {comments.map((c) => (
        <CommentItem
          key={c._id}
          comment={c}
          onPressUser={handleUserPress}
          linkHandler={handleLink}
          timeTextOverride="5m ago"
        />
      ))}
    </ScrollView>
  );
};