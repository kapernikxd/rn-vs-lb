import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { AddressBlock } from '../../../../src/components/UI/DetailsCard/AddressBlock';

const meta: Meta<React.ComponentProps<typeof AddressBlock>> = {
  title: 'UI/DetailsCard/AddressBlock',
  component: AddressBlock,
  decorators: [
    (StoryComponent) => (
      <View style={{ padding: 24, backgroundColor: '#F7F9FC', borderRadius: 12 }}>
        <StoryComponent />
      </View>
    ),
  ],
  argTypes: {
    address: {
      control: 'text',
      description: 'Street address displayed above the map link',
    },
    mapPoint: {
      control: 'object',
      description: 'Latitude and longitude used in the map deep link',
    },
  },
};

export default meta;

type AddressBlockProps = React.ComponentProps<typeof AddressBlock>;

const Template: StoryFn<AddressBlockProps> = (args) => <AddressBlock {...args} />;

export const CentralLondon = Template.bind({});
CentralLondon.args = {
  address: '221B Baker Street, London NW1 6XE, United Kingdom',
  mapPoint: [51.5237, -0.1585] as [number, number],
};

export const ManhattanEvent = Template.bind({});
ManhattanEvent.args = {
  address: 'Times Square Plaza, 1560 Broadway, New York, NY 10036, USA',
  mapPoint: [40.758, -73.9855] as [number, number],
};

export const MultiLineAddress = Template.bind({});
MultiLineAddress.args = {
  address: '1007 Mountain Drive\nGotham City, NJ 07001\nUnited States',
  mapPoint: [40.7282, -74.0776] as [number, number],
};

export const HiddenAddress = Template.bind({});
HiddenAddress.args = {
  address: '',
  mapPoint: [48.8566, 2.3522] as [number, number],
};

export const InternationalVenue = Template.bind({});
InternationalVenue.args = {
  address: '4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011, Japan',
  mapPoint: [35.6586, 139.7454] as [number, number],
};
