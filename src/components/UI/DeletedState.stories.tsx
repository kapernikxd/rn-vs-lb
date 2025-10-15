import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import DeletedState from './DeletedState';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type DeletedStateStoryArgs = WithThemeArgs & React.ComponentProps<typeof DeletedState>;

const meta: Meta<DeletedStateStoryArgs> = {
  title: 'Components/UI/DeletedState',
  component: DeletedState,
  args: {
    goBack: action('goBack'),
    themeMode: 'light',
  },
  argTypes: {
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<DeletedStateStoryArgs>((props) => {
    const { themeMode: _themeMode, ...rest } = props;
    return <DeletedState {...rest} />;
  }),
};

export default meta;

type Story = StoryObj<DeletedStateStoryArgs>;

export const Default: Story = {};

export const WithoutAction: Story = {
  args: {
    goBack: undefined,
  },
};

export const DarkMode: Story = {
  args: {
    themeMode: 'dark',
  },
};
