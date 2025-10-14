import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';

type IconsPosition = 'space-between' | 'flex-start';

interface FooterProps {
  likes: number;
  views: number;
  position?: IconsPosition;
  hideBorder?: boolean;
}

const Footer: React.FC<FooterProps> = ({ likes, views, position = "space-between" }, hideBorder = false) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={[styles.container, { justifyContent: position }, hideBorder && styles.hideBorder]}>
      <TouchableOpacity onPress={handleLikePress} style={styles.item}>
        <Icon name={isLiked ? "heart" : "heart-outline"} size={20} color={isLiked ? COLORS.red: COLORS.greyText} />
        <Text style={styles.text}>{isLiked ? likes + 1 : likes} {likes + (isLiked ? 1 : 0) === 1 ? 'Like' : 'Likes'}</Text>
      </TouchableOpacity>
      <View style={styles.item}>
        <Icon name="eye-outline" size={20} color={COLORS.greyText} />
        <Text style={styles.text}>{views} Views</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SIZES.sm,
    gap: SIZES.md,
  },
  hideBorder: {
    borderTopWidth: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...FONTS.font,
    color: COLORS.greyText,
    marginLeft: SIZES.xxs,
  },
});

export default Footer;