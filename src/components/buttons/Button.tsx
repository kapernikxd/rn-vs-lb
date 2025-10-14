import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacityProps, StyleProp } from 'react-native';
import { COLORS } from '../../constants/theme';

export interface MyButtonProps extends TouchableOpacityProps {
  title: string;
  type?: 'primary' | 'gray' | 'primary-outline' | 'gray-outline';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<MyButtonProps> = ({ title, onPress, type = 'primary', style, textStyle }) => {
  const buttonStyles = [
    styles.button,
    type === 'primary' && styles.primaryButton,
    type === 'gray' && styles.grayButton,
    type === 'primary-outline' && styles.primaryOutlineButton,
    type === 'gray-outline' && styles.grayOutlineButton,
    style,
  ];

  const textStyles = [
    styles.buttonText,
    type === 'primary' && styles.primaryButtonText,
    type === 'gray' && styles.grayButtonText,
    type === 'primary-outline' && styles.primaryOutlineButtonText,
    type === 'gray-outline' && styles.grayOutlineButtonText,
    textStyle,
  ];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 16,
    width: "100%",
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  primaryOutlineButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  grayButton: {
    backgroundColor: '#f5f5f5',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  primaryButtonText: {
    color: COLORS.white,
  },
  primaryOutlineButtonText: {
    color: COLORS.primary,
  },
  grayButtonText: {
    color: '#333',
  },
  grayOutlineButton: {
    backgroundColor: '#f5f5f5',
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  grayOutlineButtonText: {
    // color: COLORS.
  }
});

export default Button;
