import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    required: {
        color: 'red',
    },
    label: {
        fontSize: 16,
        fontWeight: '300',
        marginBottom: 5,
    },
    inputBorder: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    inputContainer: {
        height: 50,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        justifyContent: "center",
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        fontSize: 12,
    },
});