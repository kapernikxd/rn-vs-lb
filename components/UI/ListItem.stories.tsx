import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ListItem from '../../../src/components/UI/ListItem';

type ListItemProps = React.ComponentProps<typeof ListItem>;

const meta: Meta<ListItemProps> = {
  title: 'UI/ListItem',
  component: ListItem,
  argTypes: {
    icon: {
      control: 'text',
      description: 'FontAwesome icon name',
    },
    label: {
      control: 'text',
    },
    subLabel: {
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
  },
};

export default meta;

const Template: StoryFn<ListItemProps> = (args) => <ListItem {...args} />;

const itemAction = () => {
  console.log('[storybook:list-item:action]');
};

export const Default = Template.bind({});
Default.args = {
  icon: 'user',
  label: 'Account',
  subLabel: 'Personal information and preferences',
  action: itemAction,
};

export const Warning = Template.bind({});
Warning.args = {
  icon: 'exclamation-triangle',
  label: 'Report abuse',
  report: true,
  action: itemAction,
};

export const Minimal = Template.bind({});
Minimal.args = {
  icon: 'bell',
  label: 'Notifications',
  hideArrow: true,
  hideBottomLine: true,
  action: itemAction,
};
