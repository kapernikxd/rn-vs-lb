import React from 'react';
import { Meta, Story } from '@storybook/react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { ImageUploader, ImageUploaderProps } from '../../../src/form';

export default {
  title: 'Form/ImageUploader',
  component: ImageUploader,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the image uploader',
    },
    style: {
      control: 'object',
      description: 'Custom style for the upload button',
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

const Template: Story<ImageUploaderProps> = (args) => {
  const { control } = useForm();

  return (
    <View style={{ padding: 20 }}>
      <ImageUploader {...args} control={control} />
    </View>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'images',
  label: 'Upload Images',
  rules: { required: 'At least one image is required!' },
  defaultValue: [],
};
