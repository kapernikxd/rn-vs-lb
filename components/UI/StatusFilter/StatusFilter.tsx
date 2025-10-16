import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ThemeType, useTheme } from '../../../theme';

export type StatusOption = { key: string; label: string };

type StatusFilterProps = {
  selectedStatus: string;
  onChangeStatus: (status: string) => void;
  type?: 'default' | 'rounded';
  /** Список опций теперь приходит извне (обязательный проп) */
  options: StatusOption[];
};

const StatusFilter: FC<StatusFilterProps> = ({
  selectedStatus,
  onChangeStatus,
  type = 'default',
  options,
}) => {
  const { globalStyleSheet, theme } = useTheme();
  const styles = getStyles({ theme });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={[globalStyleSheet.flexRowCenterStart, styles.filterContainer]}>
        {options.map((opt) => {
          const isActive = selectedStatus === opt.key;
          return (
            <TouchableOpacity
              key={opt.key}
              onPress={() => onChangeStatus(opt.key)}
              style={[
                styles.filterButton,
                type === 'rounded' && styles.rounded,
                isActive && styles.activeFilter,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.filterText, isActive && styles.activeText]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const getStyles = ({ theme }: { theme: ThemeType }) =>
  StyleSheet.create({
    filterContainer: {
      gap: 3,
    },
    filterButton: {
      paddingVertical: 5,
      paddingHorizontal: 35,
      backgroundColor: theme.white,
      borderBottomWidth: 1,
      borderColor: theme.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rounded: {
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 30,
      paddingVertical: 8,
      marginBottom: 4,
      marginLeft: 5,
    },
    activeFilter: {
      borderColor: theme.primary,
    },
    filterText: {
      color: theme.greyText,
    },
    activeText: {
      color: theme.primary,
    },
  });

export default StatusFilter;
