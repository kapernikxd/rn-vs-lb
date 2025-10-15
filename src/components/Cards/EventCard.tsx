import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Organizer from '../UserCards/Organazer';
import Spacer from '../UI/Spacer';
import { SizesType, ThemeType, useTheme, CommonStylesType } from '../../theme';
import SocialStatsEvent from '../UI/Social/SocialStatsEvent';

interface EventCardProps {
  eventId: string;
  imageUri: string;
  date: string | null;
  title: string;
  description: string;
  organizerAvatarUri: string;
  organizerName: string;
  onPress: () => void;
  likes: number;
  views: number;
  onView: (eventId: string) => void;
  onLike?: () => Promise<void>;
  hasLike: boolean;
  isUserParticipantInPost: boolean;
  participantsCount: number;
  maxParticipants?: number;
  categories?: string[];
  price?: string;

  /** Новое: видимость карточки сообщает родитель (FlatList/ScrollView и т.д.) */
  visible?: boolean;
  /** Новое: вызвать onView только один раз при первом появлении (true по умолчанию) */
  triggerOnce?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  eventId,
  imageUri,
  date,
  title,
  description,
  organizerAvatarUri,
  organizerName,
  onPress,
  likes,
  views,
  onView,
  onLike,
  hasLike,
  isUserParticipantInPost,
  participantsCount,
  maxParticipants,
  categories,
  price,
  visible = false,
  triggerOnce = true,
}) => {
  const { theme, sizes, commonStyles, typography, globalStyleSheet } = useTheme();
  const styles = getStyles({ theme, sizes, commonStyles });

  // Заменяем InView: вызываем onView при видимости
  const firedRef = useRef(false);
  useEffect(() => {
    if (!onView) return;
    if (visible && (!triggerOnce || !firedRef.current)) {
      firedRef.current = true;
      onView(eventId);
    }
  }, [visible, triggerOnce, onView, eventId]);

  return (
    <View
      style={[
        styles.container,
        isUserParticipantInPost && styles.participantContainer,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        {isUserParticipantInPost && (
          <View style={styles.participantOverlay}>
            <Text style={styles.participantText}>You’re participating</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={globalStyleSheet.flexRowCenterStart}>
          {date && <Text style={[typography.body, styles.date]}>{date}</Text>}
          {categories?.includes('bot') && (
            <Text style={[typography.body, styles.demo]}>DEMO</Text>
          )}
          {price && <Text style={[typography.body, styles.demo]}>{price}</Text>}
        </View>

        <Text style={typography.titleH4Regular} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>

        <Spacer size="xxs" />

        {/* Раньше было <InView> — теперь просто текст. Видимость обрабатывается хук-эффектом выше */}
        <Text style={typography.body} numberOfLines={2} ellipsizeMode="tail">
          {description}
        </Text>

        <Spacer size="sm" />

        <Organizer
          avatarUri={organizerAvatarUri}
          organizerName={organizerName}
          onPress={onPress}
        />
        <SocialStatsEvent onLike={onLike} hasLike={hasLike} likes={likes} views={views} />
      </View>

      {maxParticipants !== undefined && (
        <Text style={[typography.body, styles.participants]}>
          {participantsCount}/{maxParticipants}
        </Text>
      )}
    </View>
  );
};

const getStyles = ({
  sizes,
  commonStyles,
  theme,
}: {
  theme: ThemeType;
  sizes: SizesType;
  commonStyles: CommonStylesType;
}) =>
  StyleSheet.create({
    container: {
      ...commonStyles.card,
      ...commonStyles.shadow,
      padding: 0,
      borderRadius: 0,
      marginTop: sizes.xs,
      overflow: 'hidden',
    },
    participantContainer: {
      opacity: 0.8,
    },
    participantOverlay: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(0,0,0,0.8)',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 4,
    },
    participantText: {
      color: '#fff',
      fontSize: 12,
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
    date: {
      color: theme.placeholder,
      marginRight: sizes.sm,
    },
    demo: {
      paddingHorizontal: 12,
      borderColor: theme.warning,
      borderWidth: 1,
      marginRight: sizes.sm,
    },
    participants: {
      marginTop: sizes.xs,
      marginLeft: sizes.md,
      backgroundColor: 'rgba(0,0,0,0.8)',
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: 4,
      color: '#fff',
      fontWeight: '500',
      position: 'absolute',
      // при необходимости можно уточнить позицию: bottom/right/left
    },
  });

export default EventCard;
