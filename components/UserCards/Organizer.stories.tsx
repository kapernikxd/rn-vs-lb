import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import Organizer from './Organazer';
import { ThemeProvider } from '../../theme/themeContext';

type OrganizerProps = React.ComponentProps<typeof Organizer>;

const meta: Meta<OrganizerProps> = {
  title: 'UserCards/Organizer',
  component: Organizer,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    avatarUri: { control: 'text' },
    organizerName: { control: 'text' },
  },
};

export default meta;

const Template: StoryFn<OrganizerProps> = (args) => <Organizer {...args} />;

const onPressHandler = (label: string) => {
  console.log('[storybook:organizer:press]', label);
};
const createPressLogger = (label: string) => () => onPressHandler(label);

export const Default = Template.bind({});
Default.args = {
  avatarUri: 'https://i.pravatar.cc/150?img=5',
  organizerName: 'Maria Antonova',
  onPress: createPressLogger('Maria Antonova'),
};

export const LongName = Template.bind({});
LongName.args = {
  avatarUri: 'https://i.pravatar.cc/150?img=47',
  organizerName: 'Ассоциация содействия развитию креативных индустрий Белграда',
  onPress: createPressLogger('Long Name Organizer'),
};

export const CustomAvatar = Template.bind({});
CustomAvatar.args = {
  avatarUri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  organizerName: 'Volunteer Labs',
  onPress: createPressLogger('Volunteer Labs'),
};

export const WithoutAvatar = Template.bind({});
WithoutAvatar.args = {
  avatarUri: 'https://via.placeholder.com/80x80.png?text=Org',
  organizerName: 'Placeholder Collective',
  onPress: createPressLogger('Placeholder Collective'),
};
