import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { ThemeType, useTheme } from '../../constants';

export interface MyButtonProps extends TouchableOpacityProps {
  title: string;
  type?: 'primary' | 'gray' | 'primary-outline' | 'gray-outline' | 'report-outline';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
}

const Button: React.FC<MyButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  style,
  textStyle,
  loading = false,
  disabled,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = React.useMemo(() => getStyles({ theme }), [theme]);

  const buttonStyles = [
    styles.button,
    type === 'primary' && styles.primaryButton,
    type === 'gray' && styles.grayButton,
    type === 'primary-outline' && styles.primaryOutlineButton,
    type === 'gray-outline' && styles.grayOutlineButton,
    type === 'report-outline' && styles.reportOutlineButton,
    style,
    (disabled || loading) && styles.disabledButton,
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

  const activityIndicatorColor = type.includes('outline') ? theme.primary : theme.white;

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={loading ? undefined : onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={activityIndicatorColor} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const getStyles = ({ theme }: { theme: ThemeType }) =>
  StyleSheet.create({
    button: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      paddingHorizontal: 16,
      width: '100%',
      flexDirection: 'row',
      gap: 8,
    },
    primaryButton: {
      backgroundColor: theme.primary,
    },
    primaryOutlineButton: {
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.primary,
    },
    grayButton: {
      backgroundColor: theme.backgroundBtn,
    },
    grayOutlineButton: {
      backgroundColor: theme.backgroundBtn,
      borderColor: theme.border,
      borderWidth: 1,
    },
    reportOutlineButton: {
      backgroundColor: theme.white,
      borderColor: theme.red,
      borderWidth: 1,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
    },
    primaryButtonText: {
      color: theme.white,
    },
    primaryOutlineButtonText: {
      color: theme.primary,
    },
    grayButtonText: {
      color: theme.greyBtnText,
    },
    grayOutlineButtonText: {
      color: theme.greyBtnText,
    },
    reportOutlineButtonText: {
      color: theme.red,
    },
    disabledButton: {
      opacity: 0.7,
    },
  });

export default Button;
