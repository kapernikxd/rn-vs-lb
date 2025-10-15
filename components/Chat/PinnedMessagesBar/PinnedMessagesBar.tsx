// components/Chat/PinnedMessagesBar/PinnedMessagesBar.tsx
import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Animated, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../theme';
import { getStyles } from './styles';
import { PinnedChip } from './PinnedChip';
import { PinnedModal } from './PinnedModal';
import { PinnedMessagesBarProps } from './types';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const PinnedMessagesBar: React.FC<PinnedMessagesBarProps> = ({
  pinnedMessages,
  onUnpin,
  onPress,
  isGroupChat,
  myId,
  lastReadMessageIdOpponent,
  fixedItemHeight,
  itemSpacing = 8,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const svRef = useRef<ScrollView | null>(null);
  const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);
  const measuredOnceRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState<any | null>(null);

  const openModal = useCallback((msg: any) => {
    setModalMessage(msg);
    setModalVisible(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalVisible(false);
    setModalMessage(null);
  }, []);

  const count = pinnedMessages?.length ?? 0;
  const hasMultiple = count > 1;

  useEffect(() => {
    if (count === 0) {
      setCurrentIndex(0);
      measuredOnceRef.current = false;
      setMeasuredHeight(null);
    }
  }, [count]);

  if (!count) return null;

  const itemH = fixedItemHeight ?? measuredHeight ?? 84;
  const pageH = itemH + (hasMultiple ? itemSpacing : 0);

  useEffect(() => {
    if (!count) return;
    if (currentIndex > count - 1) {
      setCurrentIndex(count - 1);
      requestAnimationFrame(() => {
        svRef.current?.scrollTo({ y: Math.max(0, (count - 1) * pageH), animated: false });
      });
    }
  }, [count, pageH, currentIndex]);

  const handleMeasure = useCallback(
    (h: number) => {
      if (fixedItemHeight) return;
      if (!measuredOnceRef.current && h > 0) {
        measuredOnceRef.current = true;
        setMeasuredHeight(h);
      }
    },
    [fixedItemHeight]
  );

  const goToIndex = useCallback(
    (index: number) => {
      const total = count;
      if (!total) return;
      const wrapped = ((index % total) + total) % total;
      svRef.current?.scrollTo?.({ y: wrapped * pageH, animated: true });
      setCurrentIndex(wrapped);
    },
    [count, pageH]
  );

  const goPrev = useCallback(() => { if (hasMultiple) goToIndex(currentIndex - 1); }, [currentIndex, hasMultiple, goToIndex]);
  const goNext = useCallback(() => { if (hasMultiple) goToIndex(currentIndex + 1); }, [currentIndex, hasMultiple, goToIndex]);

  const onMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;
      if (pageH > 0) {
        const idx = Math.round(y / pageH);
        if (idx !== currentIndex) setCurrentIndex(idx);
      }
    },
    [pageH, currentIndex]
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="pin" size={16} color={styles.headerIcon.color as string} />
        <Text style={styles.title}>Pinned messages</Text>

        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>
            {currentIndex + 1}/{count}
          </Text>
        </View>

        {hasMultiple && (
          <View style={styles.navButtons}>
            <TouchableOpacity
              onPress={goPrev}
              style={styles.navBtn}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Previous pinned message"
            >
              <Ionicons name="chevron-up" size={18} color={styles.unpinIcon.color as string} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goNext}
              style={styles.navBtn}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Next pinned message"
            >
              <Ionicons name="chevron-down" size={18} color={styles.unpinIcon.color as string} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Vertical pager */}
      <AnimatedScrollView
        ref={svRef}
        showsVerticalScrollIndicator={hasMultiple}
        style={{ height: pageH }}
        contentContainerStyle={styles.listContentVertical}
        pagingEnabled
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={pageH}
        nestedScrollEnabled
        scrollEnabled={hasMultiple}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {pinnedMessages.map((item, index) => (
          <View key={item._id} style={{ marginBottom: index < count - 1 ? itemSpacing : 0 }}>
            <PinnedChip
              index={index}
              total={count}
              item={item}
              onTap={() => openModal(item)}
              onOpen={() => onPress(item._id)}
              onUnpin={(e) => {
                // @ts-ignore
                e?.stopPropagation?.();
                onUnpin(item._id);
              }}
              onMeasuredHeight={index === 0 ? handleMeasure : undefined}
              fixedHeight={fixedItemHeight}
            />
          </View>
        ))}
      </AnimatedScrollView>

      {/* Modal with full message */}
      <PinnedModal
        visible={modalVisible}
        message={modalMessage}
        isGroupChat={isGroupChat}
        myId={myId}
        lastReadMessageIdOpponent={lastReadMessageIdOpponent || null}
        onClose={closeModal}
        onOpenInChat={(id) => onPress(id)}
      />
    </View>
  );
};

export default PinnedMessagesBar;
