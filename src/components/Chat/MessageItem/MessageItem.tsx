// components/Chat/MessageItem/MessageItem.tsx
import React, { FC, useMemo, useState } from 'react';
import { Text, View, Modal, TouchableOpacity, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../theme';
import { getStyles } from './styles';
import { MessageItemProps } from './types';
import { ReplyBox } from './ReplyBox';
import { ImagesStrip } from './ImagesStrip';
import { LinkyText } from './LinkyText';
import { LinkPreview } from '../../UI/LinkPreview';

export const MessageItem: FC<MessageItemProps> = ({
  item,
  myId,
  isGroupChat,
  isReadByOpponent,
  onLongPress,
  isSelected,
  timeText,
  senderNameOverride,
  linkHandler,
  linkPreview,
  linkPreviewLoading,
  onDownloadImage,
  onShareImage,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles({ theme }), [theme]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // виртуальная дата-секция
  if (item.dateLabel) {
    return (
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{item.dateLabel}</Text>
      </View>
    );
  }

  const isMyMessage = item.sender?._id === myId;
  const senderName = senderNameOverride ?? item.sender?.fullName ?? 'User';
  const messageImages =
    item.images?.length ? item.images : item.attachments?.length ? item.attachments : [];

  return (
    <>
      <Pressable onLongPress={onLongPress}>
        <View
          style={[
            styles.messageContainer,
            isMyMessage ? styles.messageRight : styles.messageLeft,
            isSelected && styles.selected,
          ]}
        >
          {/* Reply */}
          {item.replyTo?._id ? (
            <ReplyBox
              theme={theme}
              senderName={item.replyTo?.sender?.fullName ?? 'User'}
              content={item.replyTo?.content ?? undefined}
              thumbUri={item.replyTo?.attachments?.[0] || item.replyTo?.images?.[0] || null}
            />
          ) : null}

          {/* sender name (group) */}
          {!isMyMessage && isGroupChat ? <Text style={styles.sender}>{senderName}</Text> : null}

          {/* images */}
          <ImagesStrip
            uris={messageImages}
            theme={theme}
            onPressImage={(u) => setSelectedImage(u)}
            onLongPress={onLongPress}
          />

          {/* text with links */}
          {!!item.content && (
            <LinkyText text={item.content} theme={theme} onLinkPress={linkHandler} onLongPress={onLongPress} />
          )}

          {/* link preview */}
          {linkPreviewLoading ? <Text style={styles.loadingText}>Loading Preview...</Text> : null}
          {linkPreview ? (
            <LinkPreview
              url={linkPreview.url}
              title={linkPreview.title}
              description={linkPreview.description}
              image={linkPreview.image}
              linkHandler={linkHandler}
            />
          ) : null}

          {/* footer */}
          <View style={styles.messageFooter}>
            <Text style={styles.messageTime}>
              {timeText ?? item.createdAt}
              {item.isEdited ? ' • edited' : ''}
            </Text>
            {isMyMessage && !isGroupChat ? (
              <Ionicons
                name={isReadByOpponent ? 'checkmark-done-outline' : 'checkmark-outline'}
                size={18}
                color={isReadByOpponent ? theme.primary : theme.greyText}
                style={styles.readStatusIcon}
              />
            ) : null}
          </View>
        </View>
      </Pressable>

      {/* image modal */}
      {selectedImage && (
        <Modal transparent visible onRequestClose={() => setSelectedImage(null)}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setSelectedImage(null)}>
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>
            <Image source={{ uri: selectedImage }} style={styles.fullImage} />
            <View style={styles.modalButtons}>
              {onDownloadImage ? (
                <TouchableOpacity style={styles.modalButton} onPress={() => onDownloadImage(selectedImage)}>
                  <Text style={styles.modalButtonText}>Download</Text>
                </TouchableOpacity>
              ) : null}
              {onShareImage ? (
                <TouchableOpacity style={styles.modalButton} onPress={() => onShareImage(selectedImage)}>
                  <Text style={styles.modalButtonText}>Share</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default MessageItem;
