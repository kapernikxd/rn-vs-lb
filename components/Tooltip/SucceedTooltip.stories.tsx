import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Text } from 'react-native';
import { SucceedTooltip } from './SucceedTooltip';

const contentPresets = {
  eventApproved: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Event approved</Text>
      <Text>Your submission passed moderation and is now visible to members.</Text>
    </View>
  ),
  goalReached: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Goal reached</Text>
      <Text>Congratulations! The fundraiser collected 125% of the target.</Text>
    </View>
  ),
  verifiedIdentity: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Verified identity</Text>
      <Text>Document review completed without any issues.</Text>
    </View>
  ),
  checklistComplete: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Checklist complete</Text>
      <Text>All required steps for the onboarding were done.</Text>
    </View>
  ),
} as const;

type SucceedTooltipStoryProps = Omit<React.ComponentProps<typeof SucceedTooltip>, 'content'> & {
  contentKey: keyof typeof contentPresets;
};

const renderTooltip = ({ contentKey, ...args }: SucceedTooltipStoryProps) => (
  <SucceedTooltip {...args} content={contentPresets[contentKey]} />
);

const meta: Meta<SucceedTooltipStoryProps> = {
  title: 'UI/Tooltip/SucceedTooltip',
  component: SucceedTooltip,
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
          Celebrate achievements by tapping the green confirmation icon.
        </Text>
        <Story />
      </View>
    ),
  ],
};

export default meta;

const Template: StoryFn<SucceedTooltipStoryProps> = (args) => renderTooltip(args);

export const Default = Template.bind({});
Default.args = {
  contentKey: 'eventApproved',
  iconSize: 24,
};

export const Celebratory = Template.bind({});
Celebratory.args = {
  contentKey: 'goalReached',
  iconSize: 30,
  style: { padding: 8 },
};

export const InlineSuccess: StoryFn = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text>Profile verified successfully</Text>
    {renderTooltip({ contentKey: 'verifiedIdentity', style: { marginLeft: 6 }, iconSize: 20 })}
  </View>
);

InlineSuccess.parameters = {
  controls: { disable: true },
};

export const MinimalIcon = Template.bind({});
MinimalIcon.args = {
  contentKey: 'checklistComplete',
  iconSize: 16,
};
