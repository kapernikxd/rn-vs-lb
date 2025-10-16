import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  TouchableOpacityProps,
  StyleProp,
  View,
} from 'react-native';
import { ThemeType, useTheme } from '../../theme';

export interface MyButtonProps extends TouchableOpacityProps {
  title?: string; // ← стал необязательным для icon-only
  type?: 'primary' | 'gray' | 'primary-outline' | 'gray-outline' | 'report-outline';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;

  /** Иконки */
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Отступ между иконкой и текстом */
  iconGap?: number;
}

const Button: React.FC<MyButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  style,
  textStyle,
  loading = false,
  leftIcon,
  rightIcon,
  iconGap = 8,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = getStyles({ theme });

  const isIconOnly = !title && (leftIcon || rightIcon);

  const buttonStyles = [
    styles.button,
    type === 'primary' && styles.primaryButton,
    type === 'gray' && styles.grayButton,
    type === 'primary-outline' && styles.primaryOutlineButton,
    type === 'gray-outline' && styles.grayOutlineButton,
    type === 'report-outline' && styles.reportOutlineButton,
    isIconOnly && styles.iconOnlyButton,
    style,
    (loading || props.disabled) && styles.disabledButton,
  ];

  const textStyles = [
    styles.buttonText,
    type === 'primary' && styles.primaryButtonText,
    type === 'gray' && styles.grayButtonText,
    type === 'primary-outline' && styles.primaryOutlineButtonText,
    type === 'gray-outline' && styles.grayOutlineButtonText,
    type === 'report-outline' && styles.reportOutlineButtonText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={loading ? undefined : onPress}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={type.includes('outline') ? theme.primary : theme.white} />
      ) : isIconOnly ? (
        // Только иконка
        leftIcon ? <View pointerEvents="none">{leftIcon}</View> : <View pointerEvents="none">{rightIcon}</View>
      ) : (
        // Иконка + текст (или просто текст)
        <View style={[styles.contentRow, { columnGap: iconGap }]}>
          {leftIcon ? <View pointerEvents="none">{leftIcon}</View> : null}
          {title ? <Text style={textStyles}>{title}</Text> : null}
          {rightIcon ? <View pointerEvents="none">{rightIcon}</View> : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

const getStyles = ({ theme }: { theme: ThemeType }) =>
  StyleSheet.create({
    button: {
      minHeight: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      paddingHorizontal: 16,
      width: '100%',
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Варианты
    primaryButton: { backgroundColor: theme.primary },
    primaryOutlineButton: {
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.primary,
    },
    grayButton: { backgroundColor: theme.backgroundBtn },
    grayOutlineButton: {
      backgroundColor: theme.backgroundBtn,
      borderColor: theme.border,
      borderWidth: 1,
    },
    reportOutlineButton: {
      borderColor: theme.red,
      borderWidth: 1,
      backgroundColor: theme.white,
    },

    // Текст
    buttonText: { fontSize: 16, fontWeight: '500' },
    primaryButtonText: { color: 'white' },
    primaryOutlineButtonText: { color: theme.primary },
    grayButtonText: { color: theme.greyBtnText },
    grayOutlineButtonText: { color: theme.greyBtnText },
    reportOutlineButtonText: { color: theme.red },

    // Состояния
    disabledButton: { opacity: 0.7 },

    // Icon-only
    iconOnlyButton: {
      width: 50,
      minHeight: 50,
      paddingHorizontal: 0,
    },
  });

export default Button;
