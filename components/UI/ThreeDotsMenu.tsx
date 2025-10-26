import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  LayoutRectangle,
  ViewStyle,
  StyleProp
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeType, useTheme } from '../../theme';
import { IoniconsProps } from '../../types/Icon';

export type MenuItem = {
  label: string;
  icon?: IoniconsProps;
  colorIcon?: any;
  onPress: () => void;
};

type Props = {
  items: MenuItem[];
  style?: StyleProp<ViewStyle>;
  iconColor?: string;
  positionLeft?: number;
  positionTop?: number;
};

export const ThreeDotsMenu: React.FC<Props> = ({ items, style, iconColor, positionLeft, positionTop }) => {
  const { theme, typography, globalStyleSheet } = useTheme();

  const [menuVisible, setMenuVisible] = useState(false);

  const [position, setPosition] = useState<LayoutRectangle | null>(null);
  const buttonRef = useRef<View | null>(null);
  const styles = getStyles(theme);

  const openMenu = () => {
    buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setPosition({ x: pageX, y: pageY, width, height });
      setMenuVisible(true);
    });
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <View>
      <TouchableOpacity style={style} ref={buttonRef as any} onPress={openMenu}>
        <Ionicons name="ellipsis-vertical" size={22} color={iconColor ?? theme.primary} />
      </TouchableOpacity>

      <Modal transparent visible={menuVisible} animationType="fade" onRequestClose={closeMenu}>
        <Pressable style={styles.backdrop} onPress={closeMenu}>
          {position && (
            <View
              style={[
                styles.dropdown,
                {
                  top: position.y + position.height + (positionTop ?? 0),
                  left: position.x - (positionLeft ?? 160) + position.width, // подправь под себя
                },
              ]}
            >
              {items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.menuItem, globalStyleSheet.flexRowCenterStart]}
                  onPress={() => {
                    closeMenu();
                    item.onPress();
                  }}
                >
                  {item.icon && <Ionicons style={styles.icon} size={19} name={item.icon} color={item.colorIcon || theme.primary}/>}
                  <Text style={[typography.titleH6Regular, styles.label, item.colorIcon && {color: item.colorIcon}]}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Pressable>
      </Modal>
    </View>
  );
};

const getStyles = (theme: ThemeType) => StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: theme.white,
    borderRadius: 8,
    elevation: 5,
    shadowColor: theme.black,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    paddingVertical: 8,
    minWidth: 120,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderBottomColor: theme.border,
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 12,
  },
  label: {
    paddingRight: 12,
  }
});
