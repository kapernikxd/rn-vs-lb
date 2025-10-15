import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeType, useTheme } from '../../theme';
import Button from '../Button/Button';

interface Props {
  onAddPhoto: () => void;
  onClose: () => void;
}

const ProfilePhotoBanner: React.FC<Props> = ({ onAddPhoto, onClose }) => {
  const { theme, typography } = useTheme();
  const styles = getStyles({ theme });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[typography.body, styles.text]}>Upload a photo — it will help others recognize and trust you.</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>
      <Button title="Add Photo" onPress={onAddPhoto} />
    </View>
  );
};

const getStyles = ({ theme }: { theme: ThemeType }) =>
  StyleSheet.create({
    container: {
      padding: 12,
      backgroundColor: theme.backgroundLight,
      borderBottomWidth: 1,
      borderColor: theme.border,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    text: {
      flex: 1,
      marginRight: 8,
    },
    closeButton: {
      padding: 4,
    },
  });

export default ProfilePhotoBanner;
