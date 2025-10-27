import React from 'react';
import { View, Text, Image, ImageSourcePropType, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, ThemeType, GlobalStyleSheetType } from '../../theme';

export type HeroProps = {
  coverUrl: string;
  avatarUrl: string;
  fullName: string;
  profession?: string;
  addressLine?: string; // уже готовая строка (адрес либо "city, country")
  showOnMap?: boolean;
  onBack?: () => void;
  onShare?: () => void;
  onMessage?: () => void;
  onPressMap?: () => void;
  socials?: React.ReactNode; // сюда можно передать <SocialIconsRow .../>
  mapLabel: string;
};

const Hero: React.FC<HeroProps> = ({
  coverUrl,
  avatarUrl,
  fullName,
  profession,
  addressLine,
  showOnMap,
  onBack,
  onShare,
  onMessage,
  onPressMap,
  socials,
  mapLabel,
}) => {
  const { theme, globalStyleSheet, typography } = useTheme();
  const s = getStyles({ theme, globalStyleSheet });

  return (
    <View style={s.hero}>
      <Image source={{ uri: coverUrl }} style={s.heroImage} />

      <View style={s.heroTopLeftBtns}>
        <TouchableOpacity onPress={onBack} style={s.circleBtn}>
          <Ionicons name="arrow-back" size={20} color={theme.white} />
        </TouchableOpacity>
      </View>
      <View style={s.heroTopBtns}>
        <TouchableOpacity onPress={onShare} style={s.circleBtn}>
          <Ionicons name="share-social-outline" size={20} color={theme.white} />
        </TouchableOpacity>
      </View>

      <View style={s.heroCard}>
        <View style={globalStyleSheet.flexRowCenterBetween}>
          <View style={globalStyleSheet.flexRowCenterStart}>
            <Image source={{ uri: avatarUrl }} style={s.avatar} />
            <View>
              <Text style={typography.titleH6}>{fullName}</Text>
              {!!profession && <Text style={typography.titleH6Regular}>{profession}</Text>}
            </View>
          </View>

          <TouchableOpacity style={s.actionIcon} onPress={onMessage}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color={theme.white} />
          </TouchableOpacity>
        </View>

        {!!addressLine && <Text numberOfLines={1} style={s.subtitle}>{addressLine}</Text>}

        {showOnMap && (
          <TouchableOpacity style={[globalStyleSheet.flexRowCenterEnd, { marginTop: 6 }]} onPress={onPressMap} activeOpacity={0.8}>
            <Text style={{ color: theme.primary, fontWeight: '600' }}>{mapLabel}</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.primary} />
          </TouchableOpacity>
        )}

        {!!socials && <View style={{ marginTop: 10 }}>{socials}</View>}
      </View>
    </View>
  );
};

export default Hero;

const getStyles = ({ theme, globalStyleSheet }: { theme: ThemeType; globalStyleSheet: GlobalStyleSheetType }) =>
  StyleSheet.create({
    hero: { marginBottom: 56 },
    heroImage: { width: '100%', height: 260 },
    heroTopLeftBtns: { position: 'absolute', top: 14, left: 14, flexDirection: 'row', gap: 10 },
    heroTopBtns: { position: 'absolute', top: 14, right: 14, flexDirection: 'row', gap: 10 },
    circleBtn: {
      width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.35)',
    },
    heroCard: {
      position: 'absolute', left: 16, right: 16, bottom: -48,
      backgroundColor: theme.card, borderRadius: 16, padding: 12,
      shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 6,
    },
    avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 10, backgroundColor: theme.background },
    subtitle: { color: theme.text, marginTop: 8, paddingHorizontal: 6 },
    actionIcon: { backgroundColor: theme.primary, padding: 8, borderRadius: 20, marginHorizontal: 4 },
  });
