import React, { memo, useMemo } from "react";
import { Image, Pressable, StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { GalleryModal } from "../Modals";
import { ThemeType, SizesType, useTheme } from "../../theme";

type BaseProps = {
  photos: string[];
  columns?: number;
  itemSize: number;
  gap?: number;
  visible: boolean;
  initialIndex: number;
  onOpenAt: (index: number) => void;
  onClose: () => void;
};

export type ProfileSelfiesGalleryViewProps = BaseProps & {
  style?: StyleProp<ViewStyle>;
};

export const ProfileSelfiesGalleryView = memo(
  ({
    photos,
    columns = 2,
    itemSize,
    gap,
    visible,
    initialIndex,
    onOpenAt,
    onClose,
    style,
  }: ProfileSelfiesGalleryViewProps) => {
    const { theme, sizes } = useTheme();
    const spacing = gap ?? ((sizes.sm as number) * 1.25);

    const styles = useMemo(() => getStyles(theme, sizes, spacing), [theme, sizes, spacing]);

    return (
      <View style={[styles.wrapper, style]}>
        <View style={styles.grid}>
          {photos.map((photo, index) => {
            const isLastInRow = (index + 1) % columns === 0;

            return (
              <Pressable
                key={`${photo}-${index}`}
                onPress={() => onOpenAt(index)}
                android_ripple={{ color: "#00000022" }}
                style={[
                  styles.imageWrapper,
                  { width: itemSize, height: itemSize, marginRight: isLastInRow ? 0 : spacing },
                ]}
              >
                <Image source={{ uri: photo }} style={styles.image} resizeMode="cover" />
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

ProfileSelfiesGalleryView.displayName = "ProfileSelfiesGalleryView";

const getStyles = (theme: ThemeType, sizes: SizesType, spacing: number) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.card,
      borderRadius: (sizes.radius_lg as number) + 4,
      padding: sizes.lg as number,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
    },
    imageWrapper: {
      borderRadius: (sizes.radius_lg as number) + 2,
      overflow: "hidden",
      marginBottom: spacing,
      backgroundColor: theme.backgroundSecond,
    },
    image: {
      width: "100%",
      height: "100%",
    },
  });

export default ProfileSelfiesGalleryView;
