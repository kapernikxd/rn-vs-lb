import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '../../utils/actions';
import { DeleteAccountButton, DeleteAccountButtonProps } from '../../../src/components/Button/DeleteAccountButton';

const meta: Meta<DeleteAccountButtonProps> = {
  title: 'Button/DeleteAccountButton',
  component: DeleteAccountButton,
};

export default meta;

const Template: StoryFn<DeleteAccountButtonProps> = (args) => <DeleteAccountButton {...args} />;

const createMockDelete = (label: string) => async () => {
  action(label)();
  await new Promise((resolve) => setTimeout(resolve, 800));
};

export const Default = Template.bind({});
Default.args = {
  deleteAccount: createMockDelete('delete-account'),
};

export const SlowNetwork = Template.bind({});
SlowNetwork.args = {
  deleteAccount: async () => {
    action('delete-account-slow')();
    await new Promise((resolve) => setTimeout(resolve, 2000));
  },
};
