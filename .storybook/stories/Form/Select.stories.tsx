import React from 'react';
import { Meta, Story } from '@storybook/react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { Select, SelectProps } from '../../../src/form';

export default {
  title: 'Form/Select',
  component: Select,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the select',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder option text',
    },
    options: {
      control: 'object',
      description: 'Options for the select',
    },
    style: {
      control: 'object',
      description: 'Custom style for the select',
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

const Template: Story<SelectProps> = (args) => {
  const { control } = useForm();

  return (
    <View style={{ padding: 10 }}>
      <Select {...args} control={control} />
    </View>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'category',
  label: 'Category',
  placeholder: 'Select a category',
  options: [
    { label: 'Technology', value: 'tech' },
    { label: 'Health', value: 'health' },
    { label: 'Finance', value: 'finance' },
  ],
  containerStyle: { margin: 10 },
  rules: { required: 'Category is required!' },
  defaultValue: '',
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  name: 'category',
  label: 'Custom Select',
  placeholder: 'Choose an option',
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
  style: { borderColor: 'blue', borderWidth: 2 },
  containerStyle: { margin: 20, padding: 10, backgroundColor: '#f0f0f0' },
  rules: { required: 'Please select an option!' },
  defaultValue: '1',
};