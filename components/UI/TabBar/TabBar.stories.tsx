// stories/Navigation/TabBar.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import TabBar, { type TabItem } from './TabBar';

const DEFAULT_TABS: TabItem[] = [
  { key: 'event',     label: 'Events',       icon: 'event' },
  { key: 'business',  label: 'Places',       icon: 'business' },
  { key: 'polls',     label: 'Polls',        icon: 'poll' },
  { key: 'invite',    label: 'Invitations',  icon: 'playlist-add' },
];

const meta = {
  title: 'UI/TabBar',
  component: TabBar,
  decorators: [(Story) => <View style={{ paddingVertical: 8 }}><Story /></View>],
  argTypes: {
    onChangeTab: { action: 'onChangeTab' },
  },
  args: {
    tabs: DEFAULT_TABS,
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type S = StoryObj<typeof TabBar>;

/** Контролируемая обёртка — чтобы таб реально переключался и попадал в Actions */
function Controlled(props: React.ComponentProps<typeof TabBar>) {
  const [active, setActive] = useState(0);
  return (
    <TabBar
      {...props}
      activeTabIndex={active}
      onChangeTab={(i) => {
        setActive(i);
        props.onChangeTab?.(i); // в панель Actions
      }}
    />
  );
}

export const Default: S = {
  render: (args) => <Controlled {...args} />,
};

export const SecondActive: S = {
  render: (args) => <Controlled {...args} />,
  // Активная вкладка задаётся изнутри Controlled, поэтому здесь оставляем как есть.
};

export const ManyTabsScrollable: S = {
  render: (args) => <Controlled {...args} />,
  args: {
    tabs: [
      { key: 'ev', label: 'Events', icon: 'event' },
      { key: 'pl', label: 'Places', icon: 'business' },
      { key: 'po', label: 'Polls', icon: 'poll' },
      { key: 'in', label: 'Invitations', icon: 'playlist-add' },
      { key: 'ph', label: 'Photos', icon: 'photo' },
      { key: 'vi', label: 'Videos', icon: 'ondemand-video' },
      { key: 'ar', label: 'Articles', icon: 'article' },
    ],
  },
};

export const MinimalTwoTabs: S = {
  render: (args) => <Controlled {...args} />,
  args: {
    tabs: [
      { key: 'a', label: 'First',  icon: 'looks-one' },
      { key: 'b', label: 'Second', icon: 'looks-two' },
    ],
  },
};
