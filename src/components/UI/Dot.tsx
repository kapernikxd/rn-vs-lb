import React, { FC } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface DotProps {
    style?: ViewStyle;
    display: boolean
}

const Dot: FC<DotProps> = ({ style, display }) => {
    if (!display) return null;

    return (
       <View style={[styles.dot, style]}></View>
    );
};

const styles = StyleSheet.create({
    dot: {
        width: 8,
        height: 8,
        borderRadius: 10,
        position: "absolute",
    },
});

export default Dot;
