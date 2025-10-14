import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button, { MyButtonProps } from '../../../src/components/buttons/Button'; // Убедитесь, что путь правильный

export default {
  title: 'Buttons/Button',
  component: Button,
  argTypes: {
    title: {
      control: 'text',
      description: 'Text displayed on the button',
    },
    type: {
      control: { type: 'radio' },
      options: ['primary', 'gray'],
      description: 'Type of button (primary or gray)',
    },
    onPress: { action: 'pressed' },
  },
} as Meta;

const Template: Story<MyButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Update Profile',
  type: 'primary',
};

export const Gray = Template.bind({});
Gray.args = {
  title: 'Cancel',
  type: 'gray',
};


export const PrimaryOutline = Template.bind({});
PrimaryOutline.args = {
  title: 'Ok',
  type: 'primary-outline',
};