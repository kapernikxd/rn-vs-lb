import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { HeaderEdit } from './HeaderEdit';

const meta: Meta = {
  title: 'Layout/Header/HeaderEdit',
  component: HeaderEdit,
  args: {
    isPinned: false,
  },
  argTypes: {
    onClosePress: { action: 'close' },
    onCopy: { action: 'copy' },
    onReportMessage: { action: 'report' },
    onPinToggle: { action: 'pin toggle' },
    onEdit: { action: 'edit' },
  },
};

export default meta;

type HeaderEditProps = React.ComponentProps<typeof HeaderEdit>;

const Template: StoryFn<HeaderEditProps> = (args) => (
  <View style={{ padding: 16, backgroundColor: '#f8f8f8' }}>
    <HeaderEdit {...args} />
  </View>
);

export const Default = Template.bind({});

export const WithEditAction = Template.bind({});
WithEditAction.args = {};

export const PinnedMessage = Template.bind({});
PinnedMessage.args = {
  isPinned: true,
};

export const MinimalActions = Template.bind({});
MinimalActions.args = {
  onEdit: undefined,
  isPinned: false,
};
