import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { TelegramFeedbackLink, TelegramFeedbackLinkProps } from './TelegramFeedbackLink';

const meta: Meta<TelegramFeedbackLinkProps> = {
  title: 'Button/TelegramFeedbackLink',
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
};

export const CustomRoom = Template.bind({});
CustomRoom.args = {
  link: 'https://t.me/joinchat/ExampleRoom',
};
