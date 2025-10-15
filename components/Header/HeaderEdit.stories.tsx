import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { HeaderEdit } from '../../../src/components/Header/HeaderEdit';

const closePress = () => {
  console.log('[storybook:header-edit:close]');
};
const copyHandler = () => {
  console.log('[storybook:header-edit:copy]');
};
const reportHandler = () => {
  console.log('[storybook:header-edit:report]');
};
const pinToggleHandler = () => {
  console.log('[storybook:header-edit:pin-toggle]');
};
const editHandler = () => {
  console.log('[storybook:header-edit:edit]');
};

const meta: Meta = {
  title: 'Header/HeaderEdit',
  component: HeaderEdit,
  args: {
    onClosePress: closePress,
    onCopy: copyHandler,
    onReportMessage: reportHandler,
    onPinToggle: pinToggleHandler,
    isPinned: false,
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
WithEditAction.args = {
  onEdit: editHandler,
};

export const PinnedMessage = Template.bind({});
PinnedMessage.args = {
  isPinned: true,
  onPinToggle: pinToggleHandler,
};

export const MinimalActions = Template.bind({});
MinimalActions.args = {
  onEdit: undefined,
  onCopy: copyHandler,
  onReportMessage: reportHandler,
  onPinToggle: pinToggleHandler,
  isPinned: false,
};
