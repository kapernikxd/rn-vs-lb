import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import BottomTabBar, { BottomTabBarItem } from './BottomTabBar';

const ITEMS: BottomTabBarItem[] = [
  {
    key: 'overview',
    renderIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="view-grid-outline" size={size} color={color} />
    ),
  },
  {
    key: 'private',
    renderIcon: ({ color, size }) => <MaterialIcons name="lock-outline" size={size} color={color} />,
  },
  {
    key: 'bookmarks',
    renderIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="bookmark-off-outline" size={size} color={color} />
    ),
  },
  {
    key: 'favorites',
    renderIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="heart-off-outline" size={size} color={color} />
    ),
  },
];

const meta = {
  title: 'UI/BottomTabBar',
  component: BottomTabBar,
  decorators: [(Story) => <View style={{ paddingTop: 24 }}><Story /></View>],
  argTypes: {
    onChange: { action: 'onChange' },
  },
  args: {
    items: ITEMS,
  },
} satisfies Meta<typeof BottomTabBar>;

export default meta;

type Story = StoryObj<typeof BottomTabBar>;

const Controlled = (props: React.ComponentProps<typeof BottomTabBar>) => {
  const [active, setActive] = useState(0);

  return (
    <BottomTabBar
      {...props}
      activeIndex={active}
      onChange={(index) => {
        setActive(index);
        props.onChange?.(index);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
};

export const CustomColors: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    activeColor: '#111',
    inactiveColor: '#B0B0B0',
    indicatorColor: '#111',
    indicatorWidth: 36,
  },
};

export const WithDisabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    items: [
      ITEMS[0],
      ITEMS[1],
      { ...ITEMS[2], disabled: true },
      ITEMS[3],
    ],
  },
};
