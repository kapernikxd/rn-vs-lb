import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TelegramFeedbackLink, {
  TelegramFeedbackLinkProps,
} from '../../../src/components/profile/TelegramFeedbackLink';

const meta: Meta<TelegramFeedbackLinkProps> = {
  title: 'Profile/TelegramFeedbackLink',
  component: TelegramFeedbackLink,
  args: {
    url: 'https://t.me/example_support_chat',
    onOpenUrl: (url: string) => action('open-telegram')(url),
  },
};

export default meta;

type Story = StoryObj<TelegramFeedbackLinkProps>;

export const Default: Story = {};

export const CustomCopy: Story = {
  args: {
    title: 'Need help?',
    description: 'Chat with our support team on Telegram',
  },
};
