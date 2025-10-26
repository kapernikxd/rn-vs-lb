import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, FontAwesome, FontAwesome5, Octicons, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { useProfileCardStyles } from './useProfileCardStyles';

export type PureProfileCardProps = {
  name: string;
  imageUri: string;

  /** auth/state */
  isAuth: boolean;
  isMe: boolean;
  isOnline?: boolean;
  lastSeenText?: string; // "Last seen: 2h ago"

  /** действия/навигация */
  onBack?: () => void;
  onOpenSettings?: () => void;
  onOpenActivity?: () => void;
  onOpenSpecialist?: () => void;
  onOpenCreatePoll?: () => void;
  onOpenCreateEvent?: () => void;
  onOpenAiBots?: () => void;
  onOpenBots?: () => void;
  onOpenUserSheet?: () => void;

  /** CTA */
  onLearnMorePress?: () => void;
  onMessage?: () => Promise<void> | void;
  onFollowToggle?: () => void;

  /** UI-флаги */
  specialistEnabled?: boolean;
  hideFollowBtn?: boolean;
  isFollowing?: boolean;
  hasNotifications?: boolean;
};

export default function PureProfileCard(props: PureProfileCardProps) {
  const {
    name, imageUri,
    isAuth, isMe, isOnline, lastSeenText,
    onBack, onOpenSettings, onOpenActivity, onOpenSpecialist,
    onOpenCreatePoll, onOpenCreateEvent, onOpenAiBots, onOpenBots, onOpenUserSheet,
    onLearnMorePress, onMessage, onFollowToggle,
    specialistEnabled, hideFollowBtn, isFollowing, hasNotifications,
  } = props;

  const { theme, globalStyleSheet, typography, styles } = useProfileCardStyles();
  const [previewVisible, setPreviewVisible] = useState(false);

  return (
    <View style={styles.cardContainer}>
      {/* навбар */}
      <View style={[globalStyleSheet.flexRowCenterBetween, styles.navigation]}>
        <TouchableOpacity onPress={onBack} disabled={!onBack}>
          <Ionicons size={24} name="arrow-back" color={theme.text} />
        </TouchableOpacity>

        {!isMe ? (
          <View style={styles.settingSection}>
            {specialistEnabled && onOpenSpecialist && (
              <TouchableOpacity onPress={onOpenSpecialist}>
                <View style={styles.iconBackground}>
                  <FontAwesome5 size={20} name="id-card" color={theme.text} />
                </View>
              </TouchableOpacity>
            )}
            {onOpenUserSheet && (
              <TouchableOpacity onPress={() => onOpenUserSheet()}>
                <View style={styles.iconBackground}>
                  <Ionicons name="ellipsis-horizontal-sharp" size={20} color={theme.primary} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.settingSection}>
            {onOpenActivity && (
              <View>
                <TouchableOpacity onPress={onOpenActivity}>
                  <View style={styles.iconBackground}>
                    <FontAwesome size={21} name="bell-o" color={theme.text} />
                  </View>
                </TouchableOpacity>
                {hasNotifications && (
                  <View style={{
                    position: 'absolute', right: 5, top: 2,
                    width: 8, height: 8, borderRadius: 4, backgroundColor: theme.danger,
                  }} />
                )}
              </View>
            )}

            {onOpenSpecialist && (
              <TouchableOpacity onPress={onOpenSpecialist}>
                <View style={styles.iconBackground}>
                  <FontAwesome5 size={20} name="id-card" color={theme.text} />
                </View>
              </TouchableOpacity>
            )}

            {onOpenAiBots && (
              <TouchableOpacity onPress={onOpenAiBots}>
                <View style={styles.iconBackground}>
                  <MaterialIcons name="smart-toy" size={25} color={theme.text} />
                </View>
              </TouchableOpacity>
            )}

            {onOpenBots && (
              <TouchableOpacity onPress={onOpenBots}>
                <View style={styles.iconBackground}>
                  <FontAwesome6 style={{ top: -1 }} size={20} name="robot" color={theme.text} />
                </View>
              </TouchableOpacity>
            )}

            {onOpenSettings && (
              <TouchableOpacity onPress={onOpenSettings}>
                <View style={styles.iconBackground}>
                  <Ionicons size={24} name="settings-outline" color={theme.text} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* аватар */}
      <TouchableOpacity onPress={() => setPreviewVisible(true)}>
        {/* у тебя есть commonStyles.avatarXl — можно заменить здесь на него, если нужно */}
        <Image source={{ uri: imageUri }} style={{ width: 108, height: 108, borderRadius: 54, backgroundColor: '#333' }} />
      </TouchableOpacity>

      {/* имя */}
      <View style={[globalStyleSheet.flexRowCenterCenter, { marginTop: 8 }]}>
        <Text style={typography.titleH4}>{name}</Text>
      </View>

      {/* онлайн/last seen */}
      {!isMe && isAuth && (
        isOnline ? (
          <Text style={[typography.body, styles.learnMoreText]}>Online</Text>
        ) : lastSeenText ? (
          <Text style={[typography.body, styles.learnMoreText]}>{lastSeenText}</Text>
        ) : null
      )}

      {/* learn more */}
      {onLearnMorePress && <TouchableOpacity onPress={onLearnMorePress} style={globalStyleSheet.flexRowCenter}>
        <MaterialIcons color={theme.placeholder} name="info-outline" size={18} />
        <Text style={[typography.body, styles.learnMoreText]}>Learn more</Text>
      </TouchableOpacity>}

      {/* CTA */}
      {isAuth && !isMe && (
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={[styles.btnPrimary, hideFollowBtn && { minWidth: '98%' }]} onPress={onMessage}>
            <FontAwesome name="send" size={14} color={theme.white} />
            <Text style={styles.btnPrimaryText}>Message</Text>
          </TouchableOpacity>

          {!hideFollowBtn && (
            <TouchableOpacity style={styles.btnOutline} onPress={onFollowToggle}>
              <FontAwesome5 name={isFollowing ? 'user-minus' : 'user-plus'} size={14} color={theme.primary} />
              <Text style={styles.btnOutlineText}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {(isMe && onOpenCreatePoll || isMe && onOpenCreateEvent) &&(
        <View style={styles.buttonsRow}>
          {onOpenCreatePoll && (
            <TouchableOpacity style={styles.btnOutline} onPress={onOpenCreatePoll}>
              <Ionicons name="stats-chart-outline" size={20} color={theme.primary} />
              <Text style={styles.btnOutlineText}>Create Poll</Text>
            </TouchableOpacity>
          )}
          {onOpenCreateEvent && (
            <TouchableOpacity style={styles.btnOutline} onPress={onOpenCreateEvent}>
              <Octicons name="diff-added" size={20} color={theme.primary} />
              <Text style={styles.btnOutlineText}>Create Event</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* превью фото (простое) */}
      <Modal visible={previewVisible} transparent animationType="fade" onRequestClose={() => setPreviewVisible(false)}>
        <Pressable style={{
          flex: 1, backgroundColor: 'rgba(0,0,0,0.8)',
          alignItems: 'center', justifyContent: 'center', padding: 12,
        }} onPress={() => setPreviewVisible(false)}>
          <Image source={{ uri: imageUri }} style={{ width: '100%', height: '80%' }} resizeMode="contain" />
        </Pressable>
      </Modal>
    </View>
  );
}
