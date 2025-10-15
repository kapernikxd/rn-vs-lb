import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { SizesType, ThemeType, useTheme } from '../../theme';

type IconsPosition = 'space-between' | 'flex-start';

interface SocialStatsProps {
  likes: number;
  views: number;
  position?: IconsPosition;
  hideBorder?: boolean;
  hasLike: boolean;
  onLike?: () => Promise<void>;
}

const SocialStatsEvent: React.FC<SocialStatsProps> = ({ likes, views, position = "space-between", onLike, hasLike }, hideBorder = true) => {
  const { globalStyleSheet, theme, sizes, typography } = useTheme();
  const styles = getStyles({ theme, sizes });
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(hasLike)
  }, [hasLike])

  const handleLikePress = async () => {
    if (onLike) {
      await onLike();
      setIsLiked(!isLiked);
    }
  };

  return (
    <View style={[styles.container, { justifyContent: position }, hideBorder && styles.hideBorder]}>
      <TouchableOpacity onPress={handleLikePress} style={globalStyleSheet.flexRowCenter}>
        <Icon name={isLiked ? "heart" : "heart-outline"} size={20} color={isLiked ? theme.danger : theme.placeholder} />
        <Text style={[typography.body, styles.text]}>{likes} {likes < 2 ? 'Like' : 'Likes'}</Text>
      </TouchableOpacity>
      <View style={globalStyleSheet.flexRowCenter}>
        <Icon name="eye-outline" size={20} color={theme.placeholder} />
        <Text style={[typography.body, styles.text]}>{views} Views</Text>
      </View>
    </View>
  );
};

const getStyles = ({ theme, sizes }: { theme: ThemeType, sizes: SizesType }) => StyleSheet.create({
   container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.border,
    paddingTop: sizes.sm,
    gap: sizes.md,
  },
  hideBorder: {
    borderTopWidth: 0,
  },
  text: {
    color: theme.placeholder,
    marginLeft: sizes.xxs,
  },
});

export default SocialStatsEvent;