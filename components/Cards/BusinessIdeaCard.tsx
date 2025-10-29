import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, ThemeType, SizesType } from '../../theme';
import Spacer from '../UI/Spacer';
import { GlobalStyleSheetType } from '../../theme/styles/styleSheet';

export interface BusinessIdeaCardProps {
  avatarUri: string;
  channelLabel: string;
  imageUri: string;
  quote: string;
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
  showMore?: boolean;
  showMoreLabel?: string;
  liked?: boolean;
  onPressLike?: () => void;
  onPressComment?: () => void;
  onPressShare?: () => void;
  onPressMore?: () => void;
  onPressShowMore?: () => void;
  avatarPlaceholder?: ImageSourcePropType;
}

const BusinessIdeaCard: React.FC<BusinessIdeaCardProps> = ({
  avatarUri,
  channelLabel,
  imageUri,
  quote,
  likes,
  comments,
  shares,
  timeAgo,
  showMore = true,
  showMoreLabel = 'Show more',
  liked = false,
  onPressLike,
  onPressComment,
  onPressShare,
  onPressMore,
  onPressShowMore,
  avatarPlaceholder,
}) => {
  const { theme, sizes, commonStyles, typography, globalStyleSheet } = useTheme();
  const styles = getStyles({ theme, sizes, globalStyleSheet });

  const renderAvatar = () => {
    if (avatarUri) {
      return <Image source={{ uri: avatarUri }} style={styles.avatar} />;
    }

    if (avatarPlaceholder) {
      return <Image source={avatarPlaceholder} style={styles.avatar} />;
    }

    return (
      <View style={[styles.avatar, styles.avatarFallback]}>
        <Ionicons name="bulb" size={18} color={theme.primary} />
      </View>
    );
  };

  return (
    <View style={[commonStyles.card, commonStyles.shadow, styles.container]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {renderAvatar()}
          <Text style={styles.channelLabel}>{channelLabel}</Text>
        </View>
        {onPressMore ? (
          <TouchableOpacity onPress={onPressMore} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="ellipsis-horizontal" size={20} color={theme.greyText} />
          </TouchableOpacity>
        ) : (
          <Ionicons name="ellipsis-horizontal" size={20} color={theme.greyText} />
        )}
      </View>

      <Spacer size="xs" />

      <Image source={{ uri: imageUri }} style={styles.coverImage} resizeMode="cover" />

      <Spacer size="sm" />

      <Text style={[typography.body, styles.quote]} numberOfLines={4} ellipsizeMode="tail">
        {quote}
      </Text>

      {showMore && (
        <>
          <Spacer size="xxs" />
          {onPressShowMore ? (
            <TouchableOpacity onPress={onPressShowMore} activeOpacity={0.7}>
              <Text style={styles.showMore}>{showMoreLabel}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.showMore}>{showMoreLabel}</Text>
          )}
        </>
      )}

      <Spacer size="sm" />

      <View style={styles.footer}>
        <View style={styles.actionsRow}>
          <ActionButton
            iconName={liked ? 'heart' : 'heart-outline'}
            iconColor={liked ? theme.danger : theme.greyText}
            label={likes}
            onPress={onPressLike}
          />
          <ActionButton
            iconName="chatbubble-ellipses-outline"
            iconColor={theme.greyText}
            label={comments}
            onPress={onPressComment}
          />
          <ActionButton
            iconName="arrow-redo-outline"
            iconColor={theme.greyText}
            label={shares}
            onPress={onPressShare}
          />
        </View>
        <Text style={styles.timeAgo}>{timeAgo}</Text>
      </View>
    </View>
  );
};

interface StyleParams {
  theme: ThemeType;
  sizes: SizesType;
  globalStyleSheet: GlobalStyleSheetType;
}

const getStyles = ({ theme, sizes, globalStyleSheet }: StyleParams) =>
  StyleSheet.create({
    container: {
      padding: sizes.md,
      borderRadius: sizes.radius_lg,
      backgroundColor: theme.white,
    },
    header: {
      ...globalStyleSheet.flexRowCenterBetween,
    },
    headerLeft: {
      ...globalStyleSheet.flexRowCenterStart,
      gap: sizes.xs,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.backgroundSecond,
      overflow: 'hidden',
    },
    avatarFallback: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    channelLabel: {
      ...globalStyleSheet.descriptionCard,
      color: theme.title,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    coverImage: {
      width: '100%',
      height: 220,
      borderRadius: sizes.radius_sm,
      backgroundColor: theme.backgroundSecond,
    },
    quote: {
      color: theme.title,
      fontStyle: 'italic',
    },
    showMore: {
      color: theme.greyText,
      fontSize: sizes.fontSm,
      fontWeight: '500',
    } as TextStyle,
    footer: {
      ...globalStyleSheet.flexRowCenterBetween,
      alignItems: 'center',
    },
    actionsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: sizes.md,
      gap: sizes.md,
    },
    timeAgo: {
      color: theme.greyText,
      fontSize: sizes.fontSm,
    } as TextStyle,
  });

type ActionButtonProps = {
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  iconColor: string;
  label: number;
  onPress?: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({ iconName, iconColor, label, onPress }) => {
  const { theme, sizes } = useTheme();
  const styles = StyleSheet.create({
    action: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: sizes.xs,
      gap: sizes.xs,
    },
    label: {
      color: theme.text,
      fontSize: sizes.fontSm,
      fontWeight: '500',
    },
  });

  if (!onPress) {
    return (
      <View style={styles.action}>
        <Ionicons name={iconName} size={18} color={iconColor} />
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.action}>
      <Ionicons name={iconName} size={18} color={iconColor} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BusinessIdeaCard;
