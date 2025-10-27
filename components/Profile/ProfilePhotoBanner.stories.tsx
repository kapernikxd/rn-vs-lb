import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, ScrollView } from 'react-native';
import ProfilePhotoBanner from './ProfilePhotoBanner';

const meta: Meta<React.ComponentProps<typeof ProfilePhotoBanner>> = {
  title: 'Profile/ProfilePhotoBanner',
  component: ProfilePhotoBanner,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onAddPhoto: { action: 'add photo' },
    onClose: { action: 'close banner' },
  },
};

export default meta;

const Template: StoryFn<React.ComponentProps<typeof ProfilePhotoBanner>> = (args) => (
  <ProfilePhotoBanner {...args} />
);

const addPhotoHandler = () => {
  console.log('[storybook:profile-photo-banner:add-photo]');
};
const closeHandler = () => {
  console.log('[storybook:profile-photo-banner:close]');
};

export const Default = Template.bind({});
Default.args = {
  message: 'Upload a photo — it will help others recognize and trust you.',
  buttonText: 'Add Photo',
};

export const InsideScrollableList: StoryFn = () => (
  <ScrollView contentContainerStyle={{ gap: 12, padding: 16 }}>
    <ProfilePhotoBanner
      onAddPhoto={addPhotoHandler}
      onClose={closeHandler}
      message="Upload a photo — it will help others recognize and trust you."
      buttonText="Add Photo"
    />
    <View style={{ height: 150, backgroundColor: '#f0f0f0', borderRadius: 12 }} />
    <View style={{ height: 150, backgroundColor: '#f5f5f5', borderRadius: 12 }} />
    <View style={{ height: 150, backgroundColor: '#fafafa', borderRadius: 12 }} />
  </ScrollView>
);

InsideScrollableList.parameters = {
  controls: { disable: true },
};

export const DismissibleBehaviour: StoryFn = () => {
  const [visible, setVisible] = useState(true);

  return (
    <View style={{ gap: 12 }}>
      {visible && (
        <ProfilePhotoBanner
          onAddPhoto={addPhotoHandler}
          onClose={() => {
            closeHandler();
            setVisible(false);
          }}
          message="Upload a photo — it will help others recognize and trust you."
          buttonText="Add Photo"
        />
      )}
      <View style={{ height: 160, backgroundColor: '#d9ecff', borderRadius: 16 }} />
    </View>
  );
};

DismissibleBehaviour.parameters = {
  controls: { disable: true },
};
