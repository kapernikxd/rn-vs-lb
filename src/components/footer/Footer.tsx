import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Image, Animated, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme/theme';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export enum LbTypes {
  OCTICONS = "Octicons",
  IONICONS = "Ionicons",
  MATERIALICONS = "MaterialIcons",
}

interface Tab {
  name: string;
  iconName: string;
  size: number;
  lb: LbTypes;
  route: string;
}

const renderIcon = (tab: Tab) => {
  switch (tab.lb) {
    case LbTypes.OCTICONS:
      return <IconOcticons name={tab.iconName} size={tab.size} color="#475A77" />;
    case LbTypes.IONICONS:
      return <IconIonicons name={tab.iconName} size={tab.size} color="#475A77" />;
    case LbTypes.MATERIALICONS:
      return <MaterialIcons name={tab.iconName} size={tab.size} color="#475A77" />;
    default:
      return null;
  }
};

type BottomTabProps = {
  tabs: Tab[];
  onPress: (route: string) => void;
  activeTabIndex: number;
}

export const BottomTab: React.FC<BottomTabProps> = ({ tabs, onPress, activeTabIndex }) => {
  const [activeTab, setActiveTab] = useState(activeTabIndex);

  useEffect(() => {
    setActiveTab(activeTabIndex);
  }, [activeTabIndex]);

  const tabWidth = SIZES.width;
  const tabW = tabWidth < SIZES.container ? tabWidth / tabs.length : SIZES.container / tabs.length;

  const circlePosition = useRef(
    new Animated.Value(tabWidth < SIZES.container ? tabWidth / 2.5 : SIZES.container / 2.5)
  ).current;

  useEffect(() => {
    Animated.spring(circlePosition, {
      toValue: activeTab * tabW,
      useNativeDriver: true,
    }).start();
  }, [activeTab]);

  return (
    <View style={styles.tabContainer}>
      <Animated.View
        style={[
          styles.circle,
          {
            width: tabW,
            transform: [{ translateX: circlePosition }],
          },
        ]}
      >
        <View style={styles.circleInner} />
      </Animated.View>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => {
            setActiveTab(index);
            onPress(tab.route);
          }}
          style={styles.tabButton}
        >
          {renderIcon(tab)}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: COLORS.card,
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInner: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    opacity: 0.15,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  profileImage: {
    width: 34,
    height: 34,
    borderRadius: 50,
  },
});
