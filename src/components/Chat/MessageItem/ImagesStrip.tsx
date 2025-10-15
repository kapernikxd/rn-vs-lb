// components/Chat/MessageItem/ImagesStrip.tsx
import React, { FC, useMemo } from 'react';
import { View, Image, Pressable } from 'react-native';
import { ThemeType } from '../../../theme';
import { getStyles } from './styles';

interface ImagesStripProps {
  uris: string[];
  onPressImage?: (uri: string) => void;
  onLongPress?: () => void;
  theme: ThemeType;
}

export const ImagesStrip: FC<ImagesStripProps> = ({ uris, onPressImage, onLongPress, theme }) => {
  const styles = useMemo(() => getStyles({ theme }), [theme]);
  if (!uris?.length) return null;
  return (
    <View style={styles.imagesContainer}>
      {uris.map((u, i) => (
        <Pressable key={`${u}-${i}`} onPress={() => onPressImage?.(u)} onLongPress={onLongPress}>
          <Image source={{ uri: u }} style={styles.messageImage} />
        </Pressable>
      ))}
    </View>
  );
};
