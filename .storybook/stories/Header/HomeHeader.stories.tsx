import React from 'react';
import { Meta, Story } from '@storybook/react';
import { View } from 'react-native';
import { HeaderHome } from '../../../src/components/header/'; // Убедитесь, что путь правильный
import Logo from '../../../src/assets/images/logo.svg';

export default {
  title: 'Header/HeaderHome',
  component: HeaderHome,
} as Meta;

const Template: Story = (args) => {
  return (
    <View style={{ padding: 20 }}>
      <HeaderHome {...args} logo={Logo}/>
    </View>
  );
};

export const Primary = Template.bind({});

