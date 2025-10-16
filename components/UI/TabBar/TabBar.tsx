import React, { FC } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { GlobalStyleSheetType, SizesType, ThemeType, useTheme } from '../../../theme';

export type TabItem = {
  key: string;
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
};

type TabBarProps = {
  activeTabIndex: number;
  onChangeTab: (index: number) => void;
  /** Вкладки приходят извне */
  tabs: TabItem[];
  /** Опционально: стиль обёртки */
  style?: ViewStyle;
};

const TabBar: FC<TabBarProps> = ({ activeTabIndex, onChangeTab, tabs, style }) => {
  const { globalStyleSheet, theme, sizes } = useTheme();
  const styles = getStyles({ globalStyleSheet, theme, sizes });

  return (
    <View style={[styles.tabBarWrapper, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBarContainer}
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeTabIndex;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onChangeTab(index)}
              style={styles.tabButton}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <MaterialIcons
                name={tab.icon}
                size={22}
                color={isActive ? theme.primary : theme.greyText}
              />
              <Text style={[styles.tabLabel, { color: isActive ? theme.primary : theme.greyText }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const getStyles = ({ sizes, globalStyleSheet, theme }: { theme: ThemeType; sizes: SizesType; globalStyleSheet: GlobalStyleSheetType }) =>
  StyleSheet.create({
    tabBarWrapper: {
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      backgroundColor: theme.backgroundThird,
      ...globalStyleSheet.flexColumnCenter,
      height: 58,
    },
    tabBarContainer: {
      ...globalStyleSheet.flexRowCenterBetween,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    tabButton: {
      ...globalStyleSheet.flexRowCenterCenter,
      marginRight: 16,
      paddingVertical: 12,
      minWidth: 100,
    },
    tabLabel: {
      fontSize: 14,
      marginLeft: 6,
    },
  });

export default TabBar;
