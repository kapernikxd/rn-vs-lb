import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import PlaceCardList from '../../../src/components/Posts/PlaceCardList';

const meta: Meta<React.ComponentProps<typeof PlaceCardList>> = {
  title: 'Posts/PlaceCardList',
  component: PlaceCardList,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

const Template: StoryFn<React.ComponentProps<typeof PlaceCardList>> = (args) => <PlaceCardList {...args} />;

export const CommunityCenter = Template.bind({});
CommunityCenter.args = {
  imageUri: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80',
  title: 'Downtown community hub',
  description: 'A vibrant space for meetups, workshops, and community-driven events.',
};

export const NatureRetreat = Template.bind({});
NatureRetreat.args = {
  imageUri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  title: 'Forest volunteer base',
  description:
    'This remote cabin serves as a base for forest cleanups and educational programmes focused on biodiversity.',
};

export const LongDescription = Template.bind({});
LongDescription.args = {
  imageUri: 'https://images.unsplash.com/photo-1526481280695-3c469622e99b?auto=format&fit=crop&w=800&q=80',
  title: 'Historic theatre restoration site',
  description:
    'Volunteers will collaborate with heritage specialists to restore original decor, document stories from locals, and
    organise guided tours once the main hall reopens to the public.',
};
