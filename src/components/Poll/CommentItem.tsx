import React from 'react';
import { Text, View, StyleSheet, Linking } from 'react-native';
import { ThemeType, useTheme } from '../../theme';
import UserRow from '../UserCards/UserRow';

export interface User {
    _id: string;
    fullName?: string;
    avatarUrl?: string;
}

export interface Comment {
    _id: string;
    text: string;
    createdAt: string;
    createdBy: User;
}

interface CommentItemProps {
    comment: Comment;
    onPressUser?: (userId: string) => void;

    /** Функция-обработчик для нажатий по ссылкам (извне).
     * Обычно сюда передадим результат useLinkHandler().
     * Если не передать — откроем внешним браузером.
     */
    linkHandler?: (url: string) => void;

    /** Отформатированная строка времени (если хочешь убрать зависимость от getSmartTime) */
    timeTextOverride?: string;
}

export const CommentItem: React.FC<CommentItemProps> = ({
    comment,
    onPressUser,
    linkHandler,
    timeTextOverride,
}) => {
    const { theme, typography, globalStyleSheet } = useTheme();
    const styles = getStyles({ theme });

    const handleOpenLink = (raw: string) => {
        if (linkHandler) return linkHandler(raw);
        // дефолт: открыть во внешнем браузере
        const url = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
        Linking.openURL(url).catch(() => { });
    };

    // 1) global-regex для split + 2) НЕ-global для проверки (или воспользуемся индексом)
    const splitReGlobal = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;

    const renderCommentWithLinks = (text: string) => {
        // При split с захватывающей группой совпадения попадают в массив,
        // поэтому все нечётные индексы — это ссылки.
        const parts = text.split(splitReGlobal);
        return (
            <Text style={[typography.body, styles.wrap]}>
                {parts.map((part, i) => {
                    const isLink = i % 2 === 1; // из-за capture group
                    if (!isLink) return <Text key={i}>{part}</Text>;
                    return (
                        <Text
                            key={i}
                            style={styles.linkText}
                            onPress={() => handleOpenLink(part)}
                        >
                            {part}
                        </Text>
                    );
                })}
            </Text>
        );
    };

    return (
        <View style={styles.container}>
            <View style={globalStyleSheet.flexRowCenterBetween}>
                <UserRow
                    size="xs"
                    avatarUri={comment.createdBy.avatarUrl}
                    userName={comment.createdBy?.fullName?.trim()}
                    onPress={() => onPressUser?.(comment.createdBy._id)}
                />
                <Text style={styles.timeText}>
                    {timeTextOverride ?? comment.createdAt}
                </Text>
            </View>
            <View style={styles.textContainer}>
                {renderCommentWithLinks(comment.text)}
            </View>
        </View>
    );
};

const getStyles = ({ theme }: { theme: ThemeType }) =>
    StyleSheet.create({
        container: {
            flexDirection: 'column',
            backgroundColor: theme.backgroundChatMessageLeft,
            marginVertical: 2,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
            maxWidth: '100%',
            // убедимся, что контейнер растягивается
            alignSelf: 'stretch',
        },
        textContainer: {
            marginTop: 8,
            // ❌ убираем flex:1, он может схлопывать блок в автосайзе
            // flex: 1,
            width: '100%',         // ✅ тексту есть ширина
        },
        wrap: {
            // на всякий случай
            maxWidth: '100%',
            width: '100%',
            color: theme.text,     // явный цвет, чтобы не зависеть от провайдера в сторис
        },
        linkText: {
            color: theme.primary,
            textDecorationLine: 'underline',
        },
        timeText: {
            fontSize: 11,
            color: theme.greyText,
            marginTop: 2,
            marginLeft: 8,
        },
    });

export default CommentItem;
