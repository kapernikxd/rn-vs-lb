import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { InfoNotification } from '../../../../src/components/UI/DetailsCard/InfoNotification';

type InfoNotificationProps = React.ComponentProps<typeof InfoNotification>;

const meta: Meta<InfoNotificationProps> = {
  title: 'UI/DetailsCard/InfoNotification',
  component: InfoNotification,
  decorators: [
    (StoryComponent) => (
      <View style={{ padding: 24 }}>
        <StoryComponent />
      </View>
    ),
  ],
};

export default meta;

const Template: StoryFn<InfoNotificationProps> = (args) => <InfoNotification {...args} />;

const goToLoginLogger = (label: string) => {
  console.log('[storybook:go-to-login]', label);
};
const createLoginHandler = (label: string) => () => goToLoginLogger(label);

export const Default = Template.bind({});
Default.args = {
  goToLogin: createLoginHandler('Default notification'),
};

export const InsideCard = Template.bind({});
InsideCard.args = {
  goToLogin: createLoginHandler('Inside card layout'),
};
InsideCard.decorators = [
  (StoryComponent) => (
    <View
      style={{
        padding: 24,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#D6E4FF',
        shadowColor: '#0F172A33',
        shadowOpacity: 0.2,
        shadowRadius: 12,
      }}
    >
      <StoryComponent />
    </View>
  ),
];

export const NarrowLayout = Template.bind({});
NarrowLayout.args = {
  goToLogin: createLoginHandler('Compact container'),
};
NarrowLayout.decorators = [
  (StoryComponent) => (
    <View style={{ width: 240 }}>
      <StoryComponent />
    </View>
  ),
];

export const ElevatedContrast = Template.bind({});
ElevatedContrast.args = {
  goToLogin: createLoginHandler('High contrast background'),
};
ElevatedContrast.decorators = [
  (StoryComponent) => (
    <View style={{ padding: 32, backgroundColor: '#1E293B' }}>
      <View style={{ padding: 20, borderRadius: 12, backgroundColor: '#F1F5F9' }}>
        <StoryComponent />
      </View>
    </View>
  ),
];
