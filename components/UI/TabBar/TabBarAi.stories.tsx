import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import TabBarAi, { type TabItem } from './TabBarAi';

type TabBarAiProps = React.ComponentProps<typeof TabBarAi>;

const DEFAULT_TABS: TabItem[] = [
  { key: 'discover', label: 'Discover' },
  { key: 'specialists', label: 'Specialists' },
  { key: 'places', label: 'Places' },
  { key: 'events', label: 'Events' },
  { key: 'polls', label: 'Polls', disabled: true },
];

const meta = {
  title: 'UI/TabBar/TabBarAi',
  component: TabBarAi,
  decorators: [
    (Story) => (
      <View style={{ paddingVertical: 8, backgroundColor: '#1b1b1b' }}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Horizontal scrollable tab bar with animated indicator tailored for the AI discovery screens.',
      },
    },
  },
  argTypes: {
    onChange: { action: 'onChange' },
    activeIndex: {
      control: { type: 'number' },
      description: 'Index of the active tab. In the stories it is managed internally.',
    },
  },
  args: {
    tabs: DEFAULT_TABS,
    activeIndex: 0,
    activeColor: '#ffffff',
    inactiveColor: 'rgba(255,255,255,0.55)',
    indicatorColor: '#ffffff',
    indicatorHeight: 4,
    fontSize: 18,
  },
} satisfies Meta<typeof TabBarAi>;

export default meta;

type Story = StoryObj<typeof TabBarAi>;

const Controlled: React.FC<TabBarAiProps> = ({ activeIndex = 0, onChange, ...rest }) => {
  const [active, setActive] = useState(activeIndex);

  useEffect(() => {
    setActive(activeIndex);
  }, [activeIndex]);

  return (
    <TabBarAi
      {...rest}
      activeIndex={active}
      onChange={(index) => {
        setActive(index);
        onChange?.(index);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
};

export const DarkBackground: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    activeColor: '#ffe066',
    indicatorColor: '#ffe066',
  },
};

export const WithManyTabs: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    tabs: Array.from({ length: 10 }).map((_, index) => ({
      key: `tab-${index}`,
      label: `Section ${index + 1}`,
    })),
  },
};

export const CustomSpacing: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    gap: 12,
    tabHorizontalPadding: 12,
    fontSize: 16,
    fontWeightActive: '600',
    fontWeightInactive: '400',
  },
};
