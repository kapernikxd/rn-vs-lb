import React from 'react';
import { Meta, Story } from '@storybook/react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { TextArea, TextAreaProps } from '../../../src/form';

export default {
  title: 'Form/TextArea',
  component: TextArea,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    numberOfLines: {
      control: 'number',
      description: 'Number of lines for the textarea',
    },
    style: {
      control: 'object',
      description: 'Custom style for the textarea',
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

const Template: Story<TextAreaProps> = (args) => {
  const { control } = useForm();

  return (
    <View style={{ padding: 20 }}>
      <TextArea {...args} control={control} />
    </View>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'description',
  label: 'Description',
  placeholder: 'Enter your description...',
  numberOfLines: 4,
  style: { height: 150, borderColor: 'gray' },
  rules: { required: 'Description is required!' },
  defaultValue: '',
  required: true,
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  name: 'description',
  label: 'Custom TextArea',
  placeholder: 'Enter custom text...',
  numberOfLines: 6,
  style: { height: 200, borderColor: 'blue', borderWidth: 2 },
  containerStyle: { margin: 20, padding: 10, backgroundColor: '#f0f0f0' },
  rules: { required: 'This field is required!' },
  defaultValue: 'Default value here...',
};