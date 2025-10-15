import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SizesType, useTheme, CommonStylesType } from '../../theme';
import Spacer from '../UI/Spacer';

interface EventCardProps {
  eventId: string;
  imageUri: string;
  title: string;
  description: string;
  /** Родитель сообщает, видим ли элемент сейчас */
  visible?: boolean;
  /** Однократно вызвать onView при первом появлении (по умолчанию true) */
  triggerOnce?: boolean;
  /** Колбэк, который нужно вызвать, когда элемент стал видимым */
  onView?: (eventId: string) => void;
}

const PlaceCard: React.FC<EventCardProps> = ({
  eventId,
  imageUri,
  title,
  description,
  visible = false,
  triggerOnce = true,
  onView,
}) => {
  const { sizes, commonStyles, typography } = useTheme();
  const styles = getStyles({ sizes, commonStyles });

  // чтобы при triggerOnce не вызывать onView повторно
  const firedRef = useRef(false);

  useEffect(() => {
    if (!onView) return;
    if (visible && (!triggerOnce || !firedRef.current)) {
      firedRef.current = true;
      onView(eventId);
    }
  }, [visible, triggerOnce, onView, eventId]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.content}>
        <Text style={typography.titleH4Regular} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Spacer size="xxs" />
        <Text style={typography.body} numberOfLines={3} ellipsizeMode="tail">
          {description}
        </Text>
      </View>
    </View>
  );
};

const getStyles = ({ sizes, commonStyles }: { sizes: SizesType; commonStyles: CommonStylesType }) =>
  StyleSheet.create({
    container: {
      ...commonStyles.card,
      ...commonStyles.shadow,
      padding: 0,
      borderRadius: 0,
      marginTop: sizes.xs,
      overflow: 'hidden',
    },
    imageContainer: {
      width: '100%',
      height: 270,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    content: {
      padding: sizes.sm,
    },
  });

export default PlaceCard;
