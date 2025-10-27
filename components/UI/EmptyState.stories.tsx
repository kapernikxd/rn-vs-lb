import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import EmptyState from './EmptyState';

const meta: Meta = {
  title: 'UI/States/EmptyState',
  component: EmptyState,
};

export default meta;

const Template: StoryFn<React.ComponentProps<typeof EmptyState>> = (args) => <EmptyState {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: 'No Data',
};
