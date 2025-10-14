import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { commonStyles } from './commonFormStyles';

interface PasswordInputProps {
  value: string;
  onChange: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, onBlur, placeholder, error }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.inputContainer, commonStyles.inputBorder, commonStyles.inputContainer]}>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#ccc"
        secureTextEntry={!isPasswordVisible}
      />
      <TouchableOpacity style={styles.icon} onPress={togglePasswordVisibility}>
        <Icon
          name={isPasswordVisible ? "eye-off" : "eye"}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingRight: 50, // Место для иконки
  },
  icon: {
  },
  inputError: {
    borderColor: 'red',
  },
});

export default PasswordInput;