// components/Chat/ChatItem.tsx
import React, { FC } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { getStyles } from './ChatItem.styles';

type BaseProps = {
  unread?: string;
  onPress?: () => void;
  createdAt?: string;
  lastMessage?: string;
};

/** PERSON */
type PersonProps = BaseProps & {
  variant: 'person';
  senderFullName: string;   // имя отправителя (для превью)
  imgUrl: string;           // аватар
  isUserOnline: boolean;    // статус онлайн
  chatName?: string;        // не обязателен
};

/** GROUP */
type GroupProps = BaseProps & {
  variant: 'group';
  chatName: string;         // имя чата
  senderFullName?: string;  // кто отправил последнее сообщение
  imgUrl: string;           // общий аватар группы
};

/** BOT */
type BotProps = BaseProps & {
  variant: 'bot';
  chatName: string;
};

export type ChatItemProps = PersonProps | GroupProps | BotProps;

export const ChatItem: FC<ChatItemProps> = (props) => {
  const { theme, typography } = useTheme();
  const styles = getStyles(theme);

  const handlePress = () => props.onPress?.();

  // Общий заголовок (верхняя строка) + бейдж непрочитанного
  const renderHeader = (title: string) => (
    <View style={styles.senderContainer}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={typography.titleH6}>
        {title}
      </Text>
      {props.unread ? <Text style={styles.unread}>+</Text> : null}
    </View>
  );

  // Превью последнего сообщения (нижний блок)
  const renderLastMessage = () => {
    if (!props.lastMessage) return null;

    if (props.variant === 'person') {
      return (
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.senderName}>
          {props.senderFullName}: <Text style={styles.senderMessage}>{props.lastMessage}</Text>
        </Text>
      );
    }

    if (props.variant === 'group' && props.senderFullName) {
      return (
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.senderName}>
          {props.senderFullName}: <Text style={styles.senderMessage}>{props.lastMessage}</Text>
        </Text>
      );
    }

    // bot или group без senderFullName
    return (
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.senderName}>
        {props.lastMessage}
      </Text>
    );
  };

  // Левая часть: аватар/иконка
  const renderAvatar = () => {
    if (props.variant === 'bot') {
      return <MaterialIcons name="smart-toy" size={60} color={theme.text} />;
    }

    // person | group — с картинкой
    const url = props.imgUrl;
    const avatar = <Image source={{ uri: url }} style={styles.avatar} />;

    if (props.variant === 'person') {
      // статус онлайн поверх аватара
      return (
        <View>
          {avatar}
          <View style={[styles.status, props.isUserOnline ? styles.online : styles.offline]} />
        </View>
      );
    }

    return avatar; // group
  };

  // Заголовок для каждой ветки
  const titleText =
    props.variant === 'person'
      ? props.senderFullName
      : props.variant === 'group'
      ? props.chatName
      : props.chatName; // bot

  return (
    <View style={styles.userContainer}>
      <TouchableOpacity onPress={handlePress} style={styles.profileSection}>
        {renderAvatar()}
        <View style={styles.userInfo}>
          {renderHeader(titleText)}

          <View style={styles.senderContainer}>{renderLastMessage()}</View>

          {props.lastMessage ? (
            <Text style={styles.timeAgo}>{props.createdAt}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatItem;
