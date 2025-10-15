import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, CommonStylesType, ThemeType, SizesType } from '../../theme';

type MetaItem = {
    label: string;
    value?: string;
};

interface UserProfileCardProps {
    layout: 'grid' | 'list';
    goToPofile: () => void;
    fullName: string;
    profession?: string;
    description?: string;
    avatarUrl: string;
    metaItems?: MetaItem[];
    tags?: string[];
}

const UserProfileCard = ({
    layout,
    goToPofile,
    fullName,
    profession,
    description,
    avatarUrl,
    metaItems,
    tags,
}: UserProfileCardProps) => {
    const { commonStyles, typography, theme, sizes } = useTheme();
    const styles = useMemo(
        () => getStyles({ commonStyles, theme, sizes }),
        [commonStyles, theme, sizes],
    );
    const isGrid = layout === 'grid';

    const filteredMetaItems = useMemo(
        () => (metaItems ?? []).filter((item) => item.label.trim().length > 0 || item.value?.trim().length),
        [metaItems],
    );

    const filteredTags = useMemo(
        () => (tags ?? []).filter((tag): tag is string => Boolean(tag && tag.trim().length)),
        [tags],
    );

    return (
        <TouchableOpacity
            onPress={goToPofile}
            activeOpacity={0.9}
            style={[styles.card, isGrid ? styles.gridCard : styles.listCard]}
        >
            <Image
                source={{ uri: avatarUrl }}
                style={isGrid ? styles.gridAvatar : styles.listAvatar}
            />
            <View style={[styles.content, isGrid ? styles.gridContent : styles.listContent]}>
                <Text
                    style={[typography.titleH5, styles.name, isGrid && styles.nameCentered]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {fullName}
                </Text>
                {profession ? (
                    <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={[typography.body, styles.profession, isGrid && styles.professionCentered]}
                    >
                        {profession}
                    </Text>
                ) : null}
                {description ? (
                    <Text
                        numberOfLines={isGrid ? 3 : 2}
                        ellipsizeMode="tail"
                        style={[typography.bodySm, styles.description, isGrid && styles.descriptionCentered]}
                    >
                        {description}
                    </Text>
                ) : null}
                {filteredMetaItems.length ? (
                    <View style={[styles.metaContainer, isGrid && styles.metaContainerGrid]}>
                        {filteredMetaItems.map((item, index) => (
                            <View key={`${item.label}-${item.value}-${index}`} style={styles.metaItem}>
                                <Text
                                    style={[typography.bodyXs, styles.metaLabel]}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {item.label}
                                </Text>
                                {item.value ? (
                                    <Text
                                        style={[typography.bodyXs, styles.metaValue]}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {item.value}
                                    </Text>
                                ) : null}
                            </View>
                        ))}
                    </View>
                ) : null}
                {filteredTags.length ? (
                    <View style={[styles.tagContainer, isGrid && styles.tagContainerGrid]}>
                        {filteredTags.map((tag, index) => (
                            <View key={`${tag}-${index}`} style={styles.tag}>
                                <Text
                                    style={[typography.bodyXs, styles.tagText]}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {tag}
                                </Text>
                            </View>
                        ))}
                    </View>
                ) : null}
            </View>
        </TouchableOpacity>
    );
};

export default UserProfileCard;

const getStyles = ({
    commonStyles,
    theme,
    sizes,
}: {
    commonStyles: CommonStylesType;
    theme: ThemeType;
    sizes: SizesType;
}) =>
    StyleSheet.create({
        card: {
            ...commonStyles.backgroundLight,
            borderRadius: sizes.radius_lg,
            padding: sizes.md,
            marginHorizontal: sizes.xs,
            marginVertical: sizes.xs,
            borderWidth: 1,
            borderColor: theme.border,
            ...commonStyles.shadow,
        },
        gridCard: {
            alignItems: 'center',
        },
        listCard: {
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        gridAvatar: {
            ...commonStyles.avatarLg,
            marginBottom: sizes.sm,
        },
        listAvatar: {
            ...commonStyles.avatarMd,
            marginRight: sizes.md,
        },
        content: {
            flex: 1,
        },
        gridContent: {
            width: '100%',
            alignItems: 'center',
        },
        listContent: {
            flex: 1,
        },
        name: {
            color: theme.title,
            marginBottom: sizes.xs,
        },
        nameCentered: {
            textAlign: 'center',
        },
        profession: {
            color: theme.greyText,
            marginBottom: sizes.xs,
        },
        professionCentered: {
            textAlign: 'center',
        },
        description: {
            color: theme.text,
            marginBottom: sizes.xs,
        },
        descriptionCentered: {
            textAlign: 'center',
        },
        metaContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: sizes.sm,
        },
        metaContainerGrid: {
            justifyContent: 'center',
        },
        metaItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: sizes.xs / 2,
            paddingHorizontal: sizes.sm,
            borderRadius: sizes.radius_sm,
            backgroundColor: theme.backgroundSecond,
            marginRight: sizes.xs,
            marginBottom: sizes.xs,
        },
        metaLabel: {
            color: theme.greyText,
            marginRight: 4,
        },
        metaValue: {
            color: theme.title,
            fontWeight: '600',
        },
        tagContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: sizes.xs,
        },
        tagContainerGrid: {
            justifyContent: 'center',
        },
        tag: {
            borderRadius: sizes.radius_sm,
            borderWidth: 1,
            borderColor: theme.primary,
            backgroundColor: theme.backgroundLight,
            paddingHorizontal: sizes.sm,
            paddingVertical: sizes.xs / 2,
            marginRight: sizes.xs,
            marginBottom: sizes.xs,
        },
        tagText: {
            color: theme.primary,
            fontWeight: '600',
        },
    });
