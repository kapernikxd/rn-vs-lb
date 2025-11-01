import React, { memo, useMemo } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "../Button";
import Spacer from "../UI/Spacer";
import { useTheme, ThemeType, SizesType, TypographytType } from "../../theme";

type AiAgentHeroCardProps = {
  avatarUri: string;
  displayName: string;
  profession?: string;
  categories?: string[];
  followButtonTitle: string;
  onToggleFollow: () => void;
  isFollowUpdating: boolean;
  disableFollowAction: boolean;
  onStartChat: () => void;
  isChatLoading: boolean;
  aiBotId?: string;
  isFollowing: boolean;
  onAvatarPress?: () => void;
};

const AiAgentHeroCardComponent = ({
  avatarUri,
  displayName,
  profession,
  categories,
  followButtonTitle,
  onToggleFollow,
  isFollowUpdating,
  disableFollowAction,
  onStartChat,
  isChatLoading,
  aiBotId,
  isFollowing,
  onAvatarPress,
}: AiAgentHeroCardProps) => {
  const { theme, sizes, typography, isDark } = useTheme();
  const styles = useMemo(
    () => getStyles({ theme, sizes, typography, isDark }),
    [theme, sizes, typography, isDark],
  );

  const formattedCategories = useMemo(
    () => (categories ?? []).filter((item): item is string => Boolean(item?.trim().length)),
    [categories],
  );

  const isChatDisabled = !aiBotId || isChatLoading;

  return (
    <View style={styles.heroCard}>
      <View style={styles.heroTopRow}>
        <TouchableOpacity
          onPress={onAvatarPress}
          activeOpacity={0.8}
          disabled={!onAvatarPress}
        >
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        </TouchableOpacity>

        <View style={styles.heroInfo}>
          <View style={styles.badge}>
            <Ionicons name="shield-checkmark-outline" size={16} color={theme.primary} />
            <Text style={styles.badgeText}>AI-агент</Text>
          </View>

          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {displayName}
          </Text>

          {profession ? (
            <Text style={styles.profession} numberOfLines={2} ellipsizeMode="tail">
              {profession}
            </Text>
          ) : null}
        </View>
      </View>

      {formattedCategories.length ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsContainer}
        >
          {formattedCategories.map((item, index) => (
            <View key={`${item}-${index}`} style={styles.tag}>
              <Text style={styles.tagText}>{item}</Text>
            </View>
          ))}
        </ScrollView>
      ) : null}

      <Spacer size="xs" />

      <View style={styles.buttonsRow}>
        <View style={styles.buttonWrapper}>
          <Button
            leftIcon={(
              <Ionicons
                name={isFollowing ? "person-remove-outline" : "person-add-outline"}
                size={18}
                color={isFollowing ? theme.greyBtnText : theme.white}
              />
            )}
            title={followButtonTitle}
            onPress={onToggleFollow}
            loading={isFollowUpdating}
            disabled={disableFollowAction}
            type={isFollowing ? "gray-outline" : "primary"}
            style={styles.followButton}
          />
        </View>

        <View style={[styles.buttonWrapper, styles.buttonWrapperLast]}>
          <Button
            leftIcon={(
              <Ionicons name="chatbubble-ellipses-outline" size={18} color={theme.primary} />
            )}
            title="Перейти к чату"
            onPress={onStartChat}
            loading={isChatLoading}
            type="primary-outline"
            disabled={isChatDisabled}
            style={styles.chatButton}
          />
        </View>
      </View>
    </View>
  );
};

const AiAgentHeroCard = memo(AiAgentHeroCardComponent);

AiAgentHeroCard.displayName = "AiAgentHeroCard";

const getStyles = ({
  theme,
  sizes,
  typography,
  isDark,
}: {
  theme: ThemeType;
  sizes: SizesType;
  typography: TypographytType;
  isDark: boolean;
}) =>
  StyleSheet.create({
    heroCard: {
      borderRadius: 28,
      padding: sizes.xs as number,
      backgroundColor: isDark ? theme.background : theme.card,
      shadowColor: "#000",
      shadowOpacity: isDark ? 0.25 : 0.1,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 6,
      borderWidth: 1,
      borderColor: theme.border,
    },
    heroTopRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 94,
      height: 94,
      borderRadius: 26,
      marginRight: sizes.md as number,
      backgroundColor: theme.backgroundSecond,
    },
    heroInfo: {
      flex: 1,
    },
    badge: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      borderRadius: 999,
      paddingHorizontal: sizes.sm as number,
      paddingVertical: 6,
      backgroundColor: isDark ? "rgba(255,255,255,0.08)" : theme.backgroundSecond,
      marginBottom: sizes.xs as number,
    },
    badgeText: {
      marginLeft: 6,
      color: theme.primary,
      fontSize: 12,
      fontWeight: "600",
      letterSpacing: 0.3,
      textTransform: "uppercase",
    },
    name: {
      ...(typography.titleH4 as object),
      color: theme.title,
      marginBottom: 4,
    },
    profession: {
      ...(typography.body as object),
      color: theme.greyText,
    },
    tagsContainer: {
      flexDirection: "row",
      paddingVertical: sizes.xs as number,
    },
    tag: {
      paddingHorizontal: sizes.md as number,
      paddingVertical: 8,
      borderRadius: 16,
      backgroundColor: isDark ? "rgba(255,255,255,0.08)" : theme.backgroundSecond,
      marginRight: sizes.sm as number,
    },
    tagText: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.title,
    },
    buttonsRow: {
      flexDirection: "column",
    },
    buttonWrapper: {
      flex: 1,
      marginBottom: 8,
    },
    buttonWrapperLast: {
      marginBottom: 0,
    },
    followButton: {
      borderRadius: 16,
      minHeight: 42,
    },
    chatButton: {
      borderRadius: 16,
      minHeight: 42,
    },
});

export type { AiAgentHeroCardProps };
export { AiAgentHeroCard };
export default AiAgentHeroCard;
