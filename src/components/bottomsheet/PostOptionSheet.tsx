import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { COLORS } from "../../constants/theme";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ListItem } from '../listItem';

interface PostOptionSheetProps {
  sheetRef: React.RefObject<BottomSheetMethods>;
  onClose: () => void;
}

const PostOptionSheet: FC<PostOptionSheetProps> = ({ sheetRef, onClose }) => {

  const menuItems = [
    { icon: 'exclamation-circle', label: 'Manage VK ID', subLabel: 'Account protection recommendations' },
    { icon: 'bookmark', label: 'Bookmarks' },
    { icon: 'folder-o', label: 'Files' },
    { icon: 'money', label: 'VK Pay' },
    { icon: 'crosshairs', label: 'Ads' },
    { icon: 'support', label: 'Support' },
    { icon: 'cog', label: 'Settings' },
    { icon: 'plus-square', label: 'Add account' },
    { icon: 'sign-in', label: 'Sign in with QR code' },
  ];

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={['70%']}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      onClose={onClose}
      handleStyle={{ top: 0 }}
      handleIndicatorStyle={{ backgroundColor: COLORS.border, width: 92 }}
      backgroundStyle={{ backgroundColor: COLORS.card }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} onPress={onClose} />
      )}
    >
      <BottomSheetScrollView contentContainerStyle={styles.container}>
        {menuItems.map((item, index) => (
          <ListItem key={index} {...item} hideArrow hideBottomLine/>
        ))}
      </BottomSheetScrollView>

    </BottomSheet>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
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

export default PostOptionSheet;