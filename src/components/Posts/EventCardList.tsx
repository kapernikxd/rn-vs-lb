import React, { ReactNode } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Spacer from '../UI/Spacer';
import { ThemeType, useTheme, CommonStylesType } from '../../theme';

interface EventCardProps {
    imageUri: string;
    date?: string;
    title: string;
    description: string;
    onPress?: () => void; // для иконки приглашения
    createdByMe: boolean;
    isModerated: boolean;
    isInvitation: boolean;
    isFirstElement?: boolean;
    moderationStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
    moderationImageStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
    participantsCount?: number;
    maxParticipants?: number;
    tooltipContent: ReactNode;
}

const EventCardList: React.FC<EventCardProps> = ({
    imageUri,
    date,
    title,
    description,
    onPress,
    createdByMe,
    isInvitation,
    isFirstElement,
    moderationStatus,
    moderationImageStatus,
    participantsCount,
    maxParticipants,
    tooltipContent,
    isModerated
}) => {
    const { globalStyleSheet, theme, commonStyles, typography, isDark, } = useTheme();
    const styles = getStyles({ theme, commonStyles });


    const renderModerationTooltip = () => {
        if (!moderationStatus || moderationStatus === 'APPROVED' || !createdByMe) return null;
        const backgroundColor = isDark ? theme.backgroundThird : theme.backgroundSemiTransparent

        return (
            <TouchableOpacity
                onPress={(e) => e.stopPropagation()}
                style={[styles.statusMarker, { backgroundColor }]}
                activeOpacity={0.8}
            >
                {/* <TooltipComponent
                    content={tooltipContent}
                /> */}
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, isFirstElement && styles.containerForFirstElement]}>
            <View style={[styles.overlayWrapper, isModerated && styles.dimmed]}>
                <Image source={{ uri: imageUri }} style={commonStyles.imageCard} />
                <View style={styles.content}>
                    <View style={globalStyleSheet.flexRowCenterBetween}>
                        <Text style={[typography.titleH6, { width: "85%" }]} numberOfLines={1} ellipsizeMode="tail">
                            {title}
                        </Text>
                        {isInvitation && onPress && (
                            <TouchableOpacity style={styles.action} onPress={(e) => {
                                e.stopPropagation();
                                onPress();
                            }}>
                                <Ionicons name='ellipsis-horizontal-sharp' size={20} color={theme.primary} />
                            </TouchableOpacity>
                        )}
                    </View>
                    <Spacer size='xxs' />
                    <Text style={typography.bodyXs} numberOfLines={3} ellipsizeMode="tail">
                        {description}
                    </Text>
                    <Spacer size='xs' />
                    <Text style={[typography.bodyXs, styles.date]}>{date}</Text>
                    {maxParticipants !== undefined && (
                        <Text style={[typography.bodyXs, styles.participants]}>
                            {participantsCount}/{maxParticipants}
                        </Text>
                    )}
                </View>
            </View>

            {/* Модерация поверх */}
            {renderModerationTooltip()}
        </View>
    );
};

const getStyles = ({ theme, commonStyles }: { commonStyles: CommonStylesType, theme: ThemeType }) => StyleSheet.create({
    container: {
        ...commonStyles.card,
        ...commonStyles.shadow,
        flexDirection: 'column',
        marginVertical: 4,
        position: 'relative',
    },
    containerForFirstElement: {
        marginVertical: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        marginBottom: 4,
    },
    overlayWrapper: {
        flexDirection: 'row',
    },
    dimmed: {
        opacity: 0.5,
    },
    content: {
        flex: 1,
        justifyContent: "space-around",
        marginRight: 8,
    },
    action: {
        padding: 4,
    },
    date: {
        color: theme.placeholder,
        textAlign: "right",
    },
    participants: {
        textAlign: 'right',
    },
    moderationOverlay: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 10,
    },
    statusMarker: {
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        zIndex: 10,
    },
});

export default EventCardList;
