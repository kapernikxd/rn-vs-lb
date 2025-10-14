import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ThemeType, useTheme } from '../../constants';

export interface TelegramFeedbackLinkProps {
  url: string;
  title?: string;
  description?: string;
  onOpenUrl?: (url: string) => Promise<void> | void;
}

const TelegramFeedbackLink: React.FC<TelegramFeedbackLinkProps> = ({
  url,
  title = 'Feedback & Bugs',
  description = 'Tap to write us in Telegram',
  onOpenUrl,
}) => {
  const { theme, typography } = useTheme();
  const styles = React.useMemo(() => getStyles({ theme }), [theme]);

  const handlePress = React.useCallback(async () => {
    try {
      if (onOpenUrl) {
        await onOpenUrl(url);
        return;
      }

      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.warn("Can't open Telegram URL", url);
      }
    } catch (error) {
      console.warn('Failed to open Telegram URL', error);
    }
  }, [onOpenUrl, url]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      accessibilityRole="link"
      accessibilityHint={description}
    >
      <FontAwesome name="telegram" size={26} color={theme.primaryLight} />
      <View style={styles.textContainer}>
        <Text style={[typography.titleH6, { color: theme.text }]}>{title}</Text>
        <Text style={typography.bodySm}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = ({ theme }: { theme: ThemeType }) =>
  StyleSheet.create({
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

export default TelegramFeedbackLink;
