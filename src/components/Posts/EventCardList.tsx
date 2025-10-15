import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { useTheme } from '../../theme';

export type EventCardProps = {
  imageSource: ImageSourcePropType; // вместо imageUri
  title: string;
  description?: string;
  date?: string;

  /** Внешние действия */
  onPressCard?: () => void;

  /** Отступы/радиусы «первого элемента» — без бизнес-смысла, только визуальный вариант */
  isFirstElement?: boolean;

  /** Показывать затемнение (например, при модерации) — решает контейнер */
  dimmed?: boolean;

  /** Слоты/вставки */
  rightOverlay?: React.ReactNode; // например, бейдж с модерацией/tooltip
  menuButton?: React.ReactNode;   // кнопка «⋯» или любая иконка

  /** Участники */
  participantsCount?: number;
  maxParticipants?: number;

  /** Переопределение стилей извне */
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  dateStyle?: TextStyle;
  participantsStyle?: TextStyle;
};

const EventCard: React.FC<EventCardProps> = memo((props) => {
  const {
    imageSource,
    title,
    description,
    date,
    onPressCard,
    isFirstElement,
    dimmed,
    rightOverlay,
    menuButton,
    participantsCount,
    maxParticipants,
    style,
    imageStyle,
    titleStyle,
    descriptionStyle,
    dateStyle,
    participantsStyle,
  } = props;

  const { theme, typography } = useTheme(); // можно удалить и заменить дефолтными цветами

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPressCard}
      disabled={!onPressCard}
      style={[
        styles.container,
        isFirstElement && styles.containerFirst,
        style,
      ]}
    >
      <View style={[styles.row, dimmed && styles.dimmed]}>
        <Image source={imageSource} style={[styles.image, imageStyle]} />
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text
              style={[
                typography?.titleH6 ?? styles.titleDefault,
                styles.titleEllipsis,
                titleStyle,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>

            {/* Внешняя кнопка меню */}
            {menuButton ? <View style={styles.menuWrap}>{menuButton}</View> : null}
          </View>

          {description ? (
            <Text
              style={[typography?.bodyXs ?? styles.descDefault, descriptionStyle]}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {description}
            </Text>
          ) : null}

          {date ? (
            <Text
              style={[
                typography?.bodyXs ?? styles.descDefault,
                { textAlign: 'right', color: theme?.placeholder ?? '#888' },
                dateStyle,
              ]}
            >
              {date}
            </Text>
          ) : null}

          {maxParticipants !== undefined ? (
            <Text
              style={[
                typography?.bodyXs ?? styles.descDefault,
                { textAlign: 'right' },
                participantsStyle,
              ]}
            >
              {participantsCount ?? 0}/{maxParticipants}
            </Text>
          ) : null}
        </View>
      </View>

      {/* Правый вертикальный оверлей (бейдж/tooltip/любой ReactNode) */}
      {rightOverlay ? <View style={styles.rightOverlay}>{rightOverlay}</View> : null}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginVertical: 4,
    position: 'relative',
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    // тень по вкусу — лучше отдавать на тему
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  containerFirst: {
    marginVertical: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
  },
  dimmed: {
    opacity: 0.5,
  },
  image: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: '#eee',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleDefault: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  titleEllipsis: {
    width: '85%',
  },
  descDefault: {
    fontSize: 12,
    color: '#333',
  },
  menuWrap: {
    marginLeft: 'auto',
    padding: 4,
  },
  rightOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventCard;
