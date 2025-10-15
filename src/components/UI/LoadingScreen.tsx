import React, { FC } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemeType, useTheme } from '../../theme';

const LoadingScreen: FC = () => {
    const { theme } = useTheme();
    const styles = getStyles({ theme });

    return (
        <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color={theme.primary} />
        </View>
    )
};

const getStyles = ({ theme }: { theme: ThemeType }) => StyleSheet.create({
    loaderOverlay: {
        ...StyleSheet.absoluteFillObject, // Заполняет весь экран
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.backgroundLight, // Полупрозрачный белый фон
    },
});

export default LoadingScreen;
