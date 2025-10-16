import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TabButton from './TabButton';

const meta = {
  title: 'UI/TabButton',
  component: TabButton,
  decorators: [(Story) => <View style={{ padding: 12 }}><Story /></View>],
  argTypes: { onPress: { action: 'onPress' } },
  args: { label: 'Person', active: false },
} satisfies Meta<typeof TabButton>;

export default meta;
type S = StoryObj<typeof TabButton>;

export const Default: S = {};

export const Active: S = {
  args: { active: true },
};

// ВАЖНО: не кладём React-ноды в args → используем render:
export const WithIcon: S = {
  render: (args) => (
    <TabButton
      {...args}
      icon={<MaterialIcons name="person" size={18} />}
    />
  ),
};

export const WithIconAndDot: S = {
  render: (args) => (
    <TabButton
      {...args}
      icon={<MaterialIcons name="groups" size={18} />}
      rightAddon={
        <View
          style={{
            width: 8, height: 8, borderRadius: 4,
            backgroundColor: 'crimson', marginLeft: 6, top: -6,
          }}
        />
      }
    />
  ),
};


export const TwoTabs: S = {
  render: (args) => {
    const [active, setActive] = React.useState<0 | 1>(0);
    return (
      <View style={{ flexDirection: 'row' }}>
        <TabButton
          {...args}
          label="Person"
          active={active === 0}
          onPress={() => setActive(0)}
        />
        <TabButton
          {...args}
          label="Group"
          active={active === 1}
          onPress={() => setActive(1)}
        />
      </View>
    );
  },
};

// Две вкладки с иконками и точкой-индिकेटором на второй
export const TwoTabsWithIcons: S = {
  render: (args) => {
    const [active, setActive] = React.useState<0 | 1>(0);
    return (
      <View style={{ flexDirection: 'row' }}>
        <TabButton
          {...args}
          label="Person"
          active={active === 0}
          onPress={() => setActive(0)}
          icon={<MaterialIcons name="person" size={18} />}
        />
        <TabButton
          {...args}
          label="Group"
          active={active === 1}
          onPress={() => setActive(1)}
          icon={<MaterialIcons name="groups" size={18} />}
          rightAddon={
            <View
              style={{
                width: 8, height: 8, borderRadius: 4,
                backgroundColor: 'crimson', marginLeft: 6, top: -6,
              }}
            />
          }
        />
      </View>
    );
  },
};


function ControlledTabsRow({
  items,
  initial = 0,
}: {
  items: Array<{
    label: string;
    icon?: React.ReactNode;
    rightAddon?: React.ReactNode;
  }>;
  initial?: number;
}) {
  const [active, setActive] = React.useState(initial);
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {items.map((it, i) => (
        <TabButton
          key={`${it.label}-${i}`}
          label={it.label}
          active={active === i}
          onPress={() => setActive(i)}
          icon={it.icon}
          rightAddon={it.rightAddon}
        />
      ))}
    </View>
  );
}


// МНОГО вкладок (6–8) — чтобы проверить перенос/скролл контейнера-родителя
export const ManyTabsRow: S = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <ControlledTabsRow
        items={[
          { label: 'Overview', icon: <MaterialIcons name="dashboard" size={18} /> },
          { label: 'Tasks', icon: <MaterialIcons name="checklist" size={18} /> },
          { label: 'Chat', icon: <MaterialIcons name="chat-bubble-outline" size={18} /> },
          { label: 'Files', icon: <MaterialIcons name="folder-open" size={18} /> },
          { label: 'Calendar', icon: <MaterialIcons name="event" size={18} /> },
          { label: 'Team', icon: <MaterialIcons name="groups" size={18} /> },
          { label: 'Reports', icon: <MaterialIcons name="assessment" size={18} /> },
          { label: 'Settings', icon: <MaterialIcons name="settings" size={18} /> },
        ]}
      />
    </View>
  ),
};


// Длинные подписи (проверка переполнения)
export const LongLabels: S = {
  render: () => (
    <ControlledTabsRow
      items={[
        { label: 'Very Long Person Tab', icon: <MaterialIcons name="person" size={18} /> },
        { label: 'Extremely Long Group Tab Title', icon: <MaterialIcons name="groups" size={18} /> },
        { label: 'Notifications & Updates Center', icon: <MaterialIcons name="notifications-none" size={18} /> },
      ]}
    />
  ),
};


// Горизонтальный скролл: много вкладок + индикатор на некоторых
export const HorizontalScrollMany: S = {
  render: (args) => {
    const [active, setActive] = React.useState(0);
    const ITEMS = [
      { label: 'Overview', icon: <MaterialIcons name="dashboard" size={18} /> },
      { label: 'Tasks', icon: <MaterialIcons name="checklist" size={18} /> },
      { label: 'Calendar', icon: <MaterialIcons name="event" size={18} /> },
      { label: 'Chat', icon: <MaterialIcons name="chat-bubble-outline" size={18} />, dot: true },
      { label: 'Files', icon: <MaterialIcons name="folder-open" size={18} /> },
      { label: 'Team', icon: <MaterialIcons name="groups" size={18} /> },
      { label: 'Reports', icon: <MaterialIcons name="assessment" size={18} /> },
      { label: 'Settings', icon: <MaterialIcons name="settings" size={18} /> },
      { label: 'Billing', icon: <MaterialIcons name="credit-card" size={18} /> },
      { label: 'Labs', icon: <MaterialIcons name="science" size={18} /> },
    ];

    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
        >
          {ITEMS.map((it, i) => (
            <TabButton
              key={`${it.label}-${i}`}
              {...args}
              label={it.label}
              icon={it.icon}
              active={active === i}
              onPress={() => setActive(i)}
              rightAddon={
                it.dot ? (
                  <View
                    style={{
                      width: 8, height: 8, borderRadius: 4,
                      backgroundColor: 'crimson', marginLeft: 6, top: -6,
                    }}
                  />
                ) : undefined
              }
            />
          ))}
        </ScrollView>
      </View>
    );
  },
};