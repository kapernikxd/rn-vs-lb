import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BusinessIdeaCard from './BusinessIdeaCard';
import { ThemeProvider } from '../../theme/themeContext';

const meta: Meta<typeof BusinessIdeaCard> = {
  title: 'Cards/BusinessIdeaCard',
  component: BusinessIdeaCard,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    avatarUri: { control: 'text' },
    channelLabel: { control: 'text' },
    imageUri: { control: 'text' },
    quote: { control: 'text' },
    likes: { control: 'number' },
    comments: { control: 'number' },
    shares: { control: 'number' },
    timeAgo: { control: 'text' },
    liked: { control: 'boolean' },
    showMore: { control: 'boolean' },
    showMoreLabel: { control: 'text' },
    onPressLike: { action: 'like pressed' },
    onPressComment: { action: 'comment pressed' },
    onPressShare: { action: 'share pressed' },
    onPressMore: { action: 'more pressed' },
    onPressShowMore: { action: 'show more pressed' },
  },
};

export default meta;

type Story = StoryObj<typeof BusinessIdeaCard>;

export const Default: Story = {
  args: {
    avatarUri: 'https://i.pravatar.cc/100?img=65',
    channelLabel: 'Бизнес идеи',
    imageUri:
      'https://images.wsj.net/im-861283?width=700&height=467',
    quote:
      '«Я думаю, что мы будем жить в мире, где появятся сотни миллионов и миллиарды разных ИИ-агентов, и, возможно, их будет больше, чем людей»',
    likes: 13,
    comments: 7,
    shares: 5,
    timeAgo: '2 d ago',
    showMoreLabel: 'Show more',
    showMore: true,
  },
};

export const WithoutAvatar: Story = {
  args: {
    ...Default.args,
    avatarUri: '',
    channelLabel: 'AI news',
  },
};

export const LongQuote: Story = {
  args: {
    ...Default.args,
    quote:
      '«Мы видим, как искусственный интеллект постепенно перестает быть инструментом и становится полноценным партнером в работе. В ближайшие годы появится огромное количество агентов, которые будут помогать людям решать бытовые и профессиональные задачи, освобождая время для творчества и стратегического мышления.»',
    showMore: false,
    liked: true,
  },
};
