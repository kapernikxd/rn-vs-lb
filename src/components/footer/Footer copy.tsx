// import React, { useState, useRef, useEffect } from 'react';
// import { View, TouchableOpacity, Image, Animated, StyleSheet } from 'react-native';
// import { COLORS, SIZES } from '../../constants/theme';
// import IconOcticons from 'react-native-vector-icons/Octicons';
// import IconIonicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// enum LbTypes {
//   OCTICONS = "Octicons",
//   IONICONS = "Ionicons",
//   MATERIALICONS = "MaterialIcons",
// }

// interface Tab {
//   name: string;
//   iconName: string;
//   size: number;
//   lb: LbTypes;
// }

// const tabs: Tab[] = [
//   { name: 'Search', iconName: "search", size: 22, lb: LbTypes.OCTICONS },
//   { name: 'Organizations', iconName: "organization", size: 22, lb: LbTypes.OCTICONS },
//   { name: 'Persons', iconName: "person-search", size: 29, lb: LbTypes.MATERIALICONS },
//   { name: 'Chat', iconName: "chatbubbles-sharp", size: 24, lb: LbTypes.IONICONS },
//   { name: 'Profile', iconName: "person", size: 23, lb: LbTypes.OCTICONS },
// ];

// const renderIcon = (tab: Tab) => {
//   switch (tab.lb) {
//     case LbTypes.OCTICONS:
//       return <IconOcticons name={tab.iconName} size={tab.size} color="#475A77" />;
//     case LbTypes.IONICONS:
//       return <IconIonicons name={tab.iconName} size={tab.size} color="#475A77" />;
//     case LbTypes.MATERIALICONS:
//       return <MaterialIcons name={tab.iconName} size={tab.size} color="#475A77" />;
//     default:
//       return null;
//   }
// };

// export const BottomTab: React.FC = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const tabWidth = SIZES.width;
//   const tabW = tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5;

//   const circlePosition = useRef(
//     new Animated.Value(tabWidth < SIZES.container ? tabWidth / 2.5 : SIZES.container / 2.5)
//   ).current;

//   useEffect(() => {
//     Animated.spring(circlePosition, {
//       toValue: activeTab * tabW,
//       useNativeDriver: true,
//     }).start();
//   }, [activeTab]);

//   const handleTabPress = (index: number) => {
//     setActiveTab(index);
//   };

//   return (
//     <View style={styles.tabContainer}>
//       <Animated.View
//         style={[
//           styles.circle,
//           {
//             width: tabW,
//             transform: [{ translateX: circlePosition }],
//           },
//         ]}
//       >
//         <View style={styles.circleInner} />
//       </Animated.View>
//       {tabs.map((tab, index) => (
//         <TouchableOpacity
//           key={index}
//           activeOpacity={0.8}
//           onPress={() => handleTabPress(index)}
//           style={styles.tabButton}
//         >
//           {renderIcon(tab)}
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   tabContainer: {
//     flexDirection: 'row',
//     height: 60,
//     backgroundColor: COLORS.card,
//     alignItems: 'center',
//   },
//   tabButton: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   circle: {
//     position: 'absolute',
//     height: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   circleInner: {
//     height: 40,
//     width: 40,
//     borderRadius: 20,
//     backgroundColor: COLORS.primary,
//     opacity: 0.15,
//   },
//   iconImage: {
//     width: 20,
//     height: 20,
//   },
//   profileImage: {
//     width: 34,
//     height: 34,
//     borderRadius: 50,
//   },
// });
