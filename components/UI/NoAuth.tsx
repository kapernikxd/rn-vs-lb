import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spacer from './Spacer';
import { Button } from '../Button';
import { useTheme } from '../../theme';


type NoAuthProps = {
    onPress: () => void;
    title: string;
    description: string;
    buttonText: string;
}

export const NoAuth: FC<NoAuthProps> = ({ onPress, title, description, buttonText }) => {
    const { commonStyles, typography, theme } = useTheme();

    return (
        <View style={[commonStyles.container, {backgroundColor: theme.background}]}>
            <Text style={typography.titleH3}>{title}</Text>
            <Spacer size='xs' />
            <Text style={typography.body}>{description}</Text>
            <Spacer size='lg' />
            <View style={styles.button}>
                <Button title={buttonText} onPress={onPress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '70%'
    },
});