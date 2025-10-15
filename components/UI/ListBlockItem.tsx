import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ThemeType, useTheme } from '../../theme';

interface ListItemProps {
  icon: any;
  label: string;
  hideBottomLine?: boolean;
  hideArrow?: boolean;
  action: () => void;
  report?: boolean;
  big?: boolean;
}

const ListBlockItem: FC<ListItemProps & { fullWidth?: boolean }> = ({
  icon,
  label,
  hideBottomLine,
  hideArrow = false,
  action,
  report,
  big,
  fullWidth,
}) => {
  const { globalStyleSheet, theme, typography } = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      onPress={action}
      style={[
        globalStyleSheet.flexRowCenterCenter,
        styles.menuItem,
        big && styles.menuItemBig,
        hideBottomLine && styles.menuItemLast && globalStyleSheet.flexRowCenter,
        fullWidth ? styles.fullWidth : styles.halfWidth,
        report && { borderColor: theme.danger }
      ]}
    >
      <View style={[styles.iconContainer]}>
        <FontAwesome name={icon} size={big ? 22 : 18} color={report ? theme.danger : theme.text} />
      </View>
      <View style={[styles.textContainer, big && styles.textContainerBig]}>
        <Text style={[typography.titleH6Regular, styles.label, report && { color: theme.danger }, big && styles.labelBig && typography.titleH5Regular]}>{label}</Text>
      </View>
      {!hideArrow && <MaterialIcons name="chevron-right" size={big ? 26 : 22} color={theme.placeholder} />}
    </TouchableOpacity>
  );
};

const getStyles = (theme: ThemeType) => StyleSheet.create({
  menuItem: {
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: theme.text,
    borderRadius: 4,
    gap: 2,
  },
  menuItemBig: {
    marginTop: 2,
  },
  menuItemLast: {
    paddingVertical: 8,
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
  },
  textContainer: {
    paddingLeft: 2,
  },
  textContainerBig: {
    paddingLeft: 8,
  },
  label: {
  },
  labelBig: {
    color: "inherit",
  },
  halfWidth: {
    width: '49%',
    marginBottom: 8,
  },
  fullWidth: {
    width: '100%',
  },
});

export default ListBlockItem;
