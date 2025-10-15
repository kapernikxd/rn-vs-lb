import React, { useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';

type InfoTooltipBaseProps = {
  content: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
};

export const InfoTooltipBase: React.FC<InfoTooltipBaseProps> = ({
  content,
  style,
  iconSize,
  iconName,
  iconColor,
}) => {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<TouchableOpacity | null>(null);
  const [triggerLayout, setTriggerLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [tooltipSize, setTooltipSize] = useState<{ width: number; height: number } | null>(null);
  const { theme } = useTheme();
  const size = iconSize ?? 20;

  const closeTooltip = () => {
    setVisible(false);
  };

  const openTooltip = () => {
    if (visible) {
      closeTooltip();
      return;
    }

    if (!triggerRef.current) {
      setVisible(true);
      return;
    }

    // measureInWindow gives us the absolute position on the screen so we can
    // correctly anchor the tooltip next to the trigger icon.
    triggerRef.current.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
      setVisible(true);
    });
  };

  const computedPosition = useMemo(() => {
    if (!triggerLayout) {
      return null;
    }

    const screen = Dimensions.get('window');
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const margin = 16;
    const defaultWidth = Math.min(screenWidth - margin * 2, 260);
    const measuredWidth = tooltipSize?.width ?? defaultWidth;
    const measuredHeight = tooltipSize?.height ?? 0;
    const triggerCenterX = triggerLayout.x + triggerLayout.width / 2;

    let left = triggerCenterX - measuredWidth / 2;
    left = Math.min(Math.max(left, margin), screenWidth - measuredWidth - margin);

    let top = triggerLayout.y - measuredHeight - 16;
    let placement: 'top' | 'bottom' = 'top';

    if (!tooltipSize || top < margin) {
      top = triggerLayout.y + triggerLayout.height + 16;
      placement = 'bottom';

      if (tooltipSize) {
        top = Math.min(top, screenHeight - measuredHeight - margin);
      }
    } else if (tooltipSize) {
      top = Math.max(top, margin);
    }

    const arrowCenter = triggerCenterX - left;
    const arrowOffset = Math.min(
      Math.max(arrowCenter, 18),
      measuredWidth - 18,
    );

    return {
      left,
      top,
      placement,
      arrowOffset,
      width: measuredWidth,
    };
  }, [tooltipSize, triggerLayout]);

  return (
    <>
      <TouchableOpacity
        ref={triggerRef}
        onPress={openTooltip}
        style={style}
        activeOpacity={0.7}
      >
        <Ionicons name={iconName} size={size} color={iconColor ?? theme.text} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={closeTooltip}
      >
        <View style={styles.modalRoot} pointerEvents="box-none">
          <Pressable
            style={[styles.backdrop, { backgroundColor: theme.backgroundSemiTransparent }]}
            onPress={closeTooltip}
          />

          {computedPosition && (
            <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
              <View
                pointerEvents="box-none"
                style={[
                  styles.tooltipContainer,
                  {
                    left: computedPosition.left,
                    top: computedPosition.top,
                    maxWidth: Dimensions.get('window').width - 32,
                  },
                ]}
              >
                {computedPosition.placement === 'bottom' && (
                  <View
                    style={[
                      styles.arrow,
                      styles.arrowUp,
                      {
                        left: computedPosition.arrowOffset - 8,
                        borderBottomColor: theme.card,
                      },
                    ]}
                  />
                )}

                <View
                  onLayout={({ nativeEvent }) => {
                    const { width, height } = nativeEvent.layout;
                    if (
                      tooltipSize?.width !== width ||
                      tooltipSize?.height !== height
                    ) {
                      setTooltipSize({ width, height });
                    }
                  }}
                  style={[
                    styles.tooltip,
                    {
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                      shadowColor: theme.black,
                    },
                  ]}
                >
                  <View style={styles.content}>{content}</View>
                </View>

                {computedPosition.placement === 'top' && (
                  <View
                    style={[
                      styles.arrow,
                      styles.arrowDown,
                      {
                        left: computedPosition.arrowOffset - 8,
                        borderTopColor: theme.card,
                      },
                    ]}
                  />
                )}
              </View>
            </View>
          )}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  tooltipContainer: {
    position: 'absolute',
    alignSelf: 'flex-start',
  },
  tooltip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 6,
  },
  content: {},
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  arrowUp: {
    top: -10,
    borderBottomWidth: 10,
  },
  arrowDown: {
    bottom: -10,
    borderTopWidth: 10,
  },
});
