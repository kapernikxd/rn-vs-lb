// src/components/Profile/UserProfileTabs.tsx
import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme, ThemeType, GlobalStyleSheetType } from '../../../theme';
import TabButton from '../../UI/TabButton/TabButton';

export type UserProfileTab = 'events' | 'places';

type Props = {
  activeTab: UserProfileTab;
  onChangeTab: (tab: UserProfileTab) => void;
};

const UserProfileTabs: FC<Props> = ({ activeTab, onChangeTab }) => {
  const { theme, globalStyleSheet } = useTheme();
  const s = getStyles({ theme, globalStyleSheet });

  const idx = activeTab === 'events' ? 0 : 1;

  // размеры контейнера и ширина одной вкладки
  const widthRef = useRef(0);
  const tabW = useMemo(() => (widthRef.current > 0 ? widthRef.current / 2 : 0), []);

  // анимируем translateX индикатора
  const tx = useRef(new Animated.Value(idx)).current;

  useEffect(() => {
    Animated.timing(tx, { toValue: idx, duration: 180, useNativeDriver: true })
      .start();
  }, [idx, tx]);

  const onLayout = (e: LayoutChangeEvent) => {
    widthRef.current = e.nativeEvent.layout.width;
  };

  const translateX = tx.interpolate({
    inputRange: [0, 1],
    outputRange: [0, widthRef.current / 2 || 0],
  });

  return (
    <View style={[globalStyleSheet.container, { marginBottom: 8 }]} onLayout={onLayout}>
      <View style={s.row}>
        <TabButton
          label="Events"
          active={activeTab === 'events'}
          onPress={() => onChangeTab('events')}
          icon={<MaterialIcons name="event" size={18} color={activeColor(theme, activeTab === 'events')} />}
          // компактней, без лишних отступов
          style={s.tabBtnTight}
        />
        <TabButton
          label="Places"
          active={activeTab === 'places'}
          onPress={() => onChangeTab('places')}
          icon={<MaterialIcons name="business" size={18} color={activeColor(theme, activeTab === 'places')} />}
          style={s.tabBtnTight}
        />
      </View>

      {/* индикатор */}
      <View style={s.indicatorTrack} pointerEvents="none">
        <Animated.View
          style={[
            s.indicator,
            { transform: [{ translateX }] },
          ]}
        />
      </View>
    </View>
  );
};

function activeColor(theme: ThemeType, active: boolean) {
  return active ? theme.primary : theme.text;
}

export default UserProfileTabs;

const getStyles = ({ theme, globalStyleSheet }: { theme: ThemeType; globalStyleSheet: GlobalStyleSheetType }) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    tabBtnTight: {
      flex: 1,
      paddingHorizontal: 0, // уже равномерно делим пополам
      height: 48,
      borderBottomWidth: 0, // уберём бордер от TabButton — у нас свой индикатор
    },
    indicatorTrack: {
      position: 'relative',
      height: 2,
      marginTop: -2, // плотнее к кнопкам
      backgroundColor: 'transparent',
    },
    indicator: {
      position: 'absolute',
      left: 0,
      width: '50%',      // половина контейнера (2 вкладки)
      height: 2,
      backgroundColor: theme.primary,
      borderRadius: 1,
    },
  });
