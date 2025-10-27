import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../theme';

interface ThemeSwitcherProps {
    lightModeLabel: string;
    darkModeLabel: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ lightModeLabel, darkModeLabel }) => {
    const { theme, toggleTheme, isDark, globalStyleSheet, typography } = useTheme();
    // th-list puzzle-piece
    return (
        <View style={styles.container}>
            <View style={globalStyleSheet.flexRowCenter}>
                <FontAwesome style={styles.iconContainer} name={"th-list"} size={18} color={theme.text} />
                <Text style={[typography.titleH6Regular, { color: theme.text }]}>
                    {isDark ? darkModeLabel : lightModeLabel}
                </Text>
            </View>
            <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.light, true: theme.primary }}
                thumbColor={theme.black}
                style={styles.switch}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,
    },
    iconContainer: {
        width: 24,
        alignItems: 'center',
        marginRight: 8,
        left: 4,
    },
    switch: {
        marginVertical: -4,
    }
});

export default ThemeSwitcher;
