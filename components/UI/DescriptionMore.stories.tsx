import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import DescriptionSection from './DescriptionMore';

const meta = {
  title: 'UI/DescriptionSection',
  component: DescriptionSection,
  decorators: [(Story) => <View style={{ paddingVertical: 12 }}><Story /></View>],
  argTypes: { onToggle: { action: 'onToggle' } },
  args: {
    title: 'Description',
    text:
      'Seasoned makeup artist with 8+ years of experience in bridal, editorial and film. ' +
      'Passionate about natural looks, skin preparation, and color theory. ' +
      'Open for travel and on-location work; kit is fully sanitized and cruelty-free.',
    expanded: false,
    expandedLabel: 'Less',
    collapsedLabel: 'More details',
  },
} satisfies Meta<typeof DescriptionSection>;

export default meta;
type S = StoryObj<typeof DescriptionSection>;

function Controlled(props: React.ComponentProps<typeof DescriptionSection>) {
  const [open, setOpen] = useState(props.expanded ?? false);
  return (
    <DescriptionSection
      {...props}
      expanded={open}
      onToggle={() => {
        setOpen((v) => !v);
        props.onToggle?.();
      }}
    />
  );
}

export const Default: S = { render: (args) => <Controlled {...args} /> };

export const Expanded: S = {
  render: (args) => <Controlled {...args} />,
  args: { expanded: true },
};
