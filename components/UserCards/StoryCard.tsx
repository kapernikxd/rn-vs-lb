import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Path } from 'react-native-svg';

type Props = {
  imageUri: string;
  title: string;
  description: string;
  authorName: string;
  authorAvatar?: string;
  handle?: string;
  views?: number | string;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function StoryCard({
  imageUri,
  title,
  description,
  authorName,
  authorAvatar,
  handle,
  views,
  onPress,
  style,
}: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.card, style]}>
      <ImageBackground
        source={{ uri: imageUri }}
        style={styles.bg}
        imageStyle={styles.bgImage}
        resizeMode="cover"
      >
        {/* SVG-градиент поверх изображения */}
        <Svg
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
          width="100%"
          height="100%"
        >
          <Defs>
            <LinearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="60%" stopColor="rgba(0,0,0,0)" />
              <Stop offset="100%" stopColor="rgba(0,0,0,0.8)" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#fade)" />
        </Svg>

        {/* контент снизу */}
        <View style={styles.bottom}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <Text style={styles.desc} numberOfLines={2}>
            {description}
          </Text>

          <View style={styles.footerRow}>
            <View style={styles.authorBox}>
              {authorAvatar ? (
                <Image source={{ uri: authorAvatar }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarFallback]} />
              )}
              <Text style={styles.author} numberOfLines={1}>
                {authorName}
              </Text>
            </View>

            <View style={{ flex: 1 }} />
            {handle ? (
              <Text style={styles.handle} numberOfLines={1}>
                {handle}
              </Text>
            ) : null}

            <View style={styles.viewsBox}>
              <EyeIcon size={16} />
              <Text style={styles.viewsText}>{formatViews(views)}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

function EyeIcon({ size = 16 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 5c5.23 0 9.27 3.11 10.94 6.86a1.5 1.5 0 0 1 0 1.28C21.27 16.89 17.23 20 12 20S2.73 16.89 1.06 13.14a1.5 1.5 0 0 1 0-1.28C2.73 8.11 6.77 5 12 5Zm0 2.5c-4.17 0-7.59 2.31-9.14 5.5 1.55 3.19 4.97 5.5 9.14 5.5s7.59-2.31 9.14-5.5c-1.55-3.19-4.97-5.5-9.14-5.5Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2.5a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 12 12.999Z"
        fill="rgba(255,255,255,0.9)"
      />
    </Svg>
  );
}

function formatViews(v?: number | string) {
  if (v == null) return '';
  const n = typeof v === 'string' ? Number(v) : v;
  if (!isFinite(n)) return String(v);
  if (n >= 10000) return `${Math.floor(n / 1000)}k`;
  return n.toLocaleString();
}

const RADIUS = 16;

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS,
    overflow: 'hidden',
    backgroundColor: '#1b1b1b',
    aspectRatio: 0.72,
  },
  bg: { flex: 1 },
  bgImage: { borderRadius: RADIUS },
  bottom: {
    marginTop: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 6,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    includeFontPadding: false,
  },
  desc: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 14,
    lineHeight: 18,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  authorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '45%',
    gap: 6,
  },
  avatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#333',
  },
  avatarFallback: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  author: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  handle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginRight: 8,
  },
  viewsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewsText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
  },
});
