import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Text } from 'react-native';
import { DangerTooltip } from './DangerTooltip';

const contentPresets = {
  actionRequired: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Action required</Text>
      <Text>Moderators rejected the event proposal due to missing details.</Text>
    </View>
  ),
  accountSuspended: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Account suspended</Text>
      <Text>Contact support to restore posting privileges.</Text>
    </View>
  ),
  deliveryFailed: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Delivery failed</Text>
      <Text>Recipient inbox is full or email address is invalid.</Text>
    </View>
  ),
  highPriority: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>High priority</Text>
      <Text>The fundraiser deadline has passed without reaching the goal.</Text>
    </View>
  ),
} as const;

type DangerTooltipStoryProps = Omit<React.ComponentProps<typeof DangerTooltip>, 'content'> & {
  contentKey: keyof typeof contentPresets;
};

const renderTooltip = ({ contentKey, ...args }: DangerTooltipStoryProps) => (
  <DangerTooltip {...args} content={contentPresets[contentKey]} />
);

const meta: Meta<DangerTooltipStoryProps> = {
  title: 'UI/Tooltip/DangerTooltip',
  component: DangerTooltip,
  argTypes: {
    contentKey: {
      name: 'Content preset',
      options: Object.keys(contentPresets),
      control: { type: 'radio' },
    },
  },
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

const Template: StoryFn<DangerTooltipStoryProps> = (args) => renderTooltip(args);

export const Default = Template.bind({});
Default.args = {
  contentKey: 'actionRequired',
  iconSize: 26,
  style: { padding: 8 },
};

export const CompactIcon = Template.bind({});
CompactIcon.args = {
  contentKey: 'accountSuspended',
  iconSize: 18,
};

export const InlineWithText: StoryFn = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text>
      Your invitation could not be delivered. Learn more
    </Text>
    {renderTooltip({ contentKey: 'deliveryFailed', style: { marginLeft: 6 }, iconSize: 20 })}
  </View>
);

InlineWithText.parameters = {
  controls: { disable: true },
};

export const WithActionLogging = Template.bind({});
WithActionLogging.args = {
  contentKey: 'highPriority',
  iconSize: 24,
  style: { padding: 8 },
};
WithActionLogging.parameters = {
  actions: { handles: ['press'] },
};
