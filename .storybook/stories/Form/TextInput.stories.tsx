import React from 'react';
import { Meta, Story } from '@storybook/react';
import { View } from 'react-native';
import InputWithValidation, { InputWithValidationProps } from '../../../src/form/TextInput';


export default {
    title: 'Form/InputWithValidation',
    component: InputWithValidation,
    parameters: {
        controls: { expanded: true },
    },
    argTypes: {
      required: {
        control: 'boolean',
      },
    },
  } as Meta;

const Template: Story<InputWithValidationProps> = (args) => (
    <View style={{ padding: 20 }}>
        <InputWithValidation {...args} />
    </View>
);


export const TextField = Template.bind({});
TextField.args = {
    name: 'Name',
    label: 'Name',
    placeholder: 'Enter your name',
    keyboardType: 'default',
    required: true,
    rules: {
        required: 'Name is required!',
    },
};

export const EmailField = Template.bind({});
EmailField.args = {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    keyboardType: 'email-address',
    required: true,
    rules: {
        required: 'Email is required!',
        pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: 'Invalid email address!',
        },
    },
    defaultValue: "example@example.com"
};

export const PhoneField = Template.bind({});
PhoneField.args = {
    name: 'phone',
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    keyboardType: 'phone-pad',
    rules: {
        required: 'Phone number is required!',
        pattern: {
            value: /^[0-9]{10,15}$/,
            message: 'Invalid phone number!',
        },
    },
};

export const PasswordField = Template.bind({});
PasswordField.args = {
  name: 'password',
  label: 'Password',
  placeholder: 'Enter your password',
  secureTextEntry: true,
  required: true,
  rules: {
    required: 'Password is required!',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters!',
    },
  },
};