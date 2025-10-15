import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NoAuth } from './NoAuth';

type NoAuthProps = React.ComponentProps<typeof NoAuth>;

const meta: Meta<NoAuthProps> = {
  title: 'UI/States/NoAuth',
  component: NoAuth,
  argTypes: {
    onPress: { action: 'cta press' },
  },
};

export default meta;

const Template: StoryFn<NoAuthProps> = (args) => <NoAuth {...args} />;

export const Default = Template.bind({});
Default.args = {
};
