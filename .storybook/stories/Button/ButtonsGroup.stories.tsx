import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import { action } from '@storybook/addon-actions';
import Button from '../../../src/components/buttons/Button';

const handlePrimaryPress = action('primary pressed');
const handleSecondaryPress = action('secondary pressed');

const ButtonGroup = () => (
  <View style={styles.container}>
    <Button title="Update Profile" type="primary" onPress={handlePrimaryPress} style={styles.button} />
    <Button title="Cancel" type="gray" onPress={handleSecondaryPress} style={styles.button} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  button: {
    flex: 1,
  },
});

const meta: Meta = {
  title: 'Buttons/ButtonGroup',
  component: ButtonGroup,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
