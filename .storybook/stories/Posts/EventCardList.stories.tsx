import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Text } from 'react-native';
import { action } from '@storybook/addon-actions';
import EventCardList from '../../../src/components/Posts/EventCardList';

const tooltipContent = (
  <View>
    <Text style={{ fontWeight: 'bold' }}>Moderation status</Text>
    <Text>Your submission is still pending approval.</Text>
  </View>
);

type EventCardListProps = React.ComponentProps<typeof EventCardList>;

const meta: Meta<EventCardListProps> = {
  title: 'Posts/EventCardList',
  component: EventCardList,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

const Template: StoryFn<EventCardListProps> = (args) => <EventCardList {...args} />;

export const DefaultInvitation = Template.bind({});
DefaultInvitation.args = {
  imageUri: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
  date: 'Sat, 13 Apr · 13:00',
  title: 'Community clean-up initiative',
  description: 'Join us to revitalise the local park and meet fellow volunteers.',
  createdByMe: false,
  isModerated: false,
  isInvitation: true,
  onPress: action('open-invitation-menu'),
  moderationStatus: 'APPROVED',
  participantsCount: 18,
  maxParticipants: 30,
  tooltipContent,
};

export const PendingModeration = Template.bind({});
PendingModeration.args = {
  imageUri: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80',
  date: 'Mon, 22 Apr · 09:30',
  title: 'New volunteer orientation',
  description: 'An introductory session to walk through essential guidelines.',
  createdByMe: true,
  isModerated: false,
  isInvitation: false,
  isFirstElement: true,
  moderationStatus: 'PENDING',
  participantsCount: 12,
  maxParticipants: 50,
  tooltipContent: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Awaiting review</Text>
      <Text>Moderators usually respond within 24 hours.</Text>
    </View>
  ),
};

export const RejectedWithReason = Template.bind({});
RejectedWithReason.args = {
  imageUri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  date: 'Fri, 3 May · 18:00',
  title: 'Charity concert submission',
  description: 'A proposal for a fundraising concert in the main square.',
  createdByMe: true,
  isModerated: false,
  isInvitation: false,
  moderationStatus: 'REJECTED',
  moderationImageStatus: 'PENDING',
  participantsCount: 0,
  maxParticipants: 120,
  tooltipContent: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Revision requested</Text>
      <Text>Update the description and attach a signed venue agreement.</Text>
    </View>
  ),
};

export const DimmedForModeration = Template.bind({});
DimmedForModeration.args = {
  imageUri: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
  date: 'Wed, 8 May · 15:00',
  title: 'Workshop: Grant writing essentials',
  description: 'Step-by-step guidance on preparing grant applications.',
  createdByMe: false,
  isModerated: true,
  isInvitation: false,
  moderationStatus: 'PENDING',
  participantsCount: 34,
  maxParticipants: 40,
  tooltipContent: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Temporarily hidden</Text>
      <Text>The event is not visible while moderators verify its content.</Text>
    </View>
  ),
};
