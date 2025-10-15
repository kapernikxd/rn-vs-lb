import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { ParticipantItem } from './ParticipantItem';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type ParticipantStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'NONE';

type ParticipantItemProps = Omit<React.ComponentProps<typeof ParticipantItem>, 'participant'>;

type ParticipantItemStoryArgs = WithThemeArgs & ParticipantItemProps & {
  participantId: string;
  status: ParticipantStatus;
};

const meta: Meta<ParticipantItemStoryArgs> = {
  title: 'Components/UI/ParticipantItem',
  component: ParticipantItem as unknown as React.ComponentType<ParticipantItemStoryArgs>,
  args: {
    participantId: 'user-1',
    fullName: 'Jordan Smith',
    avatarUrl: 'https://placekitten.com/200/200',
    isMe: true,
    myId: 'user-2',
    isModerated: true,
    status: 'PENDING',
    onActionPress: action('onActionPress'),
    onConfirm: action('onConfirm'),
    onReject: action('onReject'),
    onProfilePress: action('onProfilePress'),
    themeMode: 'light',
  },
  argTypes: {
    participantId: { control: 'text' },
    fullName: { control: 'text' },
    avatarUrl: { control: 'text' },
    isMe: { control: 'boolean' },
    myId: { control: 'text' },
    isModerated: { control: 'boolean' },
    status: {
      control: 'select',
      options: ['NONE', 'PENDING', 'CONFIRMED', 'REJECTED'],
    },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<ParticipantItemStoryArgs>((props) => {
    const { participantId, status, themeMode: _themeMode, ...rest } = props;
    const participant = {
      _id: participantId,
      status: status === 'NONE' ? undefined : status,
    };
    return <ParticipantItem {...(rest as ParticipantItemProps)} participant={participant} />;
  }, {
    align: 'stretch',
    maxWidth: 360,
  }),
};

export default meta;

type Story = StoryObj<ParticipantItemStoryArgs>;

export const Pending: Story = {};

export const ConfirmedSelf: Story = {
  args: {
    status: 'CONFIRMED',
    isMe: true,
    myId: 'user-1',
    themeMode: 'dark',
  },
};

export const ModeratedActions: Story = {
  args: {
    status: 'REJECTED',
    isModerated: true,
    isMe: true,
    myId: 'user-99',
  },
};
