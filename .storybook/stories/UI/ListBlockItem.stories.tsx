import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ListBlockItem from '../../../src/components/UI/ListBlockItem';

type ListBlockItemProps = React.ComponentProps<typeof ListBlockItem>;

const meta: Meta<ListBlockItemProps> = {
  title: 'UI/ListBlockItem',
  component: ListBlockItem,
  argTypes: {
    icon: {
      control: 'text',
      description: 'FontAwesome icon name',
    },
    label: {
      control: 'text',
    },
    report: {
      control: 'boolean',
    },
    big: {
      control: 'boolean',
    },
    hideArrow: {
      control: 'boolean',
    },
    hideBottomLine: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;

const Template: StoryFn<ListBlockItemProps> = (args) => <ListBlockItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: 'bell',
  label: 'Notifications',
  action: action('open-notifications'),
  fullWidth: true,
};

export const Report = Template.bind({});
Report.args = {
  icon: 'flag',
  label: 'Report a problem',
  report: true,
  hideArrow: false,
  action: action('report-problem'),
};

export const Compact = Template.bind({});
Compact.args = {
  icon: 'user',
  label: 'Profile',
  big: false,
  hideBottomLine: true,
  fullWidth: false,
  action: action('open-profile'),
};
