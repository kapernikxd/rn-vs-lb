import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ThemeSwitcher from '../../../src/components/UI/ThemeSwitcher';
import { ThemeProvider } from '../../../src/theme';

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

const Template: StoryFn = () => <ThemeSwitcher />;

export const Default = Template.bind({});
