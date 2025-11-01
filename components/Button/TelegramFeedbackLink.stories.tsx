import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { TelegramFeedbackLink, TelegramFeedbackLinkProps } from './TelegramFeedbackLink';

const meta: Meta<TelegramFeedbackLinkProps> = {
  title: 'UI/Buttons/TelegramFeedbackLink',
  component: TelegramFeedbackLink,
  argTypes: {
    link: {
      control: 'text',
      description: 'Deep link to open in Telegram',
    },
  },
};

export default meta;

const Template: StoryFn<TelegramFeedbackLinkProps> = (args) => <TelegramFeedbackLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  link: 'https://t.me/volunteer_support_bot',
  title: 'Feedback & Bugs',
  subtitle: 'Tap to write us in Telegram',
  unsupportedLinkMessage: "Can't open Telegram URL",
};

export const CustomRoom = Template.bind({});
CustomRoom.args = {
  link: 'https://t.me/joinchat/ExampleRoom',
  title: 'Report an Issue',
  subtitle: 'Reach out to the team on Telegram',
  unsupportedLinkMessage: "Can't open Telegram URL",
};
