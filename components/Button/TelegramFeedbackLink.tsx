import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../theme';


export type TelegramFeedbackLinkProps = {
  link: string;
  title: string;
  subtitle: string;
  unsupportedLinkMessage: string;
}

export const TelegramFeedbackLink: React.FC<TelegramFeedbackLinkProps> = ({
  link,
  title,
  subtitle,
  unsupportedLinkMessage,
}) => {
  const { theme, typography } = useTheme();

  const handlePress = async () => {
    const supported = await Linking.canOpenURL(link);
    if (supported) {
      await Linking.openURL(link);
    } else {
      console.warn(unsupportedLinkMessage);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <FontAwesome name={'telegram'} size={26} color={theme.primaryLight} />
      <View style={styles.textContainer}>
        <Text style={[typography.titleH6, { color: theme.text }]}>{title}</Text>
        <Text style={typography.bodySm}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 8,
  },
  textContainer: {
    flex: 1,
  },
});
