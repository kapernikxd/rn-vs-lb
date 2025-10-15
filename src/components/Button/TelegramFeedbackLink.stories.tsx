import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import { Linking } from 'react-native';
import { TelegramFeedbackLink, TelegramFeedbackLinkProps } from './TelegramFeedbackLink';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type StoryArgs = TelegramFeedbackLinkProps & WithThemeArgs;

const meta: Meta<StoryArgs> = {
  title: 'Components/Button/TelegramFeedbackLink',
  component: TelegramFeedbackLink,
  args: {
    link: 'https://t.me/your_channel',
    themeMode: 'light',
  },
  argTypes: {
    link: { control: 'text' },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<TelegramFeedbackLinkProps>((props) => {
    return <TelegramStoryWrapper {...props} />;
  }, {
    align: 'stretch',
  }),
};

export default meta;

type Story = StoryObj<StoryArgs>;

const TelegramStoryWrapper: React.FC<TelegramFeedbackLinkProps> = (props) => {
  useEffect(() => {
    const originalCanOpenURL = Linking.canOpenURL;
    const originalOpenURL = Linking.openURL;

    Linking.canOpenURL = async () => true;
    Linking.openURL = async (url) => {
      action('openURL')(url);
      return true;
    };

    return () => {
      Linking.canOpenURL = originalCanOpenURL;
      Linking.openURL = originalOpenURL;
    };
  }, []);

  return <TelegramFeedbackLink {...props} />;
};

export const Default: Story = {};

export const DarkTheme: Story = {
  args: {
    themeMode: 'dark',
  },
};
