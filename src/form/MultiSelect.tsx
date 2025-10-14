import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

import { commonStyles } from './commonFormStyles';
import { COLORS, SIZES } from '../constants/theme';

export interface MultiSelectProps {
    name: string;
    control: any;
    options: { label: string; value: string }[];
    label?: string;
    style?: object;
    containerStyle?: object;
    rules?: object;
    placeholder?: string;
    errorTextStyle?: object;
    required?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    name,
    control,
    options,
    label,
    style,
    containerStyle,
    rules = {},
    placeholder = "Select...",
    errorTextStyle,
    required
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
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>  
                        <View style={[commonStyles.inputBorder, commonStyles.inputContainer, styles.inputContainer]}>
                            <Picker
                                selectedValue=""
                                onValueChange={(itemValue) => {
                                    if (itemValue && !value.includes(itemValue)) {
                                        onChange([...value, itemValue]);
                                    }
                                }}
                                style={[pickerStyles.picker]}
                            >
                                <Picker.Item label={placeholder} value="" style={styles.placeholder} />
                                {options.map(option => (
                                    <Picker.Item label={option.label} value={option.value} key={option.value} />
                                ))}
                            </Picker>
                            </View>

                            <View style={styles.selectedContainer}>
                                {value?.map((item: string) => (
                                    <View key={item} style={styles.selectedItem}>
                                        <Text style={styles.selectedItemText}>{item}</Text>
                                        <TouchableOpacity
                                            onPress={() => onChange(value.filter((selectedItem: string) => selectedItem !== item))}
                                        >
                                            <Ionicons name="close" size={18} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>

                            {error && <Text style={[commonStyles.errorText, errorTextStyle]}>{error.message}</Text>}
                        </>
                    )}
                    defaultValue={[]}
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
    selectedContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    placeholder:{
        color: COLORS.placeholder,
        fontSize: SIZES.font,
    },
    selectedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 5,
        marginBottom: 5,
    },
    selectedItemText: {
        marginRight: 5,
    },
});

const pickerStyles = StyleSheet.create({
    picker: {
        height: "100%",
        borderWidth: 0,
    },
});

export default MultiSelect;
