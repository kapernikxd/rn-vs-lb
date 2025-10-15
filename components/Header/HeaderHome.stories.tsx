import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import { HeaderHome } from './HeaderHome';

const meta: Meta<typeof HeaderHome> = {
  title: 'Header/HeaderHome',
  component: HeaderHome,
  argTypes: {
    onPress: { action: 'header press' },
    onPressCity: { action: 'city press' },
    onPressMap: { action: 'map press' },
    onPressSpecialists: { action: 'specialists press' },
  },
};

export default meta;

type Story = StoryObj<typeof HeaderHome>;

const renderWithLogo = (
  args: React.ComponentProps<typeof HeaderHome>,
  logo: React.ReactNode,
) => (
  <View style={{ padding: 16, backgroundColor: '#ffffff' }}>
    <HeaderHome {...args} logo={logo} />
  </View>
);

export const NavigationReady: Story = {
  args: {
    specialistsActive: true,
  },
  render: (args) =>
    renderWithLogo(
      args,
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Volunteer Labs</Text>,
    ),
};

export const Minimal: Story = {
  render: (args) =>
    renderWithLogo(
      args,
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Volunteer Labs</Text>,
    ),
};

export const CityAndMapOnly: Story = {
  render: (args) =>
    renderWithLogo(args, <Text style={{ fontSize: 18 }}>City Guides</Text>),
};

export const SpecialistsToggle: Story = {
  args: {
    specialistsActive: false,
  },
  render: (args) =>
    renderWithLogo(
      args,
      <Text style={{ fontWeight: '600', fontSize: 18 }}>Experts</Text>,
    ),
};
