import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Text } from 'react-native';
import { InfoTooltipBase } from './InfoTooltipBase';

const contentPresets = {
  reminder: (
    <View>
      <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Remember</Text>
      <Text>The tooltip disappears when you tap outside of it.</Text>
    </View>
  ),
  checklist: (
    <View>
      <Text style={{ marginBottom: 2 }}>• Prepare supporting documents</Text>
      <Text style={{ marginBottom: 2 }}>• Review participant list</Text>
      <Text>• Confirm logistics with the venue</Text>
    </View>
  ),
  liveSession: (
    <View>
      <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Live now</Text>
      <Text>Tap to learn about the live Q&A session for new members.</Text>
    </View>
  ),
} as const;

type InfoTooltipBaseStoryProps = Omit<React.ComponentProps<typeof InfoTooltipBase>, 'content'> & {
  contentKey: keyof typeof contentPresets;
};

const renderTooltip = ({ contentKey, ...args }: InfoTooltipBaseStoryProps) => (
  <InfoTooltipBase {...args} content={contentPresets[contentKey]} />
);

const meta: Meta<InfoTooltipBaseStoryProps> = {
  title: 'Tooltip/InfoTooltipBase',
  component: InfoTooltipBase,
  argTypes: {
    contentKey: {
      name: 'Content preset',
      options: Object.keys(contentPresets),
      control: { type: 'radio' },
    },
    iconName: {
      control: {
        type: 'select',
      },
      options: ['information-circle-outline', 'help-circle-outline', 'alert-circle-outline', 'calendar-outline'],
    },
    iconSize: {
      control: { type: 'number' },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 24, alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

const Template: StoryFn<InfoTooltipBaseStoryProps> = (args) => renderTooltip(args);

export const WithReminderContent = Template.bind({});
WithReminderContent.args = {
  contentKey: 'reminder',
  iconName: 'information-circle-outline',
  iconSize: 24,
  style: { padding: 8 },
};

export const Checklist = Template.bind({});
Checklist.args = {
  contentKey: 'checklist',
  iconName: 'calendar-outline',
  iconSize: 28,
  style: { padding: 8 },
};

export const CustomColoredIcon = Template.bind({});
CustomColoredIcon.args = {
  contentKey: 'liveSession',
  iconName: 'alert-circle-outline',
  iconColor: '#ff6b6b',
  iconSize: 30,
  style: { padding: 8 },
};

export const TriggerInsideCard: StoryFn = () => (
  <View
    style={{
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#cccccc',
      width: '100%',
    }}
  >
    <Text style={{ marginBottom: 12 }}>Tap the icons to explore supporting hints.</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      {renderTooltip({ contentKey: 'reminder', iconName: 'help-circle-outline', iconSize: 22, style: { padding: 4 } })}
      {renderTooltip({ contentKey: 'checklist', iconName: 'calendar-outline', iconSize: 22, style: { padding: 4 } })}
    </View>
  </View>
);

TriggerInsideCard.parameters = {
  controls: { disable: true },
  actions: { handles: ['onPress'] },
};
