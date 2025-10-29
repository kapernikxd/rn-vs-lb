import React, { memo, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeType, SizesType, TypographytType, useTheme } from "../../theme";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

export type ProfileMediaNavigationItemProps = {
  label: string;
  iconName?: IconName;
  isActive?: boolean;
  onPress?: () => void;
};

export const ProfileMediaNavigationItem = memo(
  ({ label, iconName = "photo", isActive = false, onPress }: ProfileMediaNavigationItemProps) => {
    const { theme, sizes, typography } = useTheme();

    const styles = useMemo(() => getStyles(theme, sizes, typography), [theme, sizes, typography]);

    return (
      <Pressable
        onPress={onPress}
        style={[styles.container, isActive ? styles.containerActive : styles.containerInactive]}
        accessibilityRole="button"
        accessibilityState={{ selected: isActive }}
      >
        {iconName ? (
          <View style={styles.iconWrapper}>
            <MaterialIcons
              name={iconName}
              size={20}
              color={isActive ? theme.primary : theme.greyText}
            />
          </View>
        ) : null}
        <Text style={[styles.label, { color: isActive ? theme.primary : theme.greyText }]}>{label}</Text>
      </Pressable>
    );
  }
);

ProfileMediaNavigationItem.displayName = "ProfileMediaNavigationItem";

const getStyles = (theme: ThemeType, sizes: SizesType, typography: TypographytType) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: sizes.radius_sm as number,
      paddingHorizontal: sizes.md as number,
      paddingVertical: sizes.xs as number,
      marginRight: sizes.sm as number,
      borderWidth: 1,
    },
    containerActive: {
      backgroundColor: theme.white,
      borderColor: theme.primary,
    },
    containerInactive: {
      backgroundColor: theme.backgroundSecond,
      borderColor: theme.border,
    },
    iconWrapper: {
      marginRight: sizes.xs as number,
    },
    label: {
      ...(typography.bodySm as object),
      fontWeight: "500",
    },
  });

export default ProfileMediaNavigationItem;
