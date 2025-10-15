import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Text } from 'react-native';
import { SucceedTooltip } from '../../../src/components/Tooltip/SucceedTooltip';

const meta: Meta<React.ComponentProps<typeof SucceedTooltip>> = {
  title: 'Tooltip/SucceedTooltip',
  component: SucceedTooltip,
  decorators: [
    (Story) => (
      <View style={{ padding: 24 }}>
        <Text style={{ marginBottom: 12 }}>
          Celebrate achievements by tapping the green confirmation icon.
        </Text>
        <Story />
      </View>
    ),
  ],
};

export default meta;

const Template: StoryFn<React.ComponentProps<typeof SucceedTooltip>> = (args) => (
  <SucceedTooltip {...args} />
);

export const Default = Template.bind({});
Default.args = {
  content: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Event approved</Text>
      <Text>Your submission passed moderation and is now visible to members.</Text>
    </View>
  ),
  iconSize: 24,
};

export const Celebratory = Template.bind({});
Celebratory.args = {
  content: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Goal reached</Text>
      <Text>Congratulations! The fundraiser collected 125% of the target.</Text>
    </View>
  ),
  iconSize: 30,
  style: { padding: 8 },
};

export const InlineSuccess: StoryFn = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text>Profile verified successfully</Text>
    <SucceedTooltip
      style={{ marginLeft: 6 }}
      iconSize={20}
      content={
        <View>
          <Text style={{ fontWeight: 'bold' }}>Verified identity</Text>
          <Text>Document review completed without any issues.</Text>
        </View>
      }
    />
  </View>
);

InlineSuccess.parameters = {
  controls: { disable: true },
};

export const MinimalIcon = Template.bind({});
MinimalIcon.args = {
  content: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Checklist complete</Text>
      <Text>All required steps for the onboarding were done.</Text>
    </View>
  ),
  iconSize: 16,
};
