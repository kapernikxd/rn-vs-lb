import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyleSheetType, SizesType, ThemeType, useTheme, CommonStylesType } from '../../theme';

type ChatUser = {
  _id: string;
  userName?: string;
  avatarUrl?: string;
};

interface HeaderProps {
  imgUrl: string;
  title: string;
  onImgPress: () => void;
  onActionPress?: () => void;
  onBackPress: () => void;
  isGroupChat: boolean;
  users: ChatUser[];

  /** эти поля заменяют mobx-store */
  isOnline?: boolean;
  isTyping?: boolean;
  typingUserName?: string;
}

const HeaderWithImg: React.FC<HeaderProps> = ({
  imgUrl,
  title,
  onImgPress,
  onActionPress,
  onBackPress,
  isGroupChat,
  users,
  isOnline = false,
  isTyping = false,
  typingUserName,
}) => {
  const { globalStyleSheet, theme, sizes, commonStyles, typography } = useTheme();
  const styles = useMemo(
    () => getStyles({ globalStyleSheet, theme, sizes, commonStyles }),
    [globalStyleSheet, theme, sizes, commonStyles],
  );

  const singleUser = users?.[0];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} accessibilityRole="button" accessibilityLabel="Back">
        <Ionicons name="arrow-back" size={24} color={theme.text} />
      </TouchableOpacity>

      <View style={styles.title}>
        <View style={globalStyleSheet.flexRowCenterBetween}>
          <TouchableOpacity
            style={globalStyleSheet.flexRowCenter}
            onPress={onImgPress}
            accessibilityRole="imagebutton"
            accessibilityLabel="Open chat image"
            activeOpacity={0.8}
          >
            <Image source={{ uri: imgUrl }} style={styles.photo} />

            <View style={{ flex: 1, maxWidth: '70%' }}>
              <Text style={typography.titleH6} numberOfLines={1} ellipsizeMode="tail">
                {title}
              </Text>

              {/* отображение статусов */}
              {!isGroupChat ? (
                isTyping ? (
                  <Text style={[typography.body, styles.subtitleItalic]}>typing…</Text>
                ) : (
                  <View style={styles.statusRow}>
                    <Text style={[typography.body, styles.subtitleItalic]}>
                      {isOnline ? 'Online' : 'Offline'}
                    </Text>
                    <View
                      style={[styles.statusDot, isOnline ? styles.online : styles.offline]}
                      accessibilityLabel={isOnline ? 'online' : 'offline'}
                    />
                  </View>
                )
              ) : typingUserName ? (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[typography.body, styles.subtitleItalic]}
                >
                  {typingUserName}: typing…
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>

          <View style={globalStyleSheet.flexRowCenter}>
            {onActionPress ? (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={onActionPress}
                accessibilityRole="button"
                accessibilityLabel="More actions"
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="ellipsis-horizontal-sharp" size={20} color={theme.primary} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

const getStyles = ({
  theme,
  sizes,
  globalStyleSheet,
  commonStyles,
}: {
  commonStyles: CommonStylesType;
  theme: ThemeType;
  sizes: SizesType;
  globalStyleSheet: GlobalStyleSheetType;
}) =>
  StyleSheet.create({
    container: {
      ...globalStyleSheet.flexRowCenter,
      backgroundColor: theme.backgroundThird,
      paddingVertical: sizes.md,
      paddingHorizontal: sizes.xs,
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
    },
    title: {
      flex: 1,
      marginLeft: 18,
    },
    photo: {
      ...commonStyles.avatarSm,
      marginRight: sizes.sm,
    },
    actionButton: {
      marginLeft: 6,
      paddingHorizontal: 14,
      paddingVertical: 5,
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    subtitleItalic: {
      fontStyle: 'italic',
      color: theme.text,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 10,
      top: -1,
    },
    online: {
      backgroundColor: theme.success,
    },
    offline: {
      backgroundColor: theme.danger,
    },
  });

export default HeaderWithImg;
