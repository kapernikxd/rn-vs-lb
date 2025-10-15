import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Text } from 'react-native';
import { DangerTooltip } from '../../../src/components/Tooltip/DangerTooltip';

const meta: Meta<React.ComponentProps<typeof DangerTooltip>> = {
  title: 'Tooltip/DangerTooltip',
  component: DangerTooltip,
  decorators: [
    (Story) => (
      <View style={{ padding: 24 }}>
        <Text style={{ marginBottom: 12 }}>
          Tap the red icon to reveal information about the critical status.
        </Text>
        <Story />
      </View>
    ),
  ],
};

export default meta;

const Template: StoryFn<React.ComponentProps<typeof DangerTooltip>> = (args) => (
  <DangerTooltip {...args} />
);

export const Default = Template.bind({});
Default.args = {
  content: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Action required</Text>
      <Text>Moderators rejected the event proposal due to missing details.</Text>
    </View>
  ),
  iconSize: 26,
  style: { padding: 8 },
};

export const CompactIcon = Template.bind({});
CompactIcon.args = {
  content: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Account suspended</Text>
      <Text>Contact support to restore posting privileges.</Text>
    </View>
  ),
  iconSize: 18,
};

export const InlineWithText: StoryFn = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text>
      Your invitation could not be delivered. Learn more
    </Text>
    <DangerTooltip
      style={{ marginLeft: 6 }}
      iconSize={20}
      content={
        <View>
          <Text style={{ fontWeight: 'bold' }}>Delivery failed</Text>
          <Text>Recipient inbox is full or email address is invalid.</Text>
        </View>
      }
    />
  </View>
);

InlineWithText.parameters = {
  controls: { disable: true },
};

export const WithActionLogging = Template.bind({});
WithActionLogging.args = {
  content: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>High priority</Text>
      <Text>The fundraiser deadline has passed without reaching the goal.</Text>
    </View>
  ),
  iconSize: 24,
  style: { padding: 8 },
};
WithActionLogging.parameters = {
  actions: { handles: ['press'] },
};
