import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../../constants/theme/theme";

interface ListItemProps {
  icon: any;
  label: string;
  subLabel?: string;
  hideBottomLine?: boolean;
  hideArrow? : boolean;
}

const ListItem: FC<ListItemProps> = ({ icon, label, subLabel,hideBottomLine, hideArrow = false }) => {
  return (
    <TouchableOpacity style={hideBottomLine ? styles.menuItemLast : styles.menuItem}>
      <View style={styles.iconContainer}>
        <FontAwesome name={icon} size={24} color={COLORS.primaryLight} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
      </View>
      {!hideArrow && <MaterialIcons name="chevron-right" size={24} color={COLORS.placeholder} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  menuItemLast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  subLabel: {
    fontSize: 12,
    color: COLORS.greyText,
  },
});

export default ListItem;
