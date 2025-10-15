import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { ThemeType, useTheme } from '../../theme';

interface Props {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  /** 
   * Внешний обработчик открытия ссылки.
   * Обычно передается функция из useLinkHandler(),
   * но можно не передавать — тогда сработает Linking.openURL().
   */
  linkHandler?: (url: string) => void;
}

export const LinkPreview: React.FC<Props> = ({ url, title, description, image, linkHandler }) => {
  const { theme } = useTheme();
  const styles = getStyles({ theme });

  const handlePress = () => {
    if (linkHandler) return linkHandler(url);
    const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    Linking.openURL(normalized).catch(() => {});
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
      <View style={styles.content}>
        {title ? (
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
        ) : null}
        {description ? (
          <Text numberOfLines={3} style={styles.description}>
            {description}
          </Text>
        ) : null}
        <Text numberOfLines={1} style={styles.url}>
          {url}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = ({ theme }: { theme: ThemeType }) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      overflow: 'hidden',
      marginTop: 4,
    },
    image: {
      width: 60,
      height: 60,
    },
    content: {
      flex: 1,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    title: {
      fontWeight: 'bold',
      color: theme.text,
    },
    description: {
      color: theme.greyText,
      fontSize: 12,
    },
    url: {
      color: theme.primary,
      fontSize: 12,
    },
  });
