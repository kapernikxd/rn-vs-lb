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
    onActionPress: { action: 'action press' },
    onConfirm: { action: 'confirm' },
    onReject: { action: 'reject' },
    onProfilePress: { action: 'profile' },
  },
};

export default meta;

const Template: StoryFn<ParticipantItemProps> = (args) => <ParticipantItem {...args} />;

export const PendingParticipant = Template.bind({});
PendingParticipant.args = {
  participant: {
    _id: 'participant-1',
    status: 'PENDING',
    name: 'Jane',
    lastname: 'Cooper',
    avatarFile: '',
  },
  fullName: 'Jane Cooper',
  avatarUrl: 'https://i.pravatar.cc/100?img=5',
  isMe: true,
  myId: 'host-1',
  isModerated: true,
  confirmLabel: 'Confirm',
  rejectLabel: 'Reject',
  deleteLabel: 'Delete',
  youLabel: 'you',
};

export const ConfirmedGuest = Template.bind({});
ConfirmedGuest.args = {
  participant: {
    _id: 'participant-2',
    status: 'CONFIRMED',
    name: 'Robert',
    lastname: 'Fox',
    avatarFile: '',
  },
  fullName: 'Robert Fox',
  avatarUrl: 'https://i.pravatar.cc/100?img=12',
  isMe: true,
  myId: 'participant-2',
  isModerated: false,
  confirmLabel: 'Confirm',
  rejectLabel: 'Reject',
  deleteLabel: 'Delete',
  youLabel: 'you',
};

export const ReadOnlyView = Template.bind({});
ReadOnlyView.args = {
  participant: {
    _id: 'participant-3',
    status: 'REJECTED',
    name: 'Theresa',
    lastname: 'Webb',
    avatarFile: '',
  },
  fullName: 'Theresa Webb',
  avatarUrl: 'https://i.pravatar.cc/100?img=45',
  isMe: false,
  myId: 'host-1',
  isModerated: false,
  confirmLabel: 'Confirm',
  rejectLabel: 'Reject',
  deleteLabel: 'Delete',
  youLabel: 'you',
};
