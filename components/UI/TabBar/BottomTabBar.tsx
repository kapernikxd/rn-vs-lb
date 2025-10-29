import React, { FC, memo, useMemo } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme, ThemeType } from '../../../theme';

export type BottomTabBarIconProps = {
  color: string;
  size: number;
};

export type BottomTabBarItem = {
  key: string;
  renderIcon: (props: BottomTabBarIconProps) => React.ReactNode;
  disabled?: boolean;
};

type BottomTabBarProps = {
  items: BottomTabBarItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  style?: StyleProp<ViewStyle>;
  activeColor?: string;
  inactiveColor?: string;
  indicatorColor?: string;
  indicatorWidth?: number;
  indicatorHeight?: number;
  iconSize?: number;
  pressableStyle?: StyleProp<ViewStyle>;
};

const BottomTabBar: FC<BottomTabBarProps> = memo(
  ({
    items,
    activeIndex,
    onChange,
    style,
    pressableStyle,
    activeColor,
    inactiveColor,
    indicatorColor,
    indicatorWidth = 32,
    indicatorHeight = 3,
    iconSize = 26,
  }) => {
    const { theme } = useTheme();
    const styles = useMemo(() => getStyles({ theme, indicatorHeight }), [theme, indicatorHeight]);

    const resolvedActiveColor = activeColor ?? theme.black;
    const resolvedInactiveColor = inactiveColor ?? theme.greyText;
    const resolvedIndicatorColor = indicatorColor ?? theme.black;

    return (
      <View style={[styles.container, style]} accessibilityRole="tablist">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const color = isActive ? resolvedActiveColor : resolvedInactiveColor;

          return (
            <Pressable
              key={item.key}
              onPress={() => onChange(index)}
              disabled={item.disabled}
              style={({ pressed }) => [
                styles.item,
                pressableStyle,
                item.disabled && styles.disabled,
                pressed && !item.disabled ? styles.pressed : null,
              ]}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive, disabled: !!item.disabled }}
            >
              <View style={styles.iconWrapper}>{item.renderIcon({ color, size: iconSize })}</View>
              <View
                style={[
                  styles.indicator,
                  {
                    backgroundColor: isActive ? resolvedIndicatorColor : 'transparent',
                    width: indicatorWidth,
                  },
                ]}
              />
            </Pressable>
          );
        })}
      </View>
    );
  },
);

BottomTabBar.displayName = 'BottomTabBar';

const getStyles = ({ theme, indicatorHeight }: { theme: ThemeType; indicatorHeight: number }) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingTop: 12,
      paddingBottom: 6,
      backgroundColor: theme.white,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    item: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 4,
    },
    iconWrapper: {
      height: 28,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    indicator: {
      height: indicatorHeight,
      borderRadius: indicatorHeight / 2,
      marginTop: 2,
    },
    pressed: {
      opacity: 0.7,
    },
    disabled: {
      opacity: 0.4,
    },
  });

export default BottomTabBar;
