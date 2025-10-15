import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeType, useTheme } from '../../theme';

interface PostButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const PostButton: React.FC<PostButtonProps> = ({ title, onPress, buttonStyle, textStyle }) => {
  const { theme } = useTheme();
  const styles = getStyles({ theme });

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <MaterialIcons name="add-circle-outline" size={20} color={theme.primaryLight} />
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const getStyles = ({ theme }: { theme: ThemeType }) => StyleSheet.create({
  button: {
    backgroundColor: theme.backgroundThird, // light grey background
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: 'center',
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: theme.primaryLight,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default PostButton;
