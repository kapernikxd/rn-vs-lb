import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Text, View } from 'react-native';
import { HeaderHome } from '../../../src/components/Header/HeaderHome';

const meta: Meta = {
  title: 'Header/HeaderHome',
  component: HeaderHome,
};

export default meta;

type HeaderHomeProps = React.ComponentProps<typeof HeaderHome>;

const Template: StoryFn<HeaderHomeProps> = (args) => (
  <View style={{ padding: 16, backgroundColor: '#ffffff' }}>
    <HeaderHome {...args} />
  </View>
);

const DefaultLogo = <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Volunteer Labs</Text>;

export const NavigationReady = Template.bind({});
NavigationReady.args = {
  logo: DefaultLogo,
  onPress: action('open-filters'),
  onPressCity: action('choose-city'),
  onPressMap: action('open-map'),
  onPressSpecialists: action('open-specialists'),
  specialistsActive: true,
};

export const Minimal = Template.bind({});
Minimal.args = {
  logo: DefaultLogo,
};

export const CityAndMapOnly = Template.bind({});
CityAndMapOnly.args = {
  logo: <Text style={{ fontSize: 18 }}>City Guides</Text>,
  onPressCity: action('choose-city-compact'),
  onPressMap: action('open-map-compact'),
};

export const SpecialistsToggle = Template.bind({});
SpecialistsToggle.args = {
  logo: <Text style={{ fontWeight: '600', fontSize: 18 }}>Experts</Text>,
  onPressSpecialists: action('toggle-specialists'),
  specialistsActive: false,
};
