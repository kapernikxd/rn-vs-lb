import React from 'react';
import { Modal, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, ThemeType } from '../../theme';

const { width, height } = Dimensions.get('window');

export type GalleryModalProps = {
  visible: boolean;
  images: string[];
  initialIndex?: number;
  onRequestClose?: () => void;
  style?: ViewStyle;
};

const GalleryModal: React.FC<GalleryModalProps> = ({ visible, images, initialIndex = 0, onRequestClose, style }) => {
  const { theme } = useTheme();
  const s = getStyles(theme);

  return (
    <Modal visible={visible} transparent onRequestClose={onRequestClose}>
      <ScrollView
        horizontal
        pagingEnabled
        style={[s.container, style]}
        contentOffset={{ x: (initialIndex || 0) * width, y: 0 }}
        showsHorizontalScrollIndicator={false}
      >
        {images?.map((img, idx) => (
          <Image key={idx} source={{ uri: img }} style={s.image} />
        ))}
      </ScrollView>
      <TouchableOpacity style={s.close} onPress={onRequestClose} activeOpacity={0.8}>
        <Ionicons name="close" size={22} color={theme.white} />
      </TouchableOpacity>
    </Modal>
  );
};

export default GalleryModal;

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: { backgroundColor: 'rgba(0,0,0,0.95)' },
    image: { width, height, resizeMode: 'contain' },
    close: {
      position: 'absolute', top: 50, right: 18,
      width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  });
