import React, { memo, useCallback, useMemo } from "react";
import {
  FlatList,
  ImageBackground,
  ImageSourcePropType,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { SizesType, ThemeType, useTheme } from "../../theme";

export type HorizontalCard = {
  id?: string | number;
  title: string;
  image: ImageSourcePropType;
};

export interface HorizontalCardSectionProps {
  title: string;
  cards: HorizontalCard[];
  onPressSeeAll?: () => void;
  onPressCard?: (card: HorizontalCard, index: number) => void;
  seeAllLabel?: string;
  /**
   * Force dark styles regardless of the theme. Useful for previewing in storybook.
   */
  isDark?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const CARD_WIDTH = 152;
const CARD_HEIGHT = 230;

const HorizontalCardSectionComponent: React.FC<HorizontalCardSectionProps> = ({
  title,
  cards,
  onPressSeeAll,
  onPressCard,
  seeAllLabel = "See All",
  isDark,
  style,
  contentContainerStyle,
}) => {
  const { theme, typography, sizes, isDark: themeIsDark } = useTheme();
  const resolvedIsDark = isDark ?? themeIsDark;

  const styles = useMemo(
    () => getStyles({ theme, sizes, isDark: resolvedIsDark }),
    [resolvedIsDark, sizes, theme],
  );

  const gradientColors = useMemo(
    () => ["rgba(0,0,0,0)", resolvedIsDark ? "rgba(7,12,31,0.85)" : "rgba(0,0,0,0.75)"],
    [resolvedIsDark],
  );

  const handleCardPress = useCallback(
    (card: HorizontalCard, index: number) => () => {
      if (onPressCard) {
        onPressCard(card, index);
      }
    },
    [onPressCard],
  );

  const renderCard = useCallback(
    ({ item, index }: ListRenderItemInfo<HorizontalCard>) => (
      <TouchableOpacity
        accessibilityLabel={item.title}
        accessibilityRole={onPressCard ? "button" : undefined}
        activeOpacity={0.85}
        disabled={!onPressCard}
        onPress={handleCardPress(item, index)}
        style={styles.cardWrapper}
      >
        <ImageBackground source={item.image} style={styles.card} imageStyle={styles.cardImage}>
          <LinearGradient colors={gradientColors} style={styles.gradient} />
          <Text style={[typography.titleH6, styles.cardTitle]} numberOfLines={2}>
            {item.title}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    ),
    [gradientColors, handleCardPress, onPressCard, styles, typography.titleH6],
  );

  const keyExtractor = useCallback(
    (item: HorizontalCard, index: number) => `${item.id ?? index}`,
    [],
  );

  const listFooter = useMemo(
    () => (cards.length > 0 ? <View style={styles.footerSpacer} /> : null),
    [cards.length, styles.footerSpacer],
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={[typography.titleH4, styles.title]} numberOfLines={1}>
          {title}
        </Text>

        {onPressSeeAll ? (
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.7}
            onPress={onPressSeeAll}
            style={styles.seeAllButton}
          >
            <Text style={[typography.bodySm, styles.seeAllText]}>{seeAllLabel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        horizontal
        data={cards}
        keyExtractor={keyExtractor}
        renderItem={renderCard}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, contentContainerStyle]}
        ListFooterComponent={listFooter}
      />
    </View>
  );
};

const getStyles = ({
  theme,
  sizes,
  isDark,
}: {
  theme: ThemeType;
  sizes: SizesType;
  isDark: boolean;
}) =>
  StyleSheet.create({
    container: {
      gap: sizes.md,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: sizes.xs,
    },
    title: {
      color: theme.title,
    },
    seeAllButton: {
      paddingVertical: sizes.xs,
      paddingHorizontal: sizes.sm,
      borderRadius: sizes.radius_sm,
    },
    seeAllText: {
      color: isDark ? theme.white : theme.primary,
      fontWeight: "500",
    },
    listContent: {
      paddingHorizontal: sizes.xs,
    },
    cardWrapper: {
      marginRight: sizes.md,
    },
    card: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: sizes.radius_lg,
      overflow: "hidden",
      justifyContent: "flex-end",
      backgroundColor: theme.background,
    },
    cardImage: {
      borderRadius: sizes.radius_lg,
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
    },
    cardTitle: {
      color: theme.white,
      paddingHorizontal: sizes.sm,
      paddingBottom: sizes.sm,
    },
    footerSpacer: {
      width: sizes.md,
    },
  });

export const HorizontalCardSection = memo(HorizontalCardSectionComponent);

export default HorizontalCardSection;
