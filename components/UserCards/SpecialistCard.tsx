import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeType, useTheme } from '../../theme';

interface SpecialistCardProps {
  fullName: string;
  avatarUri: string;
  profession?: string;
  city?: string;
  country?: string;
  services?: any[];
  gallery?: string[];
  link: string;
  onPress: () => void;
  actionLabel: string;
}

const SpecialistCard: React.FC<SpecialistCardProps> = ({avatarUri, services, gallery, onPress, link, fullName, profession, city, country, actionLabel }) => {
  const { theme, typography } = useTheme() as any;
  const styles = getStyles(theme);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={[typography.titleH6, styles.name]}>{fullName}</Text>

          {!!profession && (
            <View style={styles.inlineRow}>
              <MaterialCommunityIcons name="briefcase-outline" size={14} color={theme.mutedText} />
              <Text numberOfLines={1} style={[typography.bodySm, styles.mutedText, { marginLeft: 6 }]}>
                {profession}
              </Text>
            </View>
          )}

          {(city || country) && (
            <View style={[styles.inlineRow, { marginTop: 2 }]}>
              <Ionicons name="location-outline" size={14} color={theme.mutedText} />
              <Text numberOfLines={1} style={[typography.bodySm, styles.mutedText, { marginLeft: 6 }]}>
                {city}{country ? `, ${country}` : ''}
              </Text>
            </View>
          )}
        </View>

        {/* More mini button */}
        <TouchableOpacity
          onPress={onPress}
          style={styles.bookBtn}
          activeOpacity={0.85}
        >
          <Text style={styles.bookText}>{actionLabel}</Text>
        </TouchableOpacity>
      </View>

      {/* Services chips — горизонтальный скролл */}
      {services && services?.length > 0 && (
        <FlatList
          data={services}
          keyExtractor={(svc, i) => svc._id ?? `${i}-${svc.name}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
          renderItem={({ item }) => (
            <View style={styles.chip}>
              <Text numberOfLines={1} style={styles.chipText}>
                {item.name}
                {item.price ? ` · ${item.price} ${item.currency || ''}` : ''}
              </Text>
            </View>
          )}
        />
      )}

      {/* Gallery — горизонтальный скролл со snap */}
      {gallery && gallery.length > 0 && (
        <FlatList
          data={gallery}
          keyExtractor={(uri, idx) => `${idx}-${uri}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 6, paddingRight: 2 }}
          renderItem={({ item }) => <Image source={{ uri: link + item }} style={styles.thumb} />}
          decelerationRate="fast"
          snapToAlignment="start"
          snapToInterval={styles.thumb.width + styles.thumb.marginRight} // 78 + 8 = 86
        />
      )}
    </View>
  );
};

export default SpecialistCard;

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.card,
      borderRadius: 14,
      padding: 12,
      marginHorizontal: 12,
      marginVertical: 8,
      // мягкая тень
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 4,
    },
    headerRow: { flexDirection: 'row', alignItems: 'center' },
    inlineRow: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 56, height: 56, borderRadius: 12, marginRight: 12, backgroundColor: theme.background },
    name: { color: theme.text },
    bookBtn: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: theme.primary, // твой #6f2da8 внутри theme
      borderRadius: 10,
      marginLeft: 8,
    },
    bookText: { color: theme.white, fontWeight: '700' },

    mutedText: { color: theme.text }, // было theme.text — лучше muted
    chipsRow: { paddingTop: 10, paddingRight: 2 }, // для FlatList contentContainerStyle
    chip: {
      backgroundColor: theme.background,
      borderRadius: 999,
      paddingVertical: 6,
      paddingHorizontal: 10,
      marginRight: 8,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.border,
      maxWidth: 220, // чтобы длинные названия не «ломали» карточку
    },
    chipText: { fontSize: 12, color: theme.text },
    thumb: {
      width: 78,
      height: 78,
      borderRadius: 10,
      marginRight: 8,
      backgroundColor: theme.background,
    },
  });
