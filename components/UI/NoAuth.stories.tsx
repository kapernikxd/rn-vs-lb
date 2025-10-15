import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NoAuth } from './NoAuth';

type NoAuthProps = React.ComponentProps<typeof NoAuth>;

const meta: Meta<NoAuthProps> = {
  title: 'UI/States/NoAuth',
  component: NoAuth,
};

export default meta;

const Template: StoryFn<NoAuthProps> = (args) => <NoAuth {...args} />;

const onPressHandler = () => {
  console.log('[storybook:no-auth:press]');
};

export const Default = Template.bind({});
Default.args = {
  onPress: onPressHandler,
};
