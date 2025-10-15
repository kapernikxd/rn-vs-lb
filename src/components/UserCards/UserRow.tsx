import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { SizesType, useTheme, CommonStylesType } from '../../theme';

interface UserRowProps {
    avatarUri: string;
    userName?: string;
    onPress: () => void;
    size: 'xs' | 'sm' | "md" | "lg";
}

const UserRow: React.FC<UserRowProps> = ({ avatarUri, userName, onPress, size }) => {
    const { globalStyleSheet, sizes, commonStyles, typography } = useTheme();
    const styles = getStyles({ sizes, commonStyles });

    return (
        <TouchableOpacity onPress={onPress} style={globalStyleSheet.flexRowCenter}>
            <Image source={{ uri: avatarUri }} style={size === "xs" ? styles.avatarXs : styles.avatarSm} />
            {userName && <View>
                <Text
                    style={size === "xs" ? typography.bodySm : typography.titleH6Regular}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {userName}
                </Text>
            </View>}
        </TouchableOpacity>
    );
};

const getStyles = ({ sizes, commonStyles }: { sizes: SizesType, commonStyles: CommonStylesType }) => StyleSheet.create({
    avatarSm: {
        ...commonStyles.avatarSm,
        marginRight: sizes.sm,
    },
    avatarXs: {
        ...commonStyles.avatarXs,
        marginRight: sizes.xs,
    },
});

export default UserRow;