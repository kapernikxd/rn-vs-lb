import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { IconLabel } from './IconLabel';

type IconLabelProps = React.ComponentProps<typeof IconLabel>;

const meta: Meta<IconLabelProps> = {
  title: 'UI/DetailsCard/IconLabel',
  component: IconLabel,
  decorators: [
    (StoryComponent) => (
      <View style={{ gap: 16 }}>
        <StoryComponent />
      </View>
    ),
  ],
  argTypes: {
    icon: {
      control: 'select',
      options: ['location-outline', 'calendar-outline', 'people-outline', 'cash-outline', undefined],
      description: 'Ionicon displayed before the label',
    },
    label: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    showIf: {
      control: 'boolean',
    },
    valueStyle: {
      control: 'object',
    },
    style: {
      control: 'object',
    },
  },
};

export default meta;

const Template: StoryFn<IconLabelProps> = (args) => <IconLabel {...args} />;

export const Location = Template.bind({});
Location.args = {
  icon: 'location-outline',
  label: 'Location:',
  value: 'Central Park, NYC',
};

export const DateAndTime = Template.bind({});
DateAndTime.args = {
  icon: 'calendar-outline',
  label: 'When:',
  value: '21 Aug 2024 • 10:00 AM',
};

export const Participants = Template.bind({});
Participants.args = {
  icon: 'people-outline',
  label: 'Participants:',
  value: 24,
  valueStyle: { fontWeight: '600', color: '#1A56DB' },
};

export const PriceTag = Template.bind({});
PriceTag.args = {
  icon: 'cash-outline',
  label: 'Cost:',
  value: '$49.99',
};

export const LabelOnly = Template.bind({});
LabelOnly.args = {
  label: 'Details coming soon',
};

export const Hidden = Template.bind({});
Hidden.args = {
  icon: 'people-outline',
  label: 'This should be hidden',
  value: 'Hidden value',
  showIf: false,
};
