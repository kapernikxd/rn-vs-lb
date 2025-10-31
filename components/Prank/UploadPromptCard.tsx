import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Spacer from '../UI/Spacer';
import { ThemeType, SizesType, useTheme } from '../../theme';

export interface UploadPromptCardProps {
  message?: string;
  onPress?: () => void;
  isUploading?: boolean;
  progress?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const UploadPromptCard: React.FC<UploadPromptCardProps> = ({
  message = 'Tap here to upload the photo you want to bring to life!',
  onPress,
  isUploading = false,
  progress,
  disabled = false,
  style,
  testID,
}) => {
  const { theme, sizes } = useTheme();
  const styles = React.useMemo(() => getStyles({ theme, sizes }), [theme, sizes]);

  const isDisabled = disabled || isUploading;

  const renderUploading = () => {
    const normalizedProgress =
      typeof progress === 'number'
        ? Math.min(1, Math.max(0, progress))
        : undefined;
    const percentage =
      normalizedProgress !== undefined
        ? Math.round(normalizedProgress * 100)
        : undefined;

    return (
      <>
        <ActivityIndicator color={theme.white} size="large" />
        <Spacer size="sm" />
        <Text style={styles.uploadingLabel}>
          {percentage !== undefined ? `Uploading ${percentage}%` : 'Uploading...'}
        </Text>
      </>
    );
  };

  const renderIdle = () => (
    <>
      <View style={styles.iconContainer}>
        <Ionicons name="image-outline" size={36} color={theme.white} />
      </View>
      <Spacer size="sm" />
      <Text style={styles.message} numberOfLines={3}>
        {message}
      </Text>
    </>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={isDisabled || !onPress}
      style={[styles.container, isDisabled && styles.disabled, style]}
      testID={testID}
    >
      {isUploading ? renderUploading() : renderIdle()}
    </TouchableOpacity>
  );
};

interface StyleParams {
  theme: ThemeType;
  sizes: SizesType;
}

const getStyles = ({ theme, sizes }: StyleParams) =>
  StyleSheet.create({
    container: {
      borderRadius: sizes.radius_lg,
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.12)',
      paddingHorizontal: sizes.lg,
      paddingVertical: sizes.xl,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 180,
    },
    disabled: {
      opacity: 0.6,
    },
    iconContainer: {
      width: 64,
      height: 64,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.08)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    message: {
      fontSize: sizes.font,
      lineHeight: 22,
      textAlign: 'center',
      color: 'rgba(255,255,255,0.85)',
      fontWeight: '500',
    },
    uploadingLabel: {
      fontSize: sizes.font,
      lineHeight: 22,
      color: 'rgba(255,255,255,0.85)',
      fontWeight: '500',
    },
  });

export default UploadPromptCard;
