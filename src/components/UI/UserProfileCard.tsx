import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyleSheetType, useTheme, CommonStylesType } from '../../theme';
import Spacer from './Spacer';

interface UserProfileCardProps {
    layout: 'grid' | 'list';
    goToPofile: () => void;
    fullName: string;
    profession?: string;
    description?: string;
    avatarUrl: string;
}

const UserProfileCard = ({ layout, goToPofile, fullName, profession, description, avatarUrl }: UserProfileCardProps) => {
    const { globalStyleSheet, commonStyles, typography } = useTheme();
    const styles = getStyles(globalStyleSheet, commonStyles);
    const isGrid = layout === 'grid';

    return (
        <View style={[styles.card, isGrid ? globalStyleSheet.flexColumnCenter : globalStyleSheet.flexRowStart]}>
            <Image
                source={{ uri: avatarUrl }}
                style={[isGrid ? styles.gridAvatar : styles.listAvatar]}
            />
            <View style={[globalStyleSheet.flex1, isGrid ? styles.gridContent : globalStyleSheet.flex1]}>
                <TouchableOpacity onPress={goToPofile}>
                    <Text style={typography.titleH5}>{fullName}</Text>
                    {profession && <Text numberOfLines={1}
                        ellipsizeMode="tail" style={typography.body}>{profession}</Text>}
                    <Spacer size='xs' />
                </TouchableOpacity>
                <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={[isGrid ? [typography.bodyXs, {textAlign: "center"}] : typography.bodySm]}>
                    {description}
                </Text>
            </View>
        </View>
    );
};

export default UserProfileCard;

const getStyles = (globalStyleSheet: GlobalStyleSheetType, commonStyles: CommonStylesType) => StyleSheet.create({
    card: {
        ...commonStyles.backgroundLight,
        borderRadius: 12,
        padding: 12,
        marginHorizontal: 8,
        marginVertical: 6,
        ...commonStyles.shadow,
    },
    gridAvatar: {
        ...commonStyles.avatarLg,
        marginBottom: 16,
    },
    listAvatar: {
        ...commonStyles.avatarMd,
        marginRight: 16,
    },
    gridContent: {
        alignItems: 'center',
    },
});
