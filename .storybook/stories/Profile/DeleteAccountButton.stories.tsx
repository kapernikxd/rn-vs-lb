import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DeleteAccountButton, {
  DeleteAccountButtonProps,
} from '../../../src/components/profile/DeleteAccountButton';

const meta: Meta<DeleteAccountButtonProps> = {
  title: 'Profile/DeleteAccountButton',
  component: DeleteAccountButton,
  args: {
    onDeleteAccount: async () => {
      action('delete-account-requested')();
      return Promise.resolve();
    },
    onSuccess: (message: string) => {
      action('delete-account-success')(message);
    },
    onError: (error: unknown) => {
      action('delete-account-error')(error);
    },
  },
};

export default meta;

type Story = StoryObj<DeleteAccountButtonProps>;

export const Default: Story = {};

export const CustomCopy: Story = {
  args: {
    title: 'Remove my account',
    confirmTitle: 'Confirm',
    cancelTitle: 'Keep account',
    description:
      'Deleting your account will remove all of your personal data and conversations. This action cannot be undone.',
    successMessage: 'We received your request. Expect confirmation within 24 hours.',
  },
};
