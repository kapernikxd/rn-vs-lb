import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme, ThemeType, SizesType, CommonStylesType } from '../../theme';
import { ThreeDotsMenu } from './ThreeDotsMenu';
import { EventParticipant } from '../../types/event';

type ParticipantItemProps = {
    participant: EventParticipant;
    fullName: string;
    avatarUrl: string;
    isMe: boolean;
    myId: string;
    onActionPress: (userId: string) => void;
    onConfirm?: (userId: string) => void;
    onReject?: (userId: string) => void;
    onProfilePress: (profileId: string) => void;
    isModerated: boolean;
    confirmLabel: string;
    rejectLabel: string;
    deleteLabel: string;
    youLabel: string;
    statusLabels?: Partial<Record<NonNullable<EventParticipant['status']>, string>>;
};

export const ParticipantItem: FC<ParticipantItemProps> = ({
    fullName,
    avatarUrl,
    isModerated,
    participant,
    isMe,
    myId,
    onActionPress,
    onProfilePress,
    onConfirm,
    onReject,
    confirmLabel,
    rejectLabel,
    deleteLabel,
    youLabel,
    statusLabels,
}) => {
    const { globalStyleSheet, theme, sizes, commonStyles, typography } = useTheme();
    const styles = getStyles({ theme, sizes, commonStyles });
    const statusKey = participant.status as NonNullable<EventParticipant['status']> | undefined;
    const statusText = statusKey ? statusLabels?.[statusKey] ?? participant.status?.toLowerCase() : undefined;
    const statusStyle = statusKey ? (styles as Record<string, typeof styles.status_default>)[`status_${statusKey}`] : undefined;

    return (
        <View key={participant._id} style={globalStyleSheet.flexRowCenterBetween}>
            <TouchableOpacity style={globalStyleSheet.flexRowCenter} onPress={() => onProfilePress(participant._id)}>
                <Image source={{ uri: avatarUrl}} style={styles.participantAvatar} />
                <Text style={typography.body}>{fullName}</Text>
            </TouchableOpacity>
            <View style={globalStyleSheet.flexRowCenter}>
                {statusText && (
                    <Text style={[styles.statusText, statusStyle ?? styles.status_default]}>{statusText}</Text>
                )}
                {isMe && myId !== participant._id && (
                    <ThreeDotsMenu
                        items={[
                            {
                                label: confirmLabel,
                                icon: 'checkmark-outline',
                                onPress: () => onConfirm && onConfirm(participant._id),
                            },
                            {
                                label: isModerated ? rejectLabel : deleteLabel,
                                icon: 'close-outline',
                                colorIcon: theme.red,
                                onPress: () => isModerated ? (onReject && onReject(participant._id)) : onActionPress(participant._id),
                            },
                        ]}
                    />

                )}
                {isMe && myId === participant._id && <Text style={styles.youText}>{youLabel}</Text>}
            </View>
        </View>
    );
};

const getStyles = ({ theme, sizes, commonStyles }: { theme: ThemeType, sizes: SizesType, commonStyles: CommonStylesType }) => StyleSheet.create({
    participantAvatar: {
        ...commonStyles.avatarSm,
        marginRight: sizes.sm,
    },
    actionButton: {
        marginLeft: 6,
        paddingHorizontal: 18,
        paddingVertical: 5,
        borderColor: theme.danger,
        borderWidth: 1,
        borderRadius: 8,
    },
    actionButtonText: {
        fontSize: 14,
        color: theme.danger,
    },
    youText: {
        paddingHorizontal: 18,
        paddingVertical: 5,
        fontSize: 14,
        color: theme.placeholder,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        textTransform: 'capitalize',
        overflow: 'hidden',
        marginRight: 6,
    },
    status_default: {
        backgroundColor: '#bbb',
        color: theme.white,
    },
    status_PENDING: {
        backgroundColor: theme.primaryLight,
        color: theme.white,
    },
    status_CONFIRMED: {
        backgroundColor: theme.success,
        color: theme.white,
    },
    status_REJECTED: {
        backgroundColor: theme.warning,
        color: theme.white,
    },
});
