// stories/Button/Button.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Button, { MyButtonProps } from './Button';

const meta: Meta<MyButtonProps> = {
  title: 'UI/Buttons/Base',
  component: Button,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <View>
          <Story />
        </View>
      </View>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
  argTypes: {
    title: { control: 'text', description: 'Text displayed on the button' },
    type: {
      control: { type: 'select' },
      options: ['primary', 'gray', 'primary-outline', 'gray-outline', 'report-outline'],
      description: 'Visual style of the button',
    },
    loading: { control: 'boolean', description: 'Shows a loading indicator and disables the button' },
    disabled: { control: 'boolean', description: 'Disables the button interaction' },
    iconGap: { control: { type: 'number', min: 0, step: 1 }, description: 'Gap between icon and text' },
    onPress: { action: 'onPress' },
  },
  args: {
    title: 'Press me',
    type: 'primary',
    loading: false,
    disabled: false,
    iconGap: 8,
  },
} satisfies Meta<typeof Button>;

export default meta;
type S = StoryObj<typeof Button>;

/* Базовые */
export const Primary: S = { args: { title: 'Continue', type: 'primary' } };
export const Outline: S = { args: { title: 'Learn more', type: 'primary-outline' } };
export const Gray: S = { args: { title: 'Cancel', type: 'gray' } };
export const DangerOutline: S = { args: { title: 'Report content', type: 'report-outline' } };
export const LoadingState: S = { args: { title: 'Submitting...', type: 'primary', loading: true } };

/* Варианты с иконками — через render (React-ноды нельзя класть в args) */
export const WithLeftIcon: S = {
  render: (args) => (
    <Button
      {...args}
      title="Upload"
      type="primary"
      leftIcon={<MaterialIcons name="cloud-upload" size={20} color="#fff" />}
    />
  ),
};

export const WithRightIcon: S = {
  render: (args) => (
    <Button
      {...args}
      title="Next"
      type="primary-outline"
      rightIcon={<MaterialIcons name="arrow-forward" size={20} color="#6f2da8" />}
    />
  ),
};

export const WithBothIcons: S = {
  render: (args) => (
    <Button
      {...args}
      title="Share"
      type="gray"
      leftIcon={<MaterialIcons name="share" size={20} color="#fff" />}
      rightIcon={<MaterialIcons name="keyboard-arrow-right" size={20} color="#fff" />}
      iconGap={6}
    />
  ),
};

/* Только иконка (icon-only) */
export const IconOnlyPrimary: S = {
  render: (args) => (
    <View style={{ width: 64 }}>
      <Button
        {...args}
        title={undefined}
        type="primary"
        leftIcon={<MaterialIcons name="settings" size={20} color="#fff" />}
        accessibilityLabel="Open settings"
        // title не передаём
      />
    </View>
  ),
};

export const IconOnlyOutline: S = {
  render: (args) => (
    <View style={{ width: 64 }}>
      <Button
        {...args}
        title={undefined}
        type="primary-outline"
        leftIcon={<MaterialIcons name="favorite-border" size={20} color="#6f2da8" />}
        accessibilityLabel="Add to favorites"
      />
    </View>
  ),
};

/* Disabled + Icon */
export const DisabledWithIcon: S = {
  render: (args) => (
    <Button
      {...args}
      title="Download"
      type="gray-outline"
      disabled
      leftIcon={<MaterialIcons name="download" size={20} color="#777" />}
    />
  ),
};
