// components/Chat/PinnedMessagesBar/PinnedModal.tsx
import React, { useMemo } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../theme';
import { getStyles } from './styles';
import { PinnedModalProps } from './types';
import { MessageItem } from '../MessageItem/MessageItem';

export const PinnedModal: React.FC<PinnedModalProps> = ({
  visible,
  message,
  isGroupChat,
  myId,
  lastReadMessageIdOpponent,
  onClose,
  onOpenInChat,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Pinned message</Text>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            >
              <Ionicons name="close" size={22} color={styles.modalTitle.color as string} />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator>
            {message ? (
              <MessageItem
                item={message}
                myId={myId}
                isGroupChat={isGroupChat}
                // вычисляем булево значение, ожидаемое MessageItem
                isReadByOpponent={
                  !!lastReadMessageIdOpponent &&
                  lastReadMessageIdOpponent === message._id
                }
              />
            ) : (
              <Text style={styles.modalActionText}>No message selected</Text>
            )}
          </ScrollView>

          {/* Footer */}
          <View style={styles.modalActions}>
            {message && (
              <TouchableOpacity
                onPress={() => {
                  onOpenInChat(message._id);
                  onClose();
                }}
                style={styles.modalActionBtn}
              >
                <Ionicons
                  name="open-outline"
                  size={18}
                  color={styles.modalActionText.color as string}
                />
                <Text style={styles.modalActionText}>Open in chat</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
