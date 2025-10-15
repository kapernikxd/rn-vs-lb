import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { action } from '../../utils/actions';
import PollCardList from '../../../src/components/Poll/PollCardList';

const meta: Meta<React.ComponentProps<typeof PollCardList>> = {
  title: 'Poll/PollCardList',
  component: PollCardList,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

const Template: StoryFn<React.ComponentProps<typeof PollCardList>> = (args) => <PollCardList {...args} />;

export const Default = Template.bind({});
Default.args = {
  question: 'Which workshop should we schedule next month?',
  creatorName: 'Leslie Alexander',
  creatorAvatar: 'https://i.pravatar.cc/150?img=11',
  votesCount: 42,
  createdAt: '2 days ago',
  onPress: action('open-poll'),
};

export const WithLongQuestion = Template.bind({});
WithLongQuestion.args = {
  question:
    'How should we allocate the annual community grant between environmental initiatives, youth programmes, and cultural projects?',
  creatorName: 'Jacob Jones',
  creatorAvatar: 'https://i.pravatar.cc/150?img=5',
  votesCount: 128,
  createdAt: '5 hours ago',
  onPress: action('open-long-question'),
};

export const WithoutDate = Template.bind({});
WithoutDate.args = {
  question: 'Would you volunteer for a weekend-long clean-up event?',
  creatorName: 'Theresa Webb',
  creatorAvatar: 'https://i.pravatar.cc/150?img=24',
  votesCount: 8,
  createdAt: null,
  onPress: action('open-no-date'),
};

export const MinimalInfo = Template.bind({});
MinimalInfo.args = {
  question: 'Approve the updated code of conduct?',
  creatorName: 'Annette Black',
  creatorAvatar: 'https://i.pravatar.cc/150?img=36',
  votesCount: 230,
  createdAt: 'just now',
};
