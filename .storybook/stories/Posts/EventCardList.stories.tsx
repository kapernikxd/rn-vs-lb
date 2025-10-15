// stories/Posts/EventCardList.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Text, TouchableOpacity } from 'react-native';
import { action } from '../../utils/actions';
import EventCardList from '../../../src/components/Posts/EventCardList';

type Props = React.ComponentProps<typeof EventCardList>;

const meta: Meta<Props> = {
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

const Template: StoryFn<Props> = (args) => <EventCardList {...args} />;

/** Утилита для правого вертикального оверлея (место, где раньше был тултип) */
const RightOverlay = ({ children }: { children: React.ReactNode }) => (
  <View
    style={{
      width: 32,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      backgroundColor: 'rgba(0,0,0,0.06)', // в приложении можно подменить цвет из темы
    }}
  >
    {children}
  </View>
);

/** Вспомогательный бейдж для примеров */
const Badge = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <View style={{ paddingHorizontal: 2 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 10, textAlign: 'center' }}>{title}</Text>
    {subtitle ? <Text style={{ fontSize: 9, textAlign: 'center' }}>{subtitle}</Text> : null}
  </View>
);

export const DefaultInvitation = Template.bind({});
DefaultInvitation.args = {
  imageUri:
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
  date: 'Sat, 13 Apr · 13:00',
  title: 'Community clean-up initiative',
  description: 'Join us to revitalise the local park and meet fellow volunteers.',
  isInvitation: true,
  onMenuPress: action('open-invitation-menu'),
  participantsCount: 18,
  maxParticipants: 30,
};

export const PendingModeration = Template.bind({});
PendingModeration.args = {
  imageUri:
    'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80',
  date: 'Mon, 22 Apr · 09:30',
  title: 'New volunteer orientation',
  description: 'An introductory session to walk through essential guidelines.',
  isFirstElement: true,
  rightOverlay: (
    <RightOverlay>
      <Badge title="Awaiting" subtitle="review" />
    </RightOverlay>
  ),
  participantsCount: 12,
  maxParticipants: 50,
};

export const RejectedWithReason = Template.bind({});
RejectedWithReason.args = {
  imageUri:
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  date: 'Fri, 3 May · 18:00',
  title: 'Charity concert submission',
  description: 'A proposal for a fundraising concert in the main square.',
  rightOverlay: (
    <RightOverlay>
      <Badge title="Revision" subtitle="requested" />
    </RightOverlay>
  ),
  participantsCount: 0,
  maxParticipants: 120,
};

export const DimmedForModeration = Template.bind({});
DimmedForModeration.args = {
  imageUri:
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
  date: 'Wed, 8 May · 15:00',
  title: 'Workshop: Grant writing essentials',
  description: 'Step-by-step guidance on preparing grant applications.',
  dimmed: true, // затемнение — как было при модерации
  rightOverlay: (
    <RightOverlay>
      <Badge title="Hidden" subtitle="pending" />
    </RightOverlay>
  ),
  participantsCount: 34,
  maxParticipants: 40,
};
