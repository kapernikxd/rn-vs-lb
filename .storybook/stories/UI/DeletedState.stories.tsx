import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '../../utils/actions';
import DeletedState from '../../../src/components/UI/DeletedState';

type DeletedStateProps = React.ComponentProps<typeof DeletedState>;

const meta: Meta<DeletedStateProps> = {
  title: 'UI/States/DeletedState',
  component: DeletedState,
};

export default meta;

const Template: StoryFn<DeletedStateProps> = (args) => <DeletedState {...args} />;

export const WithoutAction = Template.bind({});
WithoutAction.args = {};

export const WithGoBack = Template.bind({});
WithGoBack.args = {
  goBack: action('go-back'),
};
