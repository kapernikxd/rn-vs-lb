import React, { FC, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Spacer from '../UI/Spacer';
import Button from './Button';
import { ThemeType, useTheme } from '../../theme';

export type DeleteAccountButtonProps = {
  deleteAccount: () => Promise<void>;
}

export const DeleteAccountButton: FC<DeleteAccountButtonProps> = ({ deleteAccount }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme, typography } = useTheme();
  const styles = getStyles({ theme });

  const handleDeleteAccount = async () => {
    deleteAccount()
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => setModalVisible(true)}>
        <Text style={[typography.titleH6, { color: theme.red }]}>Delete account</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={typography.titleH5}>Confirm Deletion</Text>
            <Spacer size="xxs" />
            <Text style={[typography.body, { textAlign: "center" }]}>
              All your data, including profile, events, and chat history, will be permanently deleted.
              This process is irreversible and will be completed within 24 hours.
              Are you sure you want to proceed?
            </Text>
            <Spacer size="lg" />
            <View style={styles.buttonRow}>
              <Button onPress={() => setModalVisible(false)} style={styles.cancelButton} type="gray-outline" title="Cancel" />
              <Button onPress={handleDeleteAccount} type="report-outline" style={styles.confirmButton} title="Delete" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = ({ theme }: { theme: ThemeType }) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    deleteButton: {
      paddingVertical: 6,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.backgroundSemiTransparent,
      justifyContent: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: theme.white,
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 10,
    },
    confirmButton: {
      width: '50%',
    },
    cancelButton: {
      width: '50%',
    },
  });
