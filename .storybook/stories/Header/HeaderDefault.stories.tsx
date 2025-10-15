import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Text, TouchableOpacity, View } from 'react-native';
import HeaderDefault, { AccessType } from '../../../src/components/Header/HeaderDefault';

const meta: Meta = {
  title: 'Header/HeaderDefault',
  component: HeaderDefault,
  args: {
    title: 'Community event',
    onBackPress: action('go-back'),
  },
};

export default meta;

type HeaderDefaultProps = React.ComponentProps<typeof HeaderDefault>;

const Template: StoryFn<HeaderDefaultProps> = (args) => (
  <View style={{ padding: 16, backgroundColor: '#f8f8f8' }}>
    <HeaderDefault {...args} />
  </View>
);

export const Basic = Template.bind({});

export const WithActions = Template.bind({});
WithActions.args = {
  children: (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={action('open-settings')}>
        <Text style={{ fontSize: 16 }}>⚙️</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={action('open-share')} style={{ marginLeft: 12 }}>
        <Text style={{ fontSize: 16 }}>🔗</Text>
      </TouchableOpacity>
    </View>
  ),
};

export const SubscribersOnly = Template.bind({});
SubscribersOnly.args = {
  acceessType: AccessType.SUBSCRIBERS,
};

export const PrivateAccess = Template.bind({});
PrivateAccess.args = {
  acceessType: AccessType.PRIVATE,
};

export const WithInfoTooltip = Template.bind({});
WithInfoTooltip.args = {
  acceessType: AccessType.SUBSCRIBERS,
  infoTooltip: (
    <View>
      <Text>Subscribers can see additional content and chat.</Text>
    </View>
  ),
};
