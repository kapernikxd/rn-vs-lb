import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PostButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const PostButton: React.FC<PostButtonProps> = ({ title, onPress, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Icon name="add-circle-outline" size={20} color="#007AFF" />
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f2f2f2', // light grey background
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
    color: '#007AFF', // iOS blue color
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default PostButton;
