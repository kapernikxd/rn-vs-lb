import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import PasswordInput from './PasswordInput';

import { commonStyles } from './commonFormStyles';
import { COLORS } from '../constants/theme/theme';

export interface InputWithValidationProps {
  name: string;
  control: any;
  label?: string;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric' | 'decimal-pad' | 'number-pad' | 'url' | 'web-search';
  secureTextEntry?: boolean;
  required?: boolean;
  rules?: { required?: boolean | string; [key: string]: any };
  defaultValue?: string;
}

const InputWithValidation: React.FC<InputWithValidationProps> = ({
  name,
  control,
  label = '',
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  required = false,
  rules = {},
  defaultValue = ''
}) => {
  const { formState: { errors } } = useForm<{ [key: string]: string }>();

  return (
    <View style={styles.container}>
      {label && (
        <Text style={commonStyles.label}>
          {required && <Text style={commonStyles.required}>* </Text>}
          {label}
        </Text>
      )}
      <Controller
        control={control}
        rules={rules}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          secureTextEntry ? (
            <>
            <PasswordInput
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              error={!!errors[name]}
            />
            {error && <Text style={[commonStyles.errorText]}>{error.message}</Text>}
            </>
          ) : (
            <>
            <TextInput
              style={[commonStyles.inputBorder, commonStyles.inputContainer, errors[name] && styles.inputError]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value || defaultValue}
              placeholder={placeholder}
              placeholderTextColor={COLORS.placeholder}
              keyboardType={keyboardType}
            />
            {error && <Text style={[commonStyles.errorText]}>{error.message}</Text>}
            </>
          )
        )}
      />
      {errors[name] && <Text style={commonStyles.errorText}>{(errors[name] as any)?.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  inputError: {
    borderColor: 'red',
  },
});

export default InputWithValidation;