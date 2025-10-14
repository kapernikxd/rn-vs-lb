import React from 'react';
import { Meta, Story } from '@storybook/react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { AutoComplete, AutoCompleteProps } from '../../../src/form';

export default {
  title: 'Form/AutoComplete',
  component: AutoComplete,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the location field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the location field',
    },
    required: {
        control: 'boolean',
    },
  },
} as Meta;

const Template: Story<AutoCompleteProps> = (args) => {
  const { control } = useForm();
  return (
    <View style={{ padding: 20 }}>
      <AutoComplete {...args} control={control} />
    </View>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'location',
  label: 'City',
  placeholder: 'Enter a city',
  required: true,
};