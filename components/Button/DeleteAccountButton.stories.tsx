import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DeleteAccountButton, DeleteAccountButtonProps } from './DeleteAccountButton';

const meta: Meta<DeleteAccountButtonProps> = {
  title: 'Button/DeleteAccountButton',
  component: DeleteAccountButton,
};

export default meta;

const Template: StoryFn<DeleteAccountButtonProps> = (args) => <DeleteAccountButton {...args} />;

const createMockDelete = (delay = 800) => async () => {
  await new Promise((resolve) => setTimeout(resolve, delay));
};

export const Default = Template.bind({});
Default.args = {
  deleteAccount: createMockDelete(),
};

export const SlowNetwork = Template.bind({});
SlowNetwork.args = {
  deleteAccount: createMockDelete(2000),
};
