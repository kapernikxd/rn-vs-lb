import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { PriceBlock } from './PriceBlock';

type PriceBlockProps = React.ComponentProps<typeof PriceBlock>;

const meta: Meta<PriceBlockProps> = {
  title: 'UI/DetailsCard/PriceBlock',
  component: PriceBlock,
  decorators: [
    (StoryComponent) => (
      <View style={{ padding: 24, backgroundColor: '#F8FAFC', borderRadius: 12 }}>
        <StoryComponent />
      </View>
    ),
  ],
  argTypes: {
    price: {
      control: 'text',
      description: 'Human readable price label',
    },
  },
};

export default meta;

const Template: StoryFn<PriceBlockProps> = (args) => <PriceBlock {...args} />;

export const FreeAdmission = Template.bind({});
FreeAdmission.args = {
  price: 'Free',
};

export const StandardTicket = Template.bind({});
StandardTicket.args = {
  price: '$39.99',
};

export const PremiumBundle = Template.bind({});
PremiumBundle.args = {
  price: 'Premium bundle • $89.00',
};

export const DonationBased = Template.bind({});
DonationBased.args = {
  price: 'Donation-based (suggested $10)',
};

export const MembersOnly = Template.bind({});
MembersOnly.args = {
  price: 'Members only — RSVP required',
};
