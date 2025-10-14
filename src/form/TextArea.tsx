import React from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps } from 'react-native';
import { Controller } from 'react-hook-form';

import { commonStyles } from './commonFormStyles';
import { COLORS } from '../constants/theme';

export interface TextAreaProps extends TextInputProps {
    name: string;
    control: any;
    label?: string;
    placeholder?: string;
    numberOfLines?: number;
    style?: object;
    containerStyle?: object;
    rules?: object;
    defaultValue?: string;
    required?: boolean;
    errorTextStyle?: object;
}

const TextArea: React.FC<TextAreaProps> = ({
    name,
    control,
    label,
    placeholder = 'Enter text...',
    numberOfLines = 4,
    style,
    containerStyle,
    rules = {},
    defaultValue = '',
    required,
    errorTextStyle,
    ...rest
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={commonStyles.label}>
                {required && <Text style={commonStyles.required}>* </Text>}
                {label}
            </Text>}
            <Controller
                control={control}
                name={name}
                rules={rules}
                defaultValue={defaultValue}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <>
                        <TextInput
                            style={[commonStyles.inputBorder, commonStyles.inputContainer, styles.textArea, style]}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            multiline={true}
                            numberOfLines={numberOfLines}
                            placeholderTextColor={COLORS.placeholder}
                            {...rest}
                        />
                        {error && <Text style={[commonStyles.errorText, errorTextStyle]}>{error.message}</Text>}
                    </>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 0,
    },
    textArea: {
        height: 150,
        padding: 12,
        textAlignVertical: 'top',
    },
});

export default TextArea;