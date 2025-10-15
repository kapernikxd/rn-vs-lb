import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ThemeType, useTheme } from '../../theme';

interface ListItemProps {
  icon: any;
  label: string;
  subLabel?: string;
  hideBottomLine?: boolean;
  hideArrow?: boolean;
  action: () => void;
  report?: boolean;
  big?: boolean;
  iconColor?: string;
}

const ListItem: FC<ListItemProps> = ({ icon, label, subLabel, hideBottomLine, hideArrow = false, action, report, big }) => {
  const { globalStyleSheet, theme, typography } = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity onPress={action} style={[hideBottomLine ? { ...styles.menuItemLast, ...globalStyleSheet.flexRowCenter } : styles.menuItem, globalStyleSheet.flexRowCenter, big && styles.menuItemBig]}>
      <View style={[styles.iconContainer]}>
        <FontAwesome name={icon} size={big ? 22 : 18} color={report ? theme.red : theme.text} />
      </View>
      <View style={globalStyleSheet.flex1}>
        <Text style={[typography.titleH6Regular, report && { color: theme.red }, big && styles.labelBig]}>{label}</Text>
        {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
      </View>
      {!hideArrow && <MaterialIcons name="chevron-right" size={big ? 26 : 22} color={theme.placeholder} />}
    </TouchableOpacity>
  );
};

const getStyles = (theme: ThemeType) => StyleSheet.create({
  menuItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.background,
  },
  menuItemBig: {
    marginTop: 2,
  },
  menuItemLast: {
    paddingVertical: 6,
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  label: {
  },
  labelBig: {
    fontSize: 18,
  },
  subLabel: {
    fontSize: 12,
    color: theme.greyText,
  },
});

export default ListItem;
