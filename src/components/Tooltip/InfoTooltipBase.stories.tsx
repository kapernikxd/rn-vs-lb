import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InfoTooltipBase } from './InfoTooltipBase';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type IoniconName = keyof typeof Ionicons.glyphMap;

type TooltipStoryArgs = WithThemeArgs & {
  contentText: string;
  iconName: IoniconName;
  iconSize?: number;
  iconColor?: string;
  style?: React.ComponentProps<typeof InfoTooltipBase>['style'];
};

const meta: Meta<TooltipStoryArgs> = {
  title: 'Components/Tooltip/InfoTooltipBase',
  component: InfoTooltipBase as unknown as React.ComponentType<TooltipStoryArgs>,
  args: {
    contentText: 'Helpful information for the user goes here.',
    iconName: 'information-circle-outline',
    iconSize: 22,
    themeMode: 'light',
  },
  argTypes: {
    contentText: { control: 'text' },
    iconName: { control: 'text' },
    iconSize: { control: 'number' },
    iconColor: { control: 'color' },
    style: { control: 'object' },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<TooltipStoryArgs>((props) => {
    const { contentText, themeMode: _themeMode, ...rest } = props;
    const tooltipProps = rest as unknown as React.ComponentProps<typeof InfoTooltipBase>;
    return <InfoTooltipBase {...tooltipProps} content={<Text>{contentText}</Text>} />;
  }),
};

export default meta;

type Story = StoryObj<TooltipStoryArgs>;

export const Info: Story = {};

export const Warning: Story = {
  args: {
    iconName: 'alert-circle-outline',
    iconColor: '#ffb02c',
    contentText: 'This action requires your attention.',
  },
};

export const Success: Story = {
  args: {
    iconName: 'checkmark-circle-outline',
    iconColor: '#0ecb81',
    contentText: 'Everything went well! 🎉',
    themeMode: 'dark',
  },
};

export const Danger: Story = {
  args: {
    iconName: 'ban',
    iconColor: '#ff4a5c',
    contentText: 'You are not allowed to continue.',
  },
};
