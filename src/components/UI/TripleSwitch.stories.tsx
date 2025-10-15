import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import TripleSwitch, { TripleSwitchValue } from './TripleSwitch';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type TripleSwitchStoryArgs = WithThemeArgs & React.ComponentProps<typeof TripleSwitch>;

const meta: Meta<TripleSwitchStoryArgs> = {
  title: 'Components/UI/TripleSwitch',
  component: TripleSwitch,
  args: {
    value: 'center',
    leftLabel: 'Left',
    centerLabel: 'Center',
    rightLabel: 'Right',
    onChange: action('onChange') as (value: TripleSwitchValue) => void,
    themeMode: 'light',
  },
  argTypes: {
    value: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    leftLabel: { control: 'text' },
    centerLabel: { control: 'text' },
    rightLabel: { control: 'text' },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<TripleSwitchStoryArgs>((props) => {
    const { themeMode: _themeMode, ...rest } = props;
    return <TripleSwitch {...rest} />;
  }, {
    maxWidth: 320,
    align: 'stretch',
  }),
};

export default meta;

type Story = StoryObj<TripleSwitchStoryArgs>;

export const Default: Story = {};

export const CustomLabels: Story = {
  args: {
    leftLabel: 'Past',
    centerLabel: 'Current',
    rightLabel: 'Future',
    value: 'left',
  },
};

export const DarkTheme: Story = {
  args: {
    themeMode: 'dark',
    value: 'right',
  },
};
