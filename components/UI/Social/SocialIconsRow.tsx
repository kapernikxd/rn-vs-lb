import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme, ThemeType } from '../../../theme';

export type SocialIconsRowProps = {
  onPressTg?: () => void;
  onPressInstagram?: () => void;
  onPressFacebook?: () => void;
  onPressVk?: () => void;
  visible?: {
    tg?: boolean;
    instagram?: boolean;
    facebook?: boolean;
    vk?: boolean;
  };
};

const SocialIconsRow: React.FC<SocialIconsRowProps> = ({ onPressTg, onPressInstagram, onPressFacebook, onPressVk, visible = {} }) => {
  const { theme } = useTheme();
  const s = getStyles(theme);

  return (
    <View style={s.row}>
      {visible.tg && (
        <TouchableOpacity style={s.icon} onPress={onPressTg}>
          <Ionicons name="paper-plane-outline" size={18} color={theme.text} />
        </TouchableOpacity>
      )}
      {visible.instagram && (
        <TouchableOpacity style={s.icon} onPress={onPressInstagram}>
          <Ionicons name="logo-instagram" size={18} color={theme.text} />
        </TouchableOpacity>
      )}
      {visible.facebook && (
        <TouchableOpacity style={s.icon} onPress={onPressFacebook}>
          <Ionicons name="logo-facebook" size={18} color={theme.text} />
        </TouchableOpacity>
      )}
      {visible.vk && (
        <TouchableOpacity style={s.icon} onPress={onPressVk}>
          <FontAwesome name="vk" size={18} color={theme.text} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SocialIconsRow;

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    row: { flexDirection: 'row', gap: 12 },
    icon: {
      width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center',
      backgroundColor: theme.background,
    },
  });
