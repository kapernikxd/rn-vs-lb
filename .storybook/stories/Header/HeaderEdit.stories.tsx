import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '../../utils/actions';
import { View } from 'react-native';
import { HeaderEdit } from '../../../src/components/Header/HeaderEdit';

const meta: Meta = {
  title: 'Header/HeaderEdit',
  component: HeaderEdit,
  args: {
    onClosePress: action('close'),
    onCopy: action('copy'),
    onReportMessage: action('report'),
    onPinToggle: action('toggle-pin'),
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
  onEdit: action('edit'),
};

export const PinnedMessage = Template.bind({});
PinnedMessage.args = {
  isPinned: true,
  onPinToggle: action('unpin'),
};

export const MinimalActions = Template.bind({});
MinimalActions.args = {
  onEdit: undefined,
  onCopy: action('copy-minimal'),
  onReportMessage: action('report-minimal'),
  onPinToggle: action('pin-minimal'),
  isPinned: false,
};
