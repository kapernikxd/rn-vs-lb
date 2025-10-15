import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import EmptyState from '../../../src/components/UI/EmptyState';

const meta: Meta = {
  title: 'UI/States/EmptyState',
  component: EmptyState,
};

export default meta;

const Template: StoryFn = () => <EmptyState />;

export const Default = Template.bind({});
