import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spacer from './Spacer';
import { Button } from '../Button';
import { useTheme } from '../../theme';


type NoAuthProps = {
    onPress: () => void;
}

export const NoAuth: FC<NoAuthProps> = ({ onPress }) => {
    const { commonStyles, typography, theme } = useTheme();

    return (
        <View style={[commonStyles.container, {backgroundColor: theme.background}]}>
            <Text style={typography.titleH3}>Welcome!</Text>
            <Spacer size='xs' />
            <Text style={typography.body}>
                To continue, please log in to the system.
            </Text>
            <Spacer size='lg' />
            <View style={styles.button}>
                <Button title='Log In' onPress={onPress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '70%'
    },
});