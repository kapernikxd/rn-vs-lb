import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeType, useTheme } from '../../constants';
import Button from '../buttons/Button';

export interface DeleteAccountButtonProps {
  onDeleteAccount: () => Promise<void> | void;
  onSuccess?: (message: string) => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  title?: string;
  confirmTitle?: string;
  cancelTitle?: string;
  description?: string;
}

const DEFAULT_SUCCESS_MESSAGE =
  'Your request has been sent. Your account will be deleted within 24 hours.';

const DEFAULT_DESCRIPTION =
  'All your data, including profile, events, and chat history, will be permanently deleted. This process is irreversible and will be completed within 24 hours. Are you sure you want to proceed?';

const DeleteAccountButton: React.FC<DeleteAccountButtonProps> = ({
  onDeleteAccount,
  onSuccess,
  onError,
  successMessage = DEFAULT_SUCCESS_MESSAGE,
  title = 'Delete account',
  confirmTitle = 'Delete',
  cancelTitle = 'Cancel',
  description = DEFAULT_DESCRIPTION,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { theme, typography } = useTheme();
  const styles = React.useMemo(() => getStyles({ theme }), [theme]);

  const closeModal = () => {
    if (!loading) {
      setModalVisible(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      await onDeleteAccount();
      onSuccess?.(successMessage);
      setModalVisible(false);
    } catch (error) {
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setModalVisible(true)}
        accessibilityRole="button"
      >
        <Text style={[typography.titleH6, { color: theme.red }]}>{title}</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[typography.titleH5, styles.modalTitle]}>Confirm Deletion</Text>
            <View style={styles.descriptionWrapper}>
              <Text style={[typography.body, styles.descriptionText]}>{description}</Text>
            </View>
            <View style={styles.buttonRow}>
              <Button
                onPress={closeModal}
                style={styles.actionButton}
                type="gray-outline"
                title={cancelTitle}
                disabled={loading}
              />
              <Button
                onPress={handleDeleteAccount}
                type="report-outline"
                style={styles.actionButton}
                title={confirmTitle}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
      gap: 20,
    },
    modalTitle: {
      textAlign: 'center',
    },
    descriptionWrapper: {
      width: '100%',
    },
    descriptionText: {
      textAlign: 'center',
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 10,
      width: '100%',
    },
    actionButton: {
      flex: 1,
    },
  });

export default DeleteAccountButton;
