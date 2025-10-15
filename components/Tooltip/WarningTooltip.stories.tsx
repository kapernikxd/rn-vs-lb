import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Text } from 'react-native';
import { WarningTooltip } from './WarningTooltip';

const meta: Meta<React.ComponentProps<typeof WarningTooltip>> = {
  title: 'Tooltip/WarningTooltip',
  component: WarningTooltip,
  decorators: [
    (Story) => (
      <View style={{ padding: 24 }}>
        <Text style={{ marginBottom: 12 }}>
          Highlight potential issues by placing warning icons next to sensitive actions.
        </Text>
        <Story />
      </View>
    ),
  ],
};

export default meta;

const Template: StoryFn<React.ComponentProps<typeof WarningTooltip>> = (args) => (
  <WarningTooltip {...args} />
);

export const Default = Template.bind({});
Default.args = {
  content: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Pending review</Text>
      <Text>Images are still being checked by moderators. Publishing may be delayed.</Text>
    </View>
  ),
  iconSize: 24,
};

export const CompactInline: StoryFn = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text>Before deleting this post, read the warning</Text>
    <WarningTooltip
      style={{ marginLeft: 6 }}
      iconSize={18}
      content={
        <View>
          <Text style={{ fontWeight: 'bold' }}>Irreversible action</Text>
          <Text>Deleted posts cannot be restored or reviewed later.</Text>
        </View>
      }
    />
  </View>
);

CompactInline.parameters = {
  controls: { disable: true },
};

export const Prominent = Template.bind({});
Prominent.args = {
  content: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Volunteer limit reached</Text>
      <Text>Please re-open slots or archive the event to avoid confusion.</Text>
    </View>
  ),
  iconSize: 32,
  style: { padding: 8 },
};

export const WithDetailedList = Template.bind({});
WithDetailedList.args = {
  content: (
    <View>
      <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Before publishing</Text>
      <Text>• Double-check sensitive data</Text>
      <Text>• Confirm legal requirements</Text>
      <Text>• Set visibility restrictions</Text>
    </View>
  ),
  iconSize: 22,
};
