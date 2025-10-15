import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Text } from 'react-native';
import CardContainer from '../../../src/components/UI/CardContainer';

const meta: Meta = {
  title: 'UI/CardContainer',
  component: CardContainer,
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title displayed on the card header',
    },
    subTitle: {
      control: 'text',
      description: 'Optional subtitle displayed below the title',
    },
  },
};

export default meta;

type CardContainerProps = React.ComponentProps<typeof CardContainer>;

const Template: StoryFn<CardContainerProps> = (args) => (
  <CardContainer {...args}>
    <Text>Use this card to group related content or actions.</Text>
  </CardContainer>
);

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: 'Volunteer stats',
  subTitle: 'Summary for the last 7 days',
};

export const WithoutHeader = Template.bind({});
WithoutHeader.args = {};

export const CustomSpacing = Template.bind({});
CustomSpacing.args = {
  title: 'Custom layout',
  style: {
    marginHorizontal: 32,
  },
  styleTitleContainer: {
    alignItems: 'flex-start',
  },
};
