import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { View, ScrollView } from 'react-native';
import SpecialistCard from './SpecialistCard';
import { ThemeProvider } from '../../theme/themeContext';

type SpecialistCardProps = React.ComponentProps<typeof SpecialistCard>;

const meta: Meta<SpecialistCardProps> = {
  title: 'Features/UserCards/SpecialistCard',
  component: SpecialistCard,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
          <Story />
        </ScrollView>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    fullName: { control: 'text' },
    profession: { control: 'text' },
    city: { control: 'text' },
    country: { control: 'text' },
    services: { control: 'object' },
    gallery: { control: 'object' },
    onPress: { action: 'press' },
  },
};

export default meta;

const Template: StoryFn<SpecialistCardProps> = (args) => (
  <View style={{ paddingHorizontal: 12 }}>
    <SpecialistCard {...args} />
  </View>
);

const services = [
  { _id: 'svc-1', name: 'Strategic facilitation', price: 80, currency: '€' },
  { _id: 'svc-2', name: 'Community workshop', price: 120, currency: '€' },
  { _id: 'svc-3', name: 'Mentorship session', price: 60, currency: '€' },
];

const gallery = [
  'photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&q=80',
  'photo-1515169067865-5387ec356754?auto=format&fit=crop&w=300&q=80',
  'photo-1461010083959-8a5727311252?auto=format&fit=crop&w=300&q=80',
];

export const Default = Template.bind({});
Default.args = {
  fullName: 'Alexandra Petrova',
  avatarUri: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
  profession: 'Event facilitator',
  city: 'Belgrade',
  country: 'Serbia',
  services,
  gallery,
  link: 'https://images.unsplash.com/',
  actionLabel: 'More',
};

export const WithoutServices = Template.bind({});
WithoutServices.args = {
  ...Default.args,
  fullName: 'Nemanja Ilić',
  profession: 'Civic tech consultant',
  services: [],
  gallery,
};

export const WithoutGallery = Template.bind({});
WithoutGallery.args = {
  ...Default.args,
  fullName: 'Maja Stanković',
  services,
  gallery: [],
};

export const MinimalInfo = Template.bind({});
MinimalInfo.args = {
  fullName: 'Unknown Specialist',
  avatarUri: 'https://i.pravatar.cc/150?img=60',
  link: 'https://images.unsplash.com/',
  actionLabel: 'More',
};

export const ExtendedServices = Template.bind({});
ExtendedServices.args = {
  ...Default.args,
  fullName: 'Consulting Collective',
  profession: 'Cross-functional experts',
  city: 'Novi Sad',
  country: 'Serbia',
  services: [
    ...services,
    { _id: 'svc-4', name: 'Impact evaluation', price: 150, currency: '€' },
    { _id: 'svc-5', name: 'Hybrid event production', price: 240, currency: '€' },
  ],
  gallery,
};
