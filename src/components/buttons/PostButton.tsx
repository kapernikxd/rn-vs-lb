import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeType, useTheme } from '../../constants';

export interface PostButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconName?: string;
}

const PostButton: React.FC<PostButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  disabled,
  iconName = 'add-circle-outline',
  accessibilityLabel,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = React.useMemo(() => getStyles({ theme }), [theme]);

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      {...props}
    >
      <MaterialIcons name={iconName} size={20} color={theme.primaryLight} />
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const getStyles = ({ theme }: { theme: ThemeType }) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.backgroundThird,
      paddingVertical: 13,
      paddingHorizontal: 20,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 4,
    },
    buttonText: {
      color: theme.primaryLight,
      fontSize: 16,
      fontWeight: '500',
    },
    disabledButton: {
      opacity: 0.6,
    },
  });

export default PostButton;
