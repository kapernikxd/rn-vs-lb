import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // оставляем, чтобы не менять визуал ⋯
import Spacer from '../UI/Spacer';
import { ThemeType, useTheme, CommonStylesType } from '../../theme';

interface EventCardProps {
  imageUri: string;
  date?: string;
  title: string;
  description: string;

  /** Меню (иконка ⋯) */
  isInvitation: boolean;
  onMenuPress?: () => void;

  /** Визуальные варианты */
  isFirstElement?: boolean;
  /** Затемнение карточки (раньше вычислялось по статусам модерации) */
  dimmed?: boolean;

  /** Слоты/вставки вместо внутренней модерации */
  /** Правый вертикальный маркер/оверлей (например, тултип-кнопка). Рендерится точно в том же месте, что и раньше. */
  rightOverlay?: React.ReactNode;

  /** Участники */
  participantsCount?: number;
  maxParticipants?: number;
}

const EventCardList: React.FC<EventCardProps> = ({
  imageUri,
  date,
  title,
  description,
  isInvitation,
  onMenuPress,
  isFirstElement,
  dimmed,
  rightOverlay,
  participantsCount,
  maxParticipants,
}) => {
  const { globalStyleSheet, theme, commonStyles, typography, isDark } = useTheme();
  const styles = getStyles({ theme, commonStyles });

  return (
    <View style={[styles.container, isFirstElement && styles.containerForFirstElement]}>
      <View style={[styles.overlayWrapper, dimmed && styles.dimmed]}>
        <Image source={{ uri: imageUri }} style={commonStyles.imageCard} />
        <View style={styles.content}>
          <View style={globalStyleSheet.flexRowCenterBetween}>
            <Text style={[typography.titleH6, { width: '85%' }]} numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>

            {isInvitation && onMenuPress && (
              <TouchableOpacity
                style={styles.action}
                onPress={(e) => {
                  e.stopPropagation();
                  onMenuPress();
                }}
              >
                <Ionicons name="ellipsis-horizontal-sharp" size={20} color={theme.primary} />
              </TouchableOpacity>
            )}
          </View>

          <Spacer size="xxs" />

          <Text style={typography.bodyXs} numberOfLines={3} ellipsizeMode="tail">
            {description}
          </Text>

          <Spacer size="xs" />

          {!!date && (
            <Text style={[typography.bodyXs, styles.date]}>
              {date}
            </Text>
          )}

          {maxParticipants !== undefined && (
            <Text style={[typography.bodyXs, styles.participants]}>
              {participantsCount ?? 0}/{maxParticipants}
            </Text>
          )}
        </View>
      </View>

      {/* Правый вертикальный оверлей — сюда теперь передаём готовый ReactNode из контейнера */}
      {rightOverlay ? (
        <View pointerEvents="box-none" style={styles.statusMarkerContainer}>
          {rightOverlay}
        </View>
      ) : null}
    </View>
  );
};

const getStyles = ({ theme, commonStyles }: { commonStyles: CommonStylesType; theme: ThemeType }) =>
  StyleSheet.create({
    container: {
      ...commonStyles.card,
      ...commonStyles.shadow,
      flexDirection: 'column',
      marginVertical: 4,
      position: 'relative',
    },
    containerForFirstElement: {
      marginVertical: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      marginBottom: 4,
    },
    overlayWrapper: {
      flexDirection: 'row',
    },
    dimmed: {
      opacity: 0.5,
    },
    content: {
      flex: 1,
      justifyContent: 'space-around',
      marginRight: 8,
    },
    action: {
      padding: 4,
    },
    date: {
      color: theme.placeholder,
      textAlign: 'right',
    },
    participants: {
      textAlign: 'right',
    },
    /** Контейнер под правый вертикальный маркер — размеры/позиция как раньше */
    statusMarkerContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      width: 32,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      // скругления были на самой плашке; оставляем контейнер без bg,
      // чтобы внешний rightOverlay сам решил фон/скругления (как раньше в renderModerationTooltip)
    },
  });

export default EventCardList;
