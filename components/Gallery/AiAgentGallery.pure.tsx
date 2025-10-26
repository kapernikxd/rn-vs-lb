import React, { memo, useMemo } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme, ThemeType, SizesType, TypographytType } from "../../theme";
import { GalleryModal } from "../Modals";

export type AiAgentGalleryViewProps = {
  isLoading: boolean;
  photos: string[];
  galleryColumns: number;
  galleryItemSize: number;

  visible: boolean;
  initialIndex: number;
  onOpenAt: (index: number) => void;
  onClose: () => void;

  emptyTest: string;
};

export const AiAgentGalleryView = memo(
  ({
    isLoading,
    photos,
    galleryColumns,
    galleryItemSize,
    visible,
    initialIndex,
    onOpenAt,
    onClose,
    emptyTest,
  }: AiAgentGalleryViewProps) => {
    const { theme, sizes, typography } = useTheme();
    const isDark = (theme as any)?.isDark ?? false;

    const styles = useMemo(() => getStyles(theme, sizes, typography, isDark), [
      theme,
      sizes,
      typography,
      isDark,
    ]);

    if (isLoading) {
      return (
        <View style={styles.galleryWrapper}>
          <ActivityIndicator />
        </View>
      );
    }

    if (!photos.length) {
      return (
        <View style={styles.galleryWrapper}>
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{emptyTest}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.galleryWrapper}>
        <View style={styles.galleryGrid}>
          {photos.map((photo, i) => {
            const isLastInRow = (i + 1) % galleryColumns === 0;
            return (
              <Pressable
                key={`${photo}-${i}`}
                onPress={() => onOpenAt(i)}
                android_ripple={{ color: "#00000022" }}
                style={[
                  styles.galleryImage,
                  isLastInRow && styles.galleryImageLast,
                  { width: galleryItemSize, height: galleryItemSize },
                ]}
              >
                <Image
                  source={{ uri: photo }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: styles.galleryImage.borderRadius,
                  }}
                />
              </Pressable>
            );
          })}
        </View>

        <GalleryModal
          visible={visible}
          images={photos}
          initialIndex={initialIndex}
          onRequestClose={onClose}
        />
      </View>
    );
  }
);

AiAgentGalleryView.displayName = "AiAgentGalleryView";

const getStyles = (
  theme: ThemeType,
  sizes: SizesType,
  typography: TypographytType,
  isDark: boolean
) =>
  StyleSheet.create({
    galleryWrapper: {
      paddingHorizontal: sizes.md as number,
      paddingVertical: sizes.xl as number,
    },
    galleryGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    galleryImage: {
      borderRadius: 18,
      backgroundColor: theme.backgroundSecond,
      marginRight: sizes.sm as number,
      marginBottom: sizes.sm as number,
    },
    galleryImageLast: {
      marginRight: 0,
    },
    emptyState: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: sizes.lg as number,
    },
    emptyText: {
      ...(typography.bodySm as object),
      color: theme.greyText,
      textAlign: "center",
    },
  });

export default AiAgentGalleryView;
