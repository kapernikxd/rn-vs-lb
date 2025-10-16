// stories/Profile/PureProfilePhotoUpload.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Button } from 'react-native';
import PureProfilePhotoUpload from './ProfilePhotoUpload';

const meta = {
  title: 'Profile/PureProfilePhotoUpload',
  component: PureProfilePhotoUpload,
  argTypes: {
    onPressSelect: { action: 'onPressSelect' },
    onPressRemove: { action: 'onPressRemove' },
    onPressEye: { action: 'onPressEye' },
    onRequestOpenPreview: { action: 'onRequestOpenPreview' },
    onRequestClosePreview: { action: 'onRequestClosePreview' },
  },
  args: {
    size: 180,
  },
  decorators: [(Story) => <View style={{ padding: 16 }}><Story /></View>],
} satisfies Meta<typeof PureProfilePhotoUpload>;

export default meta;
type S = StoryObj<typeof PureProfilePhotoUpload>;

export const WithPhoto: S = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <View>
        <Button title={open ? 'Close preview' : 'Open preview'} onPress={() => setOpen(!open)} />
        <PureProfilePhotoUpload
          {...args}
          imageUri={'https://picsum.photos/seed/profile/600/600'}
          previewVisible={open}
          onRequestOpenPreview={() => setOpen(true)}
          onRequestClosePreview={() => setOpen(false)}
        />
      </View>
    );
  },
};

export const Placeholder: S = {
  args: {
    imageUri: null,
  },
};

export const CustomColors: S = {
  args: {
    imageUri: 'https://picsum.photos/seed/profile2/600/600',
    colors: {
      primary: '#0ea5e9',
      bgDark: '#0b1020',
      overlay: 'rgba(14,165,233,0.25)',
      textMuted: 'rgba(255,255,255,0.7)',
    },
  },
};
