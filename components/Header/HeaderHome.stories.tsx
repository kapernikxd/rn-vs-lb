import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Text, View } from 'react-native';
import { HeaderHome } from './HeaderHome';

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
const onPressHandler = () => {
  console.log('[storybook:header-home:logo]');
};
const onPressCityHandler = () => {
  console.log('[storybook:header-home:city]');
};
const onPressMapHandler = () => {
  console.log('[storybook:header-home:map]');
};
const onPressSpecialistsHandler = () => {
  console.log('[storybook:header-home:specialists]');
};

export const NavigationReady = Template.bind({});
NavigationReady.args = {
  logo: DefaultLogo,
  onPress: onPressHandler,
  onPressCity: onPressCityHandler,
  onPressMap: onPressMapHandler,
  onPressSpecialists: onPressSpecialistsHandler,
  specialistsActive: true,
};

export const Minimal = Template.bind({});
Minimal.args = {
  logo: DefaultLogo,
};

export const CityAndMapOnly = Template.bind({});
CityAndMapOnly.args = {
  logo: <Text style={{ fontSize: 18 }}>City Guides</Text>,
  onPressCity: onPressCityHandler,
  onPressMap: onPressMapHandler,
};

export const SpecialistsToggle = Template.bind({});
SpecialistsToggle.args = {
  logo: <Text style={{ fontWeight: '600', fontSize: 18 }}>Experts</Text>,
  onPressSpecialists: onPressSpecialistsHandler,
  specialistsActive: false,
};
