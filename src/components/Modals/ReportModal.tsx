import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { ThemeType, useTheme } from '../../theme';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (reason: string, details: string) => void;
  type: "user" | "post";
};

const userReportReasons = [
  'Spam or scam',
  'Harassment or bullying',
  'Inappropriate content',
  'Fake profile',
  'Other',
];

const postReportReasons = [
  'Spam or misleading',
  'Hate speech or discrimination',
  'Violence or threats',
  'Sexually explicit content',
  'Harassment or bullying',
  'Other',
];

const ReportModal: React.FC<Props> = ({ visible, onClose, onSubmit, type }) => {
  const { theme } = useTheme();
  const styles = getStyles({ theme });

  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [details, setDetails] = useState('');

  const handleSend = () => {
    if (!selectedReason) return;
    onSubmit(selectedReason, details);
    setSelectedReason(null);
    setDetails('');
    onClose();
  };

  const reasons = type === "user" ? userReportReasons : postReportReasons

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Report User</Text>
          <ScrollView style={styles.reasonsContainer}>
            {reasons.map((reason) => (
              <TouchableOpacity
                key={reason}
                style={[
                  styles.reasonItem,
                  selectedReason === reason && styles.selected,
                ]}
                onPress={() => setSelectedReason(reason)}
              >
                <Text
                  style={[
                    styles.reasonText,
                    selectedReason === reason && styles.selectedText,
                  ]}
                >
                  {reason}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TextInput
            style={styles.input}
            placeholder="Additional details (optional)"
            placeholderTextColor="#888"
            value={details}
            onChangeText={setDetails}
            multiline
            textAlignVertical="top"
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.submitBtn,
                !selectedReason && { opacity: 0.5 },
              ]}
              disabled={!selectedReason}
              onPress={handleSend}
            >
              <Text style={styles.submitText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReportModal;

const getStyles = ({ theme }: { theme: ThemeType }) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    container: {
      width: '100%',
      backgroundColor: theme.card || '#fff',
      borderRadius: 12,
      padding: 20,
      elevation: 5,
      maxHeight: '85%',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
      color: theme.text,
    },
    reasonsContainer: {
      maxHeight: 180,
      marginBottom: 12,
    },
    reasonItem: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 8,
    },
    selected: {
      backgroundColor: theme.primary + '22',
      borderColor: theme.primary,
    },
    reasonText: {
      fontSize: 16,
      color: theme.text,
    },
    selectedText: {
      fontWeight: 'bold',
      color: theme.primary,
    },
    input: {
      height: 80,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      fontSize: 14,
      color: theme.text,
      marginBottom: 12,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cancelBtn: {
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    cancelText: {
      color: '#888',
      fontSize: 16,
    },
    submitBtn: {
      backgroundColor: theme.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    submitText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
