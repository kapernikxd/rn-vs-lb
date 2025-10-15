import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Text } from 'react-native';
import { InfoTooltip } from './InfoTooltip';

const meta: Meta<React.ComponentProps<typeof InfoTooltip>> = {
  title: 'Tooltip/InfoTooltip',
  component: InfoTooltip,
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

const Template: StoryFn<React.ComponentProps<typeof InfoTooltip>> = (args) => <InfoTooltip {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Need help?</Text>
      <Text>You can edit your post details later in the settings.</Text>
    </View>
  ),
  iconSize: 24,
};

export const SmallIcon = Template.bind({});
SmallIcon.args = {
  content: (
    <View>
      <Text style={{ fontWeight: 'bold' }}>About roles</Text>
      <Text>Organisers can edit schedules even after publishing.</Text>
    </View>
  ),
  iconSize: 18,
};

export const OnDarkBackground: StoryFn = () => (
  <View style={{ padding: 24, backgroundColor: '#26283d', borderRadius: 12 }}>
    <Text style={{ color: 'white', marginBottom: 8 }}>Dark mode banner</Text>
    <InfoTooltip
      iconSize={22}
      style={{ alignSelf: 'flex-start' }}
      content={
        <View>
          <Text style={{ fontWeight: 'bold' }}>Dark mode</Text>
          <Text>Tooltips automatically adapt to the active theme.</Text>
        </View>
      }
    />
  </View>
);

OnDarkBackground.parameters = {
  controls: { disable: true },
};

export const LongFormText = Template.bind({});
LongFormText.args = {
  content: (
    <View style={{ maxWidth: 260 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Scheduling tips</Text>
      <Text>
        Consider setting up reminders 24 hours before your event starts so volunteers can prepare materials and confirm
        attendance.
      </Text>
    </View>
  ),
  iconSize: 28,
  style: { padding: 8 },
};
