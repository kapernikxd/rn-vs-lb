import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import StatusFilter, { type StatusOption } from './StatusFilter'; // проверь путь

const BASE_OPTIONS: StatusOption[] = [
  { key: 'active', label: 'Active' },
  { key: 'my', label: 'My' },
  { key: 'completed', label: 'Completed' },
];

const meta = {
  title: 'UI/StatusFilter',
  component: StatusFilter,
  decorators: [(Story) => <View style={{ padding: 12 }}><Story /></View>],
  argTypes: {
    onChangeStatus: { action: 'onChangeStatus' },
  },
  args: {
    options: BASE_OPTIONS,
  },
} satisfies Meta<typeof StatusFilter>;

export default meta;
type S = StoryObj<typeof StatusFilter>;

function Controlled(props: React.ComponentProps<typeof StatusFilter>) {
  const [value, setValue] = useState(props.selectedStatus ?? props.options[0]?.key ?? '');
  return (
    <StatusFilter
      {...props}
      selectedStatus={value}
      onChangeStatus={(k) => {
        setValue(k);
        props.onChangeStatus?.(k);
      }}
    />
  );
}

export const Default: S = {
  render: (args) => <Controlled {...args} />,
};

export const Rounded: S = {
  render: (args) => <Controlled {...args} />,
  args: {
    type: 'rounded',
  },
};

export const ManyOptionsScrollable: S = {
  render: (args) => <Controlled {...args} />,
  args: {
    options: [
      { key: 'all', label: 'All' },
      { key: 'active', label: 'Active' },
      { key: 'pending', label: 'Pending' },
      { key: 'draft', label: 'Draft' },
      { key: 'archived', label: 'Archived' },
      { key: 'mine', label: 'Assigned to me' },
      { key: 'completed', label: 'Completed' },
      { key: 'rejected', label: 'Rejected' },
    ],
    type: 'rounded',
  },
};
