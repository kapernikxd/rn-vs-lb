import React from 'react';
import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemeType, SizesType, useTheme } from '../../theme';

export interface HeroPrankCardProps {
  imageUri: string;
  title: string;
  description: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const HeroPrankCard: React.FC<HeroPrankCardProps> = ({
  imageUri,
  title,
  description,
  onPress,
  style,
  testID,
}) => {
  const { theme, sizes } = useTheme();
  const styles = React.useMemo(() => getStyles({ theme, sizes }), [theme, sizes]);

  const content = (
    <ImageBackground
      source={{ uri: imageUri }}
      style={styles.imageBackground}
      imageStyle={styles.image}
      accessibilityLabel={title}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.95)']}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </ImageBackground>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[styles.container, style]}
        testID={testID}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, style]} testID={testID}>
      {content}
    </View>
  );
};

interface StyleParams {
  theme: ThemeType;
  sizes: SizesType;
}

const getStyles = ({ theme, sizes }: StyleParams) =>
  StyleSheet.create({
    container: {
      borderRadius: sizes.radius_lg,
      overflow: 'hidden',
      backgroundColor: theme.black,
    },
    imageBackground: {
      height: 320,
      justifyContent: 'flex-end',
    },
    image: {
      borderRadius: sizes.radius_lg,
    },
    textContainer: {
      paddingHorizontal: sizes.lg,
      paddingVertical: sizes.xl,
    },
    title: {
      fontSize: sizes.h4,
      lineHeight: 30,
      fontWeight: '700',
      color: theme.white,
    },
    description: {
      marginTop: sizes.xs,
      fontSize: sizes.font,
      lineHeight: 22,
      color: 'rgba(255,255,255,0.82)',
    },
  });

export default HeroPrankCard;
