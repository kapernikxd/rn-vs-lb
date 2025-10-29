import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeType, useTheme } from '../../theme';

export interface SettingsOptionItem {
  id: string;
  label: string;
  icon: React.ReactElement;
  onPress?: (id: string) => void;
}

export interface SettingsOptionListProps {
  items: SettingsOptionItem[];
  onItemPress?: (id: string) => void;
}

const SettingsOptionList: React.FC<SettingsOptionListProps> = ({ items, onItemPress }) => {
  const { theme, typography } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const handlePress = () => {
          item.onPress?.(item.id);
          onItemPress?.(item.id);
        };

        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            style={[styles.item, isLast && styles.itemLast]}
            onPress={handlePress}
          >
            <View style={styles.iconWrapper}>{item.icon}</View>
            <Text style={[typography.titleH6Regular, styles.label]}>{item.label}</Text>
            <MaterialIcons name="chevron-right" size={22} color={theme.placeholder} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      borderRadius: 20,
      backgroundColor: theme.card,
      overflow: 'hidden',
      width: '100%',
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.background,
    },
    itemLast: {
      borderBottomWidth: 0,
    },
    iconWrapper: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: theme.backgroundSecond,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      flex: 1,
      marginLeft: 16,
      color: theme.title,
    },
  });

export default SettingsOptionList;
