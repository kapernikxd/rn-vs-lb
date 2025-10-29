import React, { useMemo, useState, useEffect } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ThemeType, SizesType, TypographytType, useTheme } from "../../theme";
import { GalleryModal } from "../Modals";
import { ProfileMediaNavigationItem, ProfileMediaNavigationItemProps } from "./ProfileMediaNavigationItem";

type TabItem = Omit<ProfileMediaNavigationItemProps, "isActive" | "onPress"> & {
  key: string;
};

export type ProfileMediaGalleryProps = {
  tabs: TabItem[];
  activeTabKey?: string;
  onTabPress?: (tab: TabItem, index: number) => void;
  images: string[];
  extraInfoLabel?: string;
  extraInfoActionLabel?: string;
  onExtraInfoPress?: () => void;
  uploadButtonLabel?: string;
  showAllButtonLabel?: string;
  onUploadPress?: () => void;
  onShowAllPress?: () => void;
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=600&q=60",
];

export const ProfileMediaGallery: React.FC<ProfileMediaGalleryProps> = ({
  tabs = [],
  activeTabKey,
  onTabPress,
  images = [],
  extraInfoLabel = "+14 photo tags",
  extraInfoActionLabel = "View",
  onExtraInfoPress,
  uploadButtonLabel = "Upload photo",
  showAllButtonLabel = "Show all",
  onUploadPress,
  onShowAllPress,
}) => {
  const { theme, sizes, typography } = useTheme();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => getStyles(theme, sizes, typography), [theme, sizes, typography]);
  const [internalActiveKey, setInternalActiveKey] = useState<string>(
    activeTabKey ?? tabs[0]?.key ?? ""
  );

  useEffect(() => {
    if (activeTabKey) {
      setInternalActiveKey(activeTabKey);
    }
  }, [activeTabKey]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalInitialIndex, setModalInitialIndex] = useState(0);

  const displayImages = images.length ? images.slice(0, 6) : FALLBACK_IMAGES;

  const contentHorizontalPadding = (sizes.lg as number) * 2;
  const gutter = (sizes.xs as number) * 2;
  const imageSize = Math.max(
    72,
    Math.floor((width - contentHorizontalPadding - gutter * 2) / 3)
  );

  const handleTabPress = (tab: TabItem, index: number) => {
    if (!activeTabKey) {
      setInternalActiveKey(tab.key);
    }
    onTabPress?.(tab, index);
  };

  const handleOpenImage = (index: number) => {
    setModalInitialIndex(index);
    setModalVisible(true);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.navigationContainer}
      >
        {tabs.map((tab, index) => (
          <ProfileMediaNavigationItem
            key={tab.key}
            label={tab.label}
            iconName={tab.iconName}
            isActive={internalActiveKey === tab.key}
            onPress={() => handleTabPress(tab, index)}
          />
        ))}
      </ScrollView>

      <View style={styles.galleryContainer}>
        {displayImages.map((uri, index) => (
          <Pressable
            key={`${uri}-${index}`}
            onPress={() => handleOpenImage(index)}
            style={[styles.imageWrapper, { width: imageSize, height: imageSize }]}
            android_ripple={{ color: "#00000022" }}
          >
            <Image
              source={{ uri }}
              style={styles.image}
              resizeMode="cover"
            />
          </Pressable>
        ))}
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{extraInfoLabel}</Text>
        <Pressable onPress={onExtraInfoPress}>
          <Text style={styles.infoLink}>{extraInfoActionLabel}</Text>
        </Pressable>
      </View>

      <View style={styles.actionsRow}>
        <Pressable
          onPress={onUploadPress}
          style={[styles.actionButton, styles.primaryActionButton]}
        >
          <Text style={[styles.actionButtonText, styles.primaryActionButtonText]}>
            {uploadButtonLabel}
          </Text>
        </Pressable>
        <Pressable
          onPress={onShowAllPress}
          style={[styles.actionButton, styles.secondaryActionButton]}
        >
          <Text style={[styles.actionButtonText, styles.secondaryActionButtonText]}>
            {showAllButtonLabel}
          </Text>
        </Pressable>
      </View>

      <GalleryModal
        visible={modalVisible}
        images={displayImages}
        initialIndex={modalInitialIndex}
        onRequestClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const getStyles = (theme: ThemeType, sizes: SizesType, typography: TypographytType) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.card,
      borderRadius: sizes.radius_lg as number,
      paddingVertical: sizes.lg as number,
      paddingHorizontal: sizes.lg as number,
    },
    navigationContainer: {
      paddingBottom: sizes.sm as number,
    },
    galleryContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    imageWrapper: {
      borderRadius: sizes.radius_sm as number,
      overflow: "hidden",
      marginBottom: sizes.sm as number,
      backgroundColor: theme.backgroundSecond,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: sizes.xs as number,
      marginBottom: sizes.md as number,
    },
    infoLabel: {
      ...(typography.bodySm as object),
      color: theme.text,
      fontWeight: "500",
    },
    infoLink: {
      ...(typography.textLink as object),
      fontWeight: "600",
    },
    actionsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: sizes.xs as number,
    },
    actionButton: {
      flex: 1,
      borderRadius: sizes.radius_sm as number,
      paddingVertical: sizes.sm as number,
      alignItems: "center",
      justifyContent: "center",
    },
    primaryActionButton: {
      backgroundColor: theme.primary,
      marginRight: sizes.sm as number,
    },
    secondaryActionButton: {
      backgroundColor: theme.backgroundSecond,
      borderWidth: 1,
      borderColor: theme.border,
    },
    actionButtonText: {
      ...(typography.bodySm as object),
      fontWeight: "600",
    },
    primaryActionButtonText: {
      color: theme.white,
    },
    secondaryActionButtonText: {
      color: theme.text,
    },
  });

export default ProfileMediaGallery;
