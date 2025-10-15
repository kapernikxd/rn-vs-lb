import React, { FC } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SizesType, ThemeType } from '../../theme';
import { useTheme } from '../../theme';

interface HrProps {
    style?: ViewStyle;
    display?: boolean; 
    size?: keyof SizesType;
}

const Hr: FC<HrProps> = ({ style, display = true, size = 'sm' }) => {
    const { globalStyleSheet, theme, sizes } = useTheme();
    const styles = getStyles(theme);
    const margin = sizes[size] || sizes.sm;

    if (!display) return null;

    return (
        <View style={[styles.container, { marginVertical: margin as number }, style]} />
    );
};

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
});

export default Hr;
