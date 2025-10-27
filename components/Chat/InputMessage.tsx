import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeType, useTheme } from '../../theme';

// Минимальный тип для изображения, чтобы не тянуть expo-image-picker типы
export type ImageAsset = { uri: string; width?: number; height?: number; fileName?: string; mimeType?: string };

interface InputMessageProps {
  value: string;
  onChange: (text: string) => void;
  // Отправка сообщения (возвращает true, если отправлено успешно)
  onSubmit: (images?: ImageAsset[]) => Promise<boolean>;
  
  // Reply/Edit
  replyToMessage?: { content?: string | null; attachments?: string[]; images?: string[] } | null;
  onCancelReply?: () => void;
  editMessage?: { content?: string | null } | null;
  onCancelEdit?: () => void;

  // Вложения
  maxImages?: number; // по умолчанию 1
  onAttachPress?: () => Promise<ImageAsset[] | void>; // родитель сам открывает пикер и вернёт выбранные
  onMaxImagesExceeded?: (max: number) => void;
  enableImageAttachment?: boolean;

  // Индикатор отправки (можно не передавать — тогда управляем внутри)
  sendingControlled?: boolean;
  isSending?: boolean;

  // События "печатает"
  onTyping?: () => void;
  onStopTyping?: () => void; // будет вызвано через ~2s тишины

  // Placeholder
  placeholder: string;
  editingLabel: string;
}

export const InputMessage: FC<InputMessageProps> = ({
  value,
  onChange,
  onSubmit,
  replyToMessage,
  onCancelReply,
  editMessage,
  onCancelEdit,

  maxImages = 1,
  onAttachPress,
  onMaxImagesExceeded,
  enableImageAttachment = true,

  sendingControlled,
  isSending: isSendingProp,

  onTyping,
  onStopTyping,

  placeholder,
  editingLabel,
}) => {
  const { theme, typography } = useTheme();
  const styles = getStyles(theme);

  const [inputHeight, setInputHeight] = useState<number>(0);
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [isSendingLocal, setIsSendingLocal] = useState(false);

  const isSending = sendingControlled ? !!isSendingProp : isSendingLocal;
  const attachmentsAllowed = enableImageAttachment;

  useEffect(() => {
    if (!attachmentsAllowed && images.length > 0) {
      setImages([]);
    }
  }, [attachmentsAllowed, images.length]);

  // Собственный дебаунс без lodash
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTyping = useCallback(() => {
    onTyping?.();
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    stopTimerRef.current = setTimeout(() => onStopTyping?.(), 2000);
  }, [onTyping, onStopTyping]);

  const handleAttachPress = useCallback(async () => {
    if (!attachmentsAllowed || !onAttachPress) return;
    const selected = (await onAttachPress()) || [];
    if (!selected.length) return;

    const next = [...images, ...selected];
    if (next.length > maxImages) {
      onMaxImagesExceeded?.(maxImages);
    }
    setImages(next.slice(0, maxImages));
  }, [onAttachPress, images, maxImages, onMaxImagesExceeded]);

  const handleSubmit = useCallback(async () => {
    if (!value.trim() && images.length === 0) return;
    setInputHeight(0);

    // Сразу гасим таймер «печатает»
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    onStopTyping?.();

    if (!sendingControlled) setIsSendingLocal(true);
    try {
      const ok = await onSubmit(images);
      if (ok) {
        setImages([]);
        onCancelReply?.();
      }
    } finally {
      if (!sendingControlled) setIsSendingLocal(false);
    }
  }, [value, images, onSubmit, onCancelReply, onStopTyping, sendingControlled]);

  return (
    <View>
      {/* Edit */}
      {editMessage && (
        <View style={[styles.replyContainer, { borderLeftColor: theme.primaryLight }]}>
          <Text style={styles.replyLabel}>{editingLabel}</Text>
          <View style={styles.replyContent}>
            <Text numberOfLines={1} style={styles.replyText}>
              {editMessage.content ?? ''}
            </Text>
            <TouchableOpacity onPress={onCancelEdit} style={{ top: -8 }}>
              <Ionicons name="close-outline" size={25} color={theme.greyText} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Reply */}
      {replyToMessage && (
        <View style={styles.replyContainer}>
          <View style={styles.replyContent}>
            {replyToMessage?.content?.trim() ? (
              <Text numberOfLines={1} style={styles.replyText}>
                {replyToMessage.content}
              </Text>
            ) : replyToMessage?.attachments?.[0] || replyToMessage?.images?.[0] ? (
              <Image
                source={{ uri: replyToMessage.attachments?.[0] || replyToMessage.images?.[0] }}
                style={styles.replyImage}
              />
            ) : (
              <Text numberOfLines={1} style={styles.replyText}>
                {replyToMessage?.content ?? ''}
              </Text>
            )}
            <TouchableOpacity onPress={onCancelReply} style={{ top: -8 }}>
              <Ionicons name="close-outline" size={25} color={theme.greyText} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Превью вложений */}
      {images.length > 0 && (
        <ScrollView horizontal style={styles.previewContainer} showsHorizontalScrollIndicator={false}>
          {images.map((img, idx) => (
            <View key={idx.toString()} style={styles.previewWrapper}>
              <Image source={{ uri: img.uri }} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.removeImage}
                onPress={() => setImages(images.filter((_, i) => i !== idx))}
              >
                <Ionicons name="close" size={16} color={theme.white} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Поле ввода + кнопки */}
      <View
        style={[
          styles.inputContainer,
          attachmentsAllowed ? styles.inputContainerWithAttach : styles.inputContainerWithoutAttach,
        ]}
      >
        <TextInput
          multiline
          placeholder={placeholder}
          placeholderTextColor={theme.placeholder}
          style={[
            typography.titleH6Regular,
            styles.input,
            { height: Math.max(40, Math.min(inputHeight, 100)) },
          ]}
          value={value}
          onChangeText={(text) => {
            onChange(text);
            startTyping();
          }}
          onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
        />

        {attachmentsAllowed && (
          <TouchableOpacity style={styles.attachButton} onPress={handleAttachPress}>
            <Ionicons name="image-outline" size={22} color={theme.primary} />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.sendButton} onPress={handleSubmit} disabled={isSending}>
          {isSending ? (
            <ActivityIndicator size="small" color={theme.primary} />
          ) : (
            <Ionicons name="send" size={22} color={theme.primary} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      padding: 4,
      backgroundColor: theme.white,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingRight: 45,
    },
    inputContainerWithAttach: {
      paddingLeft: 45,
    },
    inputContainerWithoutAttach: {
      paddingLeft: 12,
    },
    replyContainer: {
      backgroundColor: theme.background,
      padding: 6,
      borderLeftWidth: 3,
      borderLeftColor: theme.primary,
      borderRadius: 6,
    },
    replyLabel: {
      fontSize: 13,
      color: theme.primary,
    },
    replyContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    replyText: {
      flex: 1,
      color: theme.text,
      fontSize: 14,
    },
    replyImage: {
      width: 60,
      height: 60,
      borderRadius: 6,
      marginRight: 8,
    },
    input: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 4,
      borderColor: theme.white,
    },
    sendButton: {
      position: 'absolute',
      bottom: 9,
      right: 8,
      borderRadius: 4,
      justifyContent: 'center',
      paddingHorizontal: 6,
      paddingVertical: 5,
      marginLeft: 8,
    },
    attachButton: {
      position: 'absolute',
      bottom: 9,
      left: 8,
      borderRadius: 4,
      justifyContent: 'center',
      paddingHorizontal: 6,
      paddingVertical: 5,
      marginRight: 8,
    },
    previewContainer: {
      flexDirection: 'row',
      paddingHorizontal: 4,
      paddingVertical: 6,
    },
    previewWrapper: {
      marginRight: 8,
    },
    previewImage: {
      width: 60,
      height: 60,
      borderRadius: 6,
    },
    removeImage: {
      position: 'absolute',
      top: -6,
      right: -6,
      backgroundColor: theme.dark,
      borderRadius: 10,
      padding: 2,
    },
  });

export default InputMessage;
