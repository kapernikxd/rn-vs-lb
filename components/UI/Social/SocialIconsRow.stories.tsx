import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import SocialIconsRow from './SocialIconsRow';

const meta = {
  title: 'UI/Social/SocialIconsRow',
  component: SocialIconsRow,
  decorators: [(Story) => <View style={{ padding: 16 }}><Story /></View>],
  argTypes: {
    onPressTg: { action: 'onPressTg' },
    onPressInstagram: { action: 'onPressInstagram' },
    onPressFacebook: { action: 'onPressFacebook' },
    onPressVk: { action: 'onPressVk' },
  },
  args: {
    visible: { tg: true, instagram: true, facebook: true, vk: true },
  },
} satisfies Meta<typeof SocialIconsRow>;

export default meta;
type S = StoryObj<typeof SocialIconsRow>;

export const Default: S = {};

export const OnlyTelegramVK: S = {
  args: { visible: { tg: true, vk: true } },
};
