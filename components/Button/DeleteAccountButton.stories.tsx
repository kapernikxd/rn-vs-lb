import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DeleteAccountButton, DeleteAccountButtonProps } from './DeleteAccountButton';

const meta: Meta<DeleteAccountButtonProps> = {
  title: 'UI/Buttons/DeleteAccountButton',
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
  triggerLabel: 'Delete account',
  modalTitle: 'Confirm Deletion',
  modalDescription:
    'All your data, including profile, events, and chat history, will be permanently deleted. This process is irreversible and will be completed within 24 hours. Are you sure you want to proceed?',
  cancelButtonLabel: 'Cancel',
  confirmButtonLabel: 'Delete',
};

export const SlowNetwork = Template.bind({});
SlowNetwork.args = {
  deleteAccount: createMockDelete(2000),
  triggerLabel: 'Delete account',
  modalTitle: 'Confirm Deletion',
  modalDescription:
    'All your data, including profile, events, and chat history, will be permanently deleted. This process is irreversible and will be completed within 24 hours. Are you sure you want to proceed?',
  cancelButtonLabel: 'Cancel',
  confirmButtonLabel: 'Delete',
};
