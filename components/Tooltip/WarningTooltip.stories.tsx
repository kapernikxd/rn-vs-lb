import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Text } from 'react-native';
import { WarningTooltip } from './WarningTooltip';

const contentVariants = {
  pendingReview: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Pending review</Text>
      <Text>Images are still being checked by moderators. Publishing may be delayed.</Text>
    </View>
  ),
  irreversibleAction: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Irreversible action</Text>
      <Text>Deleted posts cannot be restored or reviewed later.</Text>
    </View>
  ),
  volunteerLimitReached: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Volunteer limit reached</Text>
      <Text>Please re-open slots or archive the event to avoid confusion.</Text>
    </View>
  ),
  prePublishChecklist: (
    <View>
      <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Before publishing</Text>
      <Text>• Double-check sensitive data</Text>
      <Text>• Confirm legal requirements</Text>
      <Text>• Set visibility restrictions</Text>
    </View>
  ),
} as const;

type WarningTooltipStoryProps = Omit<React.ComponentProps<typeof WarningTooltip>, 'content'> & {
  contentKey: keyof typeof contentVariants;
};

const renderTooltip = ({ contentKey = 'pendingReview', ...args }: WarningTooltipStoryProps) => (
  <WarningTooltip {...args} content={contentVariants[contentKey]} />
);

const meta: Meta<WarningTooltipStoryProps> = {
  title: 'UI/Tooltip/WarningTooltip',
  component: WarningTooltip,
  argTypes: {
    contentKey: {
      name: 'Content preset',
      options: Object.keys(contentVariants),
      control: { type: 'radio' },
    },
  },
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

const Template: StoryFn<WarningTooltipStoryProps> = (args) => renderTooltip(args);

export const Default = Template.bind({});
Default.args = {
  contentKey: 'pendingReview',
  iconSize: 24,
};

export const CompactInline: StoryFn<WarningTooltipStoryProps> = (args) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text>Before deleting this post, read the warning</Text>
    {renderTooltip(args)}
  </View>
);

CompactInline.parameters = {
  controls: { disable: true },
};

CompactInline.args = {
  contentKey: 'irreversibleAction',
  iconSize: 18,
  style: { marginLeft: 6 },
};

export const Prominent = Template.bind({});
Prominent.args = {
  contentKey: 'volunteerLimitReached',
  iconSize: 32,
  style: { padding: 8 },
};

export const WithDetailedList = Template.bind({});
WithDetailedList.args = {
  contentKey: 'prePublishChecklist',
  iconSize: 22,
};
