import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Spacer from '../UI/Spacer';
import { useTheme, CommonStylesType } from '../../theme';


interface PlaceCardProps {
    imageUri: string;
    title: string;
    description: string;
}

const PlaceCardList: React.FC<PlaceCardProps> = ({
    imageUri,
    title,
    description,
}) => {
    const { globalStyleSheet, commonStyles, typography } = useTheme();
    const styles = getStyles({ commonStyles });

    return (
        <View style={styles.container}>
            <Image source={{ uri: imageUri }} style={commonStyles.imageCard} />
            <View style={styles.content}>
                <View style={globalStyleSheet.flexRowCenterBetween}>
                    <Text style={[typography.titleH6, {width: "95%" }]} numberOfLines={1} ellipsizeMode="tail">
                        {title}
                    </Text>
                </View>
                <Spacer size='xxs'/>
                <Text style={[typography.bodyXs, {width: "95%" }]} numberOfLines={3} ellipsizeMode="tail">
                    {description}
                </Text>
                <Spacer size='xs'/>
                <Text style={[typography.bodyXs, styles.date]}>''</Text>
            </View>
        </View>
    );
};

const getStyles = ({ commonStyles }: {commonStyles:CommonStylesType}) => StyleSheet.create({
     container: {
        ...commonStyles.card,
        ...commonStyles.shadow,
        flexDirection: 'row',
        marginVertical: 4,
    },
    content: {
        flex: 1,
        justifyContent: "space-around",
        marginRight: 8,
    },
    date: {
        opacity: 0
    },
});

export default PlaceCardList;
