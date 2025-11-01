import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Text } from 'react-native';
import { InfoTooltip } from './InfoTooltip';

const contentPresets = {
  default: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Need help?</Text>
      <Text>You can edit your post details later in the settings.</Text>
    </View>
  ),
  aboutRoles: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>About roles</Text>
      <Text>Organisers can edit schedules even after publishing.</Text>
    </View>
  ),
  darkMode: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Dark mode</Text>
      <Text>Tooltips automatically adapt to the active theme.</Text>
    </View>
  ),
  schedulingTips: (
    <View style={{ maxWidth: 260 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Scheduling tips</Text>
      <Text>
        Consider setting up reminders 24 hours before your event starts so volunteers can prepare materials and confirm
        attendance.
      </Text>
    </View>
  ),
} as const;

type InfoTooltipStoryProps = Omit<React.ComponentProps<typeof InfoTooltip>, 'content'> & {
  contentKey: keyof typeof contentPresets;
};

const renderTooltip = ({ contentKey, ...args }: InfoTooltipStoryProps) => (
  <InfoTooltip {...args} content={contentPresets[contentKey]} />
);

const meta: Meta<InfoTooltipStoryProps> = {
  title: 'UI/Tooltip/InfoTooltip',
  component: InfoTooltip,
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
          Use the info tooltip to provide extra guidance without cluttering the interface.
        </Text>
        <Story />
      </View>
    ),
  ],
};

export default meta;

const Template: StoryFn<InfoTooltipStoryProps> = (args) => renderTooltip(args);

export const Default = Template.bind({});
Default.args = {
  contentKey: 'default',
  iconSize: 24,
};

export const SmallIcon = Template.bind({});
SmallIcon.args = {
  contentKey: 'aboutRoles',
  iconSize: 18,
};

export const OnDarkBackground: StoryFn<InfoTooltipStoryProps> = (args) => (
  <View style={{ padding: 24, backgroundColor: '#26283d', borderRadius: 12 }}>
    <Text style={{ color: 'white', marginBottom: 8 }}>Dark mode banner</Text>
    {renderTooltip({ ...args, contentKey: 'darkMode', iconSize: 22, style: { alignSelf: 'flex-start' } })}
  </View>
);

OnDarkBackground.parameters = {
  controls: { disable: true },
};

export const LongFormText = Template.bind({});
LongFormText.args = {
  contentKey: 'schedulingTips',
  iconSize: 28,
  style: { padding: 8 },
};
