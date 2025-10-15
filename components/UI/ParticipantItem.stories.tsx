import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ParticipantItem } from './ParticipantItem';

type ParticipantItemProps = React.ComponentProps<typeof ParticipantItem>;

const meta: Meta<ParticipantItemProps> = {
  title: 'UI/ParticipantItem',
  component: ParticipantItem,
  argTypes: {
    isMe: {
      control: 'boolean',
      description: 'Indicates if the current user sees the item',
    },
    isModerated: {
      control: 'boolean',
      description: 'Shows moderation actions instead of deletion',
    },
  },
};

export default meta;

const Template: StoryFn<ParticipantItemProps> = (args) => <ParticipantItem {...args} />;

const actionWithId = (label: string) => (id: string) => {
  console.log(`[storybook:${label}]`, id);
};

export const PendingParticipant = Template.bind({});
PendingParticipant.args = {
  participant: {
    _id: 'participant-1',
    status: 'PENDING',
  },
  fullName: 'Jane Cooper',
  avatarUrl: 'https://i.pravatar.cc/100?img=5',
  isMe: true,
  myId: 'host-1',
  isModerated: true,
  onActionPress: actionWithId('on-action-press'),
  onConfirm: actionWithId('on-confirm'),
  onReject: actionWithId('on-reject'),
  onProfilePress: actionWithId('open-profile'),
};

export const ConfirmedGuest = Template.bind({});
ConfirmedGuest.args = {
  participant: {
    _id: 'participant-2',
    status: 'CONFIRMED',
  },
  fullName: 'Robert Fox',
  avatarUrl: 'https://i.pravatar.cc/100?img=12',
  isMe: true,
  myId: 'participant-2',
  isModerated: false,
  onActionPress: actionWithId('remove-participant'),
  onConfirm: actionWithId('confirm-participant'),
  onReject: actionWithId('reject-participant'),
  onProfilePress: actionWithId('open-profile'),
};

export const ReadOnlyView = Template.bind({});
ReadOnlyView.args = {
  participant: {
    _id: 'participant-3',
    status: 'REJECTED',
  },
  fullName: 'Theresa Webb',
  avatarUrl: 'https://i.pravatar.cc/100?img=45',
  isMe: false,
  myId: 'host-1',
  isModerated: false,
  onActionPress: actionWithId('on-action-readonly'),
  onConfirm: actionWithId('on-confirm-readonly'),
  onReject: actionWithId('on-reject-readonly'),
  onProfilePress: actionWithId('open-profile'),
};
