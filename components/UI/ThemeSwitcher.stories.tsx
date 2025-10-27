import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ThemeSwitcher from './ThemeSwitcher';
import { ThemeProvider } from '../../theme';

const meta: Meta = {
  title: 'UI/ThemeSwitcher',
  component: ThemeSwitcher,
  decorators: [
    (StoryComponent) => (
      <ThemeProvider>
        <StoryComponent />
      </ThemeProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<React.ComponentProps<typeof ThemeSwitcher>> = (args) => <ThemeSwitcher {...args} />;

export const Default = Template.bind({});
Default.args = {
  lightModeLabel: 'Light Mode',
  darkModeLabel: 'Dark Mode',
};
