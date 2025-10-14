import React from 'react';
import { Meta, Story } from '@storybook/react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { MultiSelect, MultiSelectProps } from '../../../src/form';

export default {
  title: 'Form/MultiSelect',
  component: MultiSelect,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the multi-select',
    },
    options: {
      control: 'object',
      description: 'Options for the multi-select',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the multi-select',
    },
    required: {
      control: 'boolean',
    },
  },
} as Meta;

const Template: Story<MultiSelectProps> = (args) => {
  const { control } = useForm();
  return (
    <View style={{ padding: 20 }}>
      <MultiSelect {...args} control={control} />
    </View>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'categories',
  label: 'Выберите категории',
  options: [
    { label: 'Выставки', value: 'Выставки' },
    { label: 'С детьми', value: 'С детьми' },
    { label: 'Активный отдых', value: 'Активный отдых' },
    { label: 'Стендап', value: 'Стендап' },
    { label: 'Образование', value: 'Образование' },
    { label: 'Театры', value: 'Театры' },
    { label: 'Игры', value: 'Игры' },
    { label: 'Кино', value: 'Кино' },
    { label: 'Концерты', value: 'Концерты' },
  ],
  placeholder: 'Выберите...',
};
