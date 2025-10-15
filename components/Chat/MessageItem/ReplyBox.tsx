// components/Chat/MessageItem/ReplyBox.tsx
import React, { FC, useMemo } from 'react';
import { Text, View, Image } from 'react-native';
import { ThemeType } from '../../../theme';
import { getStyles } from './styles';

interface ReplyBoxProps {
  theme: ThemeType;
  senderName?: string;
  content?: string | null;
  thumbUri?: string | null;
}

export const ReplyBox: FC<ReplyBoxProps> = ({ theme, senderName, content, thumbUri }) => {
  const styles = useMemo(() => getStyles({ theme }), [theme]);
  return (
    <View style={styles.replyBox}>
      {!!senderName && <Text style={styles.replySender}>{senderName}</Text>}
      {thumbUri ? <Image source={{ uri: thumbUri }} style={styles.messageImage} /> : null}
      {!!content && (
        <Text style={styles.replyText} numberOfLines={1}>
          {content}
        </Text>
      )}
    </View>
  );
};
