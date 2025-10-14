import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONTS, SIZES } from '../../constants/theme/theme';

//@ts-ignore
const Tag = ({ label, backgroundColor, textColor, borderColor }) => (
    <View style={[styles.tagContainer, { backgroundColor, borderColor }]}>
        <Text style={[styles.tagText, { color: textColor }]}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    tagContainer: {
        paddingHorizontal: SIZES.xs,
        paddingVertical: SIZES.xxs,
        borderRadius: SIZES.xs,
        borderWidth: 1,
        marginLeft: SIZES.xxs,
    },
    tagText: {
        ...FONTS.font,
        fontWeight: 600,
    },
});


export default Tag;