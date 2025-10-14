import React from 'react';
import { Meta, Story } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import Button from '../../../src/components/buttons/Button'; // Убедитесь, что путь правильный

// Определение компонента ButtonGroup
const ButtonGroup = () => {
  const handleUpdateProfile = () => {
    console.log('Update Profile Pressed');
  };

  const handleCancel = () => {
    console.log('Cancel Pressed');
  };

  return (
    <View style={styles.container}>
      <Button
        title="Update Profile"
        onPress={handleUpdateProfile}
        type="primary"
        style={styles.button}
      />
      <Button
        title="Cancel"
        onPress={handleCancel}
        type="gray"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '48%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#6f2da8',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  primaryButtonText: {
    color: '#fff',
  },
  grayButton: {
    backgroundColor: '#f5f5f5',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  grayButtonText: {
    color: '#333',
  },
});

export default {
  title: 'Buttons/ButtonGroup',
  component: ButtonGroup,
} as Meta;

const Template: Story = () => <ButtonGroup />;

export const Default = Template.bind({});
Default.args = {};
