// components/Chat/MessageItem/LinkyText.tsx
import React, { FC, useMemo } from 'react';
import { Text } from 'react-native';
import { ThemeType } from '../../../theme';
import { getStyles } from './styles';

interface LinkyTextProps {
  text: string;
  theme: ThemeType;
  onLinkPress?: (url: string) => void;
  onLongPress?: () => void;
}

export const LinkyText: FC<LinkyTextProps> = ({ text, theme, onLinkPress, onLongPress }) => {
  const styles = useMemo(() => getStyles({ theme }), [theme]);
  const LINK_RE = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  const parts = text.split(LINK_RE);

  const open = (raw: string) => {
    const url = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    onLinkPress?.(url);
  };

  return (
    <Text style={styles.messageText}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Text
            key={i}
            style={styles.linkText}
            onPress={() => open(part)}
            onLongPress={onLongPress}
            suppressHighlighting
          >
            {part}
          </Text>
        ) : (
          <Text key={i}>{part}</Text>
        )
      )}
    </Text>
  );
};
