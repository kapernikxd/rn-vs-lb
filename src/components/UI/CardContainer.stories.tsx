import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text } from 'react-native';
import CardContainer from './CardContainer';
import { renderWithTheme, WithThemeArgs } from '../../storybook/renderWithTheme';

type CardContainerProps = React.ComponentProps<typeof CardContainer>;

type CardContainerStoryArgs = WithThemeArgs & CardContainerProps & {
  body?: string;
};

const meta: Meta<CardContainerStoryArgs> = {
  title: 'Components/UI/CardContainer',
  component: CardContainer,
  args: {
    title: 'Event Overview',
    subTitle: 'Summary of the latest updates',
    body: 'Use this card to present contextual information. You can customize the title, subtitle and content.',
    themeMode: 'light',
  },
  argTypes: {
    title: { control: 'text' },
    subTitle: { control: 'text' },
    body: { control: 'text' },
    style: { control: 'object' },
    styleTitleContainer: { control: 'object' },
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
  render: renderWithTheme<CardContainerStoryArgs>((props) => {
    const { body, themeMode: _themeMode, ...rest } = props;
    return (
      <CardContainer {...(rest as CardContainerProps)}>
        <Text>{body}</Text>
      </CardContainer>
    );
  }, {
    align: 'stretch',
    maxWidth: 360,
  }),
};

export default meta;

type Story = StoryObj<CardContainerStoryArgs>;

export const Default: Story = {};

export const OnlyTitle: Story = {
  args: {
    subTitle: undefined,
    body: 'When only the title is provided, the divider and spacing adapt automatically.',
  },
};

export const DarkTheme: Story = {
  args: {
    themeMode: 'dark',
    title: 'Dark mode card',
    subTitle: 'Perfect for night owls',
  },
};
