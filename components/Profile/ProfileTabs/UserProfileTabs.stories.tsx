// stories/Profile/UserProfileTabs.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import UserProfileTabs, { type UserProfileTab } from './UserProfileTabs';

const meta = {
  title: 'Profile/UserProfileTabs',
  component: UserProfileTabs,
  decorators: [(Story) => <View style={{ padding: 12 }}><Story /></View>],
  argTypes: {
    onChangeTab: { action: 'onChangeTab' },
  },
} satisfies Meta<typeof UserProfileTabs>;

export default meta;
type S = StoryObj<typeof UserProfileTabs>;

// контролируемая обёртка — клики меняют локальный стейт и логируются в Actions
function Controlled(props: React.ComponentProps<typeof UserProfileTabs>) {
  const [tab, setTab] = useState<UserProfileTab>('events');
  return (
    <UserProfileTabs
      {...props}
      activeTab={tab}
      onChangeTab={(t) => {
        setTab(t);
        props.onChangeTab?.(t);
      }}
    />
  );
}

export const Default: S = {
  render: (args) => <Controlled {...args} />,
};

export const PlacesActive: S = {
  render: (args) => <Controlled {...args} />,
  args: {
    // начальное — сторя всё равно контролируемая, поэтому можно оставить пусто,
    // либо сделать отдельный Controlled с initialState, если нужно.
  },
};
