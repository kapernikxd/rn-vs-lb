import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import LoadingScreen from './LoadingScreen';

const meta: Meta = {
  title: 'UI/States/LoadingScreen',
  component: LoadingScreen,
};

export default meta;

const Template: StoryFn = () => <LoadingScreen />;

export const Default = Template.bind({});
