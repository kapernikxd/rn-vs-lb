// components/Header/HeaderHome.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HeaderHome } from './HeaderHome';

const meta: Meta<typeof HeaderHome> = {
  title: 'Header/HeaderHome',
  component: HeaderHome,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#ffffff' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof HeaderHome>;

export default meta;

type Story = StoryObj<typeof HeaderHome>;

const DefaultLogo = <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Volunteer Labs</Text>;

export const NavigationReady: Story = {
  args: {
    logo: DefaultLogo,
    onPress: action('open-filters'),
    onPressCity: action('choose-city'),
    onPressMap: action('open-map'),
    onPressSpecialists: action('open-specialists'),
    specialistsActive: true,
  },
};

export const Minimal: Story = {
  args: {
    logo: DefaultLogo,
  },
};

export const CityAndMapOnly: Story = {
  args: {
    logo: <Text style={{ fontSize: 18 }}>City Guides</Text>,
    onPressCity: action('choose-city-compact'),
    onPressMap: action('open-map-compact'),
  },
};

export const SpecialistsToggle: Story = {
  args: {
    logo: <Text style={{ fontWeight: '600', fontSize: 18 }}>Experts</Text>,
    onPressSpecialists: action('toggle-specialists'),
    specialistsActive: false,
  },
};
