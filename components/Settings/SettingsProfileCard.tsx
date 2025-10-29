import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { ThemeType, useTheme } from '../../theme';

export interface SettingsProfileCardProps {
  name: string;
  phone: string;
  caption?: string;
  avatar?: ImageSourcePropType;
}

const FALLBACK_AVATAR = require('../../assets/icon.png');

const SettingsProfileCard: React.FC<SettingsProfileCardProps> = ({
  name,
  phone,
  caption,
  avatar,
}) => {
  const { theme, typography } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Image source={avatar ?? FALLBACK_AVATAR} style={styles.avatar} />
      <Text style={[typography.titleH5, styles.name]}>{name}</Text>
      <Text style={[typography.bodySm, styles.phone]}>{phone}</Text>
      {caption ? <Text style={[typography.bodyXs, styles.caption]}>{caption}</Text> : null}
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      width: '100%',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 12,
    },
    name: {
      color: theme.title,
    },
    phone: {
      marginTop: 4,
      color: theme.greyText,
    },
    caption: {
      marginTop: 2,
      color: theme.placeholder,
    },
  });

export default SettingsProfileCard;
