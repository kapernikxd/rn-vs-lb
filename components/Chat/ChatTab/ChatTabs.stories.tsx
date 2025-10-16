import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import ChatTabs, { type ChatTab, type BotSubTab } from './ChatTabs';

const meta = {
  title: 'Chat/ChatTabs',
  component: ChatTabs,
  decorators: [(Story) => <View style={{ paddingVertical: 12 }}><Story /></View>],
  argTypes: {
    onChangeTab: { action: 'onChangeTab' },
    onChangeBotSubTab: { action: 'onChangeBotSubTab' },
  },
  args: {
    hasUnreadPrivate: true,
    hasUnreadGroup: false,
    hasUnreadBot: true,
    showBotSubTabs: false,
  },
} satisfies Meta<typeof ChatTabs>;

export default meta;
type S = StoryObj<typeof ChatTabs>;

/** Контролируемая обёртка, чтобы клики реально меняли состояние в сторе */
function ControlledTabs(props: React.ComponentProps<typeof ChatTabs>) {
  const [tab, setTab] = useState<ChatTab>('person');
  const [sub, setSub] = useState<BotSubTab>('my');

  return (
    <ChatTabs
      {...props}
      activeTab={tab}
      activeBotSubTab={sub}
      onChangeTab={(t) => {
        setTab(t);
        props.onChangeTab?.(t); // лог в Actions
      }}
      onChangeBotSubTab={(s) => {
        setSub(s);
        props.onChangeBotSubTab?.(s); // лог в Actions
      }}
    />
  );
}

export const Default: S = {
  render: (args) => <ControlledTabs {...args} />,
};

export const GroupActive_NoUnread: S = {
  render: (args) => <ControlledTabs {...args} />,
  args: {
    hasUnreadPrivate: false,
    hasUnreadGroup: false,
    hasUnreadBot: false,
  },
};

export const BotWithSubTabs: S = {
  render: (args) => <ControlledTabs {...args} />,
  args: {
    showBotSubTabs: true,
    hasUnreadPrivate: false,
    hasUnreadGroup: false,
    hasUnreadBot: true,
  },
};
