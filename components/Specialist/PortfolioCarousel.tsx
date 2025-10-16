import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, ThemeType } from '../../theme';

export type PortfolioCarouselProps = {
  title?: string;
  images: string[];
  onPressImage?: (index: number, uri: string) => void;
};

const THUMB = { width: 140, height: 140, marginRight: 10 };

const PortfolioCarousel: React.FC<PortfolioCarouselProps> = ({ title = 'Photo portfolio', images, onPressImage }) => {
  const { theme } = useTheme();
  const s = getStyles(theme);

  if (!images?.length) return null;

  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>
        {title} <Text style={s.muted}>{images.length}</Text>
      </Text>

      <FlatList
        horizontal
        data={images}
        keyExtractor={(uri, idx) => `${idx}-${uri}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.list}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={s.item} onPress={() => onPressImage?.(index, item)}>
            <Image source={{ uri: item }} style={s.thumb} />
          </TouchableOpacity>
        )}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={THUMB.width + THUMB.marginRight}
      />
    </View>
  );
};

export default PortfolioCarousel;

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    section: { paddingHorizontal: 16, marginTop: 36 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: theme.black, marginBottom: 8 },
    muted: { color: theme.text, fontWeight: '400' },
    list: { paddingVertical: 6 },
    item: { marginRight: 10 },
    thumb: { width: THUMB.width, height: THUMB.height, borderRadius: 12, backgroundColor: theme.background },
  });
