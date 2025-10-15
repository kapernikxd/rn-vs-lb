// components/Chat/PinnedMessagesBar/PinnedChip.tsx
import React, { memo, useMemo, useRef } from 'react';
import { View, Text, Pressable, Animated, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../theme';
import { getStyles } from './styles';
import { PinnedChipProps } from './types';

const PinnedChipComponent: React.FC<PinnedChipProps> = ({
  item,
  index,
  total,
  onTap,
  onOpen,
  onUnpin,
  onMeasuredHeight,
  fixedHeight,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
  };

  const onLayout = (e: LayoutChangeEvent) => {
    if (!onMeasuredHeight) return;
    onMeasuredHeight(e.nativeEvent.layout.height);
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onTap}
        onLongPress={onOpen}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        android_ripple={{ color: theme.border }}
        onLayout={onMeasuredHeight ? onLayout : undefined}
        style={[styles.item, fixedHeight ? { height: fixedHeight } : null]}
        accessibilityRole="button"
        accessibilityLabel={`Pinned message ${index + 1} of ${total}`}
      >
        <View style={styles.itemLeftAccent} />

        <View style={styles.itemContent}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {item.content || 'Pinned message'}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={onOpen}
            style={styles.navBtn}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Open in chat"
          >
            <Ionicons name="open-outline" size={18} color={styles.unpinIcon.color as string} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onUnpin}
            style={styles.unpinButton}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Unpin"
          >
            <Ionicons name="close-circle" size={18} color={styles.unpinIcon.color as string} />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export const PinnedChip = memo(PinnedChipComponent);
