import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';

import { commonStyles } from './commonFormStyles';
import { COLORS, SIZES } from '../constants/theme/theme';

export interface SelectProps {
    name: string;
    control: any;
    label?: string;
    options: { label: string; value: string | number }[];
    placeholder?: string;
    style?: object;
    containerStyle?: object;
    rules?: object;
    defaultValue?: string | number;
    required?: boolean;
    errorTextStyle?: object;
}

const Select: React.FC<SelectProps> = ({
    name,
    control,
    label,
    options,
    placeholder = 'Select an option...',
    style,
    containerStyle,
    rules = {},
    required,
    defaultValue = '',
    errorTextStyle,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={commonStyles.label}>
                {required && <Text style={commonStyles.required}>* </Text>}
                {label}
            </Text>}
            <View style={[style]}>
                <Controller
                    control={control}
                    name={name}
                    rules={rules}
                    defaultValue={defaultValue}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                        <View style={[commonStyles.inputBorder, commonStyles.inputContainer, styles.inputContainer]}>
                            <Picker
                                selectedValue={value}
                                onValueChange={(itemValue) => onChange(itemValue)}
                                style={styles.picker}
                                itemStyle={value === '' ? styles.placeholder : styles.selectedItem}
                            >
                                {placeholder && (
                                    <Picker.Item label={placeholder} value="" style={styles.placeholder} />
                                )}
                                {options.map((option) => (
                                    <Picker.Item
                                        key={option.value}
                                        label={option.label}
                                        value={option.value}
                                        style={styles.selectedItem} // Ensure font size applies per item
                                    />
                                ))}
                            </Picker>
                            </View>
                            {error && <Text style={[commonStyles.errorText, errorTextStyle]}>{error.message}</Text>}
                        </>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 0,
    },
    inputContainer: {
        overflow: 'hidden',
        justifyContent: 'center',
        paddingHorizontal: 0,
    },
    placeholder: {
        color: COLORS.placeholder,
        fontSize: SIZES.font,
    },
    selectedItem: {
        color: COLORS.dark,
        fontSize: SIZES.font,
    },
    picker: {
        height: "100%",
        borderWidth: 0,
        paddingHorizontal: 0,
        padding: 0,
    }
});

export default Select;