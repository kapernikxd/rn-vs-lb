import React from 'react';
import { Meta, Story } from '@storybook/react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '../../../src/form';

export default {
  title: 'Form/DatePicker',
  component: DatePicker,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the date picker',
    },
    style: {
      control: 'object',
      description: 'Custom style for the date picker button',
    },
    containerStyle: {
      control: 'object',
      description: 'Custom style for the container',
    },
    required: {
        control: 'boolean',
    },
  },
} as Meta;

const Template: Story<DatePickerProps> = (args) => {
  const { control } = useForm();

  return (
    <View style={{ padding: 20 }}>
      <DatePicker {...args} control={control} />
    </View>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'datetime',
  label: 'Select Date and Time',
  rules: { required: 'Date and Time are required!' },
  defaultValue: new Date(),
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  name: 'datetime',
  label: 'Custom Date Picker',
  containerStyle: { margin: 20, padding: 10, backgroundColor: '#f0f0f0' },
  rules: { required: 'Please select a date and time!' },
  defaultValue: new Date(),
};