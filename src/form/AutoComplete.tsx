import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Autocomplete from 'react-native-autocomplete-input';
import { debounce } from 'lodash';
import { Controller } from 'react-hook-form';

import { commonStyles } from './commonFormStyles';
import { COLORS } from '../constants/theme/theme';

export type AddressFieldProps = {
    name: string;
    control: any;
    label?: string;
    placeholder?: string;
    rules?: object;
    defaultValue?: string;
    setMarkerFromAddress?: (coords: [number, number]) => void;
    required?: boolean;
};

interface AddressResult {
    display_name: string;
    lat?: string;
    lon?: string;
}

const AddressField: React.FC<AddressFieldProps> = ({
    name,
    control,
    label,
    placeholder = "Search for an address",
    rules = {},
    defaultValue = "",
    setMarkerFromAddress,
    required,
}) => {
    const [addresses, setAddresses] = useState<AddressResult[]>([]);
    const [query, setQuery] = useState<string>(defaultValue);

    const searchAddresses = useRef(
        debounce(async (value: string) => {
            if (value.trim() === "") {
                setAddresses([]);
                return;
            }
            try {
                const response = await axios.get(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
                );
                if (response.data.length > 0) {
                    setAddresses(response.data);
                } else {
                    setAddresses([{ display_name: value }]); // Если адрес не найден, сохраняем введенное значение
                }
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        }, 2000)
    ).current;

    const handleSearch = (value: string) => {
        setQuery(value);
        searchAddresses(value);
    };

    const handleSelectAddress = (address: AddressResult, onChange: any) => {
        // Устанавливаем введенный адрес в поле
        setQuery(address.display_name);
        setAddresses([]);
        onChange(address.display_name);

        if (address.lat && address.lon && setMarkerFromAddress) {
            setMarkerFromAddress([Number(address.lat), Number(address.lon)]);
        }
    };

    return (
        <View style={styles.container}>
            {label && <Text style={commonStyles.label}>
                {required && <Text style={commonStyles.required}>* </Text>}
                {label}
            </Text>}
            <Controller
                control={control}
                name={name}
                rules={rules}
                defaultValue={defaultValue}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <Autocomplete
                            data={addresses}
                            value={query} // Привязываем значение поля к состоянию query
                            onChangeText={handleSearch}
                            placeholder={placeholder}
                            flatListProps={{
                                keyExtractor: (item) => item.display_name,
                                renderItem: ({ item }) => (
                                    <TouchableOpacity onPress={() => handleSelectAddress(item, onChange)}>
                                        <Text style={styles.itemText}>{item.display_name}</Text>
                                    </TouchableOpacity>
                                ),
                            }}
                            inputContainerStyle={[commonStyles.inputBorder, commonStyles.inputContainer]}
                            placeholderTextColor={COLORS.placeholder}
                            listContainerStyle={styles.listContainer}
                        // listStyle={styles.list}
                        />
                        {error && <Text style={commonStyles.errorText}>{error.message}</Text>}
                    </>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 0,
        zIndex: 1, // ensures the container stays above other elements
    },
    listContainer: {
        borderWidth: 0,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        maxHeight: 200,
        zIndex: 10,
    },
    list: {
        borderWidth: 0,
    },
    itemText: {
        padding: 10,
        fontSize: 16,
    },
});

export default AddressField;
