import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { DeleteAccountButton, DeleteAccountButtonProps } from './DeleteAccountButton';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type DeleteAccountButtonStoryArgs = DeleteAccountButtonProps & WithThemeArgs;

const meta: Meta<DeleteAccountButtonStoryArgs> = {
  title: 'Components/Button/DeleteAccountButton',
  component: DeleteAccountButton,
  args: {
    deleteAccount: async () => {
      action('deleteAccount')();
    },
    themeMode: 'light',
  },
  argTypes: {
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<DeleteAccountButtonProps>((props) => <DeleteAccountButton {...props} />, {
    align: 'stretch',
  }),
};

export default meta;

type Story = StoryObj<DeleteAccountButtonStoryArgs>;

export const Default: Story = {};

export const DarkMode: Story = {
  args: {
    themeMode: 'dark',
  },
};
