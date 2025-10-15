import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, ScrollView } from 'react-native';
import { action } from '@storybook/addon-actions';
import ProfilePhotoBanner from '../../../src/components/Profile/ProfilePhotoBanner';

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
};

export default meta;

const Template: StoryFn<React.ComponentProps<typeof ProfilePhotoBanner>> = (args) => (
  <ProfilePhotoBanner {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onAddPhoto: action('add-photo'),
  onClose: action('close-banner'),
};

export const InsideScrollableList: StoryFn = () => (
  <ScrollView contentContainerStyle={{ gap: 12, padding: 16 }}>
    <ProfilePhotoBanner onAddPhoto={action('list-add-photo')} onClose={action('list-close-banner')} />
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
          onAddPhoto={action('dismissible-add-photo')}
          onClose={() => {
            action('dismissible-close')();
            setVisible(false);
          }}
        />
      )}
      <View style={{ height: 160, backgroundColor: '#d9ecff', borderRadius: 16 }} />
    </View>
  );
};

DismissibleBehaviour.parameters = {
  controls: { disable: true },
};
