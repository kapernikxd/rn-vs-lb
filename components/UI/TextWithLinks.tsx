import React, { FC } from 'react';
import { Text, TextProps, Linking, StyleProp, TextStyle } from 'react-native';

type OnLinkPress = (url: string) => void;

export interface TextWithLinksProps extends TextProps {
  text: string;
  /** Кастомный обработчик нажатия на ссылку */
  onLinkPress?: OnLinkPress;
  /** Стиль для кусков-ссылок (поверх стиля Text) */
  linkTextStyle?: StyleProp<TextStyle>;
  /** Автодобавление https:// для ссылок вида www.example.com */
  autoPrefixHttps?: boolean;
}

const LINK_RE = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;

const ensureUrl = (raw: string, autoPrefixHttps: boolean) =>
  autoPrefixHttps && /^www\./i.test(raw) ? `https://${raw}` : raw;

const defaultOpen = (url: string) => {
  Linking.openURL(url).catch(() => {});
};

const TextWithLinks: FC<TextWithLinksProps> = ({
  text,
  style,
  onLinkPress,
  linkTextStyle,
  autoPrefixHttps = true,
  ...props
}) => {
  const parts = (text ?? '').split(LINK_RE);

  return (
    <Text style={style} selectable {...props}>
      {parts.map((part, i) => {
        const isLink = i % 2 === 1; // из-за захватывающей группы
        if (!isLink) {
          return <Text key={i}>{part}</Text>;
        }
        const url = ensureUrl(part, autoPrefixHttps);
        return (
          <Text
            key={i}
            style={linkTextStyle}
            onPress={() => (onLinkPress ? onLinkPress(url) : defaultOpen(url))}
            selectable
          >
            {part}
          </Text>
        );
      })}
    </Text>
  );
};

export default TextWithLinks;
