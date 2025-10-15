import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { NoAuth } from '../../../src/components/UI/NoAuth';

type NoAuthProps = React.ComponentProps<typeof NoAuth>;

const meta: Meta<NoAuthProps> = {
  title: 'UI/States/NoAuth',
  component: NoAuth,
};

export default meta;

const Template: StoryFn<NoAuthProps> = (args) => <NoAuth {...args} />;

export const Default = Template.bind({});
Default.args = {
  onPress: action('navigate-to-login'),
};
