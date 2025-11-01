import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Button as RNButton } from 'react-native';
import GalleryModal from './GalleryModal';

const IMAGES = [
  'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1600&auto=format&fit=crop',
];

const meta = {
  title: 'Features/Modals/GalleryModal',
  component: GalleryModal,
  decorators: [(Story) => <View style={{ flex: 1 }}><Story /></View>],
  argTypes: { onRequestClose: { action: 'onRequestClose' } },
  args: { images: IMAGES, initialIndex: 0 },
} satisfies Meta<typeof GalleryModal>;

export default meta;
type S = StoryObj<typeof GalleryModal>;

export const Controlled: S = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <RNButton title="Open gallery" onPress={() => setOpen(true)} />
        <GalleryModal
          {...args}
          visible={open}
          onRequestClose={() => {
            setOpen(false);
            args.onRequestClose?.();
          }}
        />
      </View>
    );
  },
};
