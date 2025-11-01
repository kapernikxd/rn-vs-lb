import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import UserRow from './UserRow';

type UserRowProps = React.ComponentProps<typeof UserRow>;

const meta: Meta<UserRowProps> = {
  title: 'Features/UserCards/UserRow',
  component: UserRow,
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    avatarUri: {
      control: 'text',
    },
    userName: {
      control: 'text',
    },
    onPress: { action: 'press' },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: 'transparent' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

const Template: StoryFn<UserRowProps> = (args) => <UserRow {...args} />;

export const Default = Template.bind({});
Default.args = {
  avatarUri: 'https://i.pravatar.cc/150?img=12',
  userName: 'Esther Howard',
  size: 'sm',
};

export const ExtraSmallAvatar = Template.bind({});
ExtraSmallAvatar.args = {
  avatarUri: 'https://i.pravatar.cc/150?img=21',
  userName: 'Wade Warren',
  size: 'xs',
};

export const WithLongName = Template.bind({});
WithLongName.args = {
  avatarUri: 'https://i.pravatar.cc/150?img=45',
  userName: 'Anastasia Nikolaevna Romanova the Third',
  size: 'md',
};

export const AvatarOnly = Template.bind({});
AvatarOnly.args = {
  avatarUri: 'https://i.pravatar.cc/150?img=28',
  size: 'lg',
};
