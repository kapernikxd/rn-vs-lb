import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Text, TouchableOpacity, View } from 'react-native';
import HeaderDefault, { AccessType } from './HeaderDefault';

const meta: Meta = {
  title: 'Layout/Header/HeaderDefault',
  component: HeaderDefault,
  args: {
    title: 'Community event',
  },
  argTypes: {
    onBackPress: { action: 'back' },
    children: { control: false },
    infoTooltip: { control: false },
  },
};

export default meta;

type HeaderDefaultProps = React.ComponentProps<typeof HeaderDefault>;

const Template: StoryFn<HeaderDefaultProps> = (args) => (
  <View style={{ padding: 16, backgroundColor: '#f8f8f8' }}>
    <HeaderDefault {...args} />
  </View>
);

const settingsPress = () => {
  console.log('[storybook:header-default:settings]');
};
const sharePress = () => {
  console.log('[storybook:header-default:share]');
};

export const Basic = Template.bind({});

export const WithActions = Template.bind({});
WithActions.render = (args) => (
  <View style={{ padding: 16, backgroundColor: '#f8f8f8' }}>
    <HeaderDefault {...args}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={settingsPress}>
          <Text style={{ fontSize: 16 }}>⚙️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sharePress} style={{ marginLeft: 12 }}>
          <Text style={{ fontSize: 16 }}>🔗</Text>
        </TouchableOpacity>
      </View>
    </HeaderDefault>
  </View>
);

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
};
WithInfoTooltip.render = (args) => (
  <View style={{ padding: 16, backgroundColor: '#f8f8f8' }}>
    <HeaderDefault
      {...args}
      infoTooltip={
        <View>
          <Text>Subscribers can see additional content and chat.</Text>
        </View>
      }
    />
  </View>
);
