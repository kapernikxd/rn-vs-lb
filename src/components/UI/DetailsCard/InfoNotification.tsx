import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyleSheetType, ThemeType, useTheme } from '../../../theme';

type InfoNotificationProps = {
    goToLogin: () => void;
}

export const InfoNotification: React.FC<InfoNotificationProps> = ({ goToLogin }) => {
    const { globalStyleSheet, theme, typography } = useTheme();
    const styles = getStyles({ theme, globalStyleSheet });

    return (
        <View style={styles.notifiacationContainer}>
            <Ionicons name="information-circle-outline" size={24} color={theme.primaryLight} style={styles.notifiacationIcon} />
            <Text style={[typography.body, styles.notifiacationText]}>
                Please, <Text onPress={goToLogin} style={styles.notifiacationLink}>Login</Text> to participate in the event.
            </Text>
        </View>
    );
};

const getStyles = ({ theme, globalStyleSheet}: { theme: ThemeType, globalStyleSheet: GlobalStyleSheetType }) => StyleSheet.create({
    //notifiacation
    notifiacationContainer: {
        ...globalStyleSheet.flexRowCenter,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.primaryLight,
    },
    notifiacationIcon: {
        marginRight: 8,
    },
    notifiacationText: {
        display: 'flex',
        flex: 1,
    },
    notifiacationLink: {
        color: theme.primaryLight,
        fontWeight: 'bold',
    },
});