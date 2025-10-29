import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../Button/Button';
import Spacer from '../../UI/Spacer';
import TextWithLinks from '../../UI/TextWithLinks';
import { useTheme } from '../../../theme';

type ProfileStat = {
  /** Title displayed under the numeric value. */
  label: string;
  /** Numeric or string value displayed above the label. */
  value: string | number;
};

export interface ProfileSummaryProps {
  /** Remote uri for the avatar. */
  avatarUri: string;
  /** Main profile name. */
  name: string;
  /** Secondary username, e.g. @handle. */
  username: string;
  /** Collection of statistics shown under the username. */
  stats: ProfileStat[];
  /** Optional website text shown as a link under the stats. */
  website?: string;
  /** Custom handler for link clicks. */
  onWebsitePress?: (url: string) => void;
  /** Called when avatar is pressed. */
  onAvatarPress?: () => void;
  /** Called when floating add button on avatar pressed. */
  onAddPress?: () => void;
  /** Called when edit button pressed. */
  onEditPress?: () => void;
  /** Controls visibility of floating add button. */
  showAddButton?: boolean;
  /** Custom label for edit button. */
  editLabel?: string;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({
  avatarUri,
  name,
  username,
  stats,
  website,
  onWebsitePress,
  onAvatarPress,
  onAddPress,
  onEditPress,
  showAddButton = true,
  editLabel = 'Edit',
}) => {
  const { theme, typography, sizes } = useTheme();

  return (
    <View style={[styles.container, { paddingHorizontal: sizes.lg }]}> 
      <View style={styles.avatarWrapper}>
        <TouchableOpacity onPress={onAvatarPress} activeOpacity={0.8}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        </TouchableOpacity>

        {showAddButton && (
          <TouchableOpacity
            onPress={onAddPress}
            activeOpacity={0.8}
            style={[styles.addButton, { backgroundColor: theme.primary }]}
          >
            <Ionicons name="add" size={20} color={theme.white} />
          </TouchableOpacity>
        )}
      </View>

      <Spacer size="sm" />

      <View style={styles.nameRow}>
        <Text style={[typography.titleH4, styles.centerText]}>{name}</Text>
        <Button
          title={editLabel}
          type="gray-outline"
          onPress={onEditPress}
          style={[styles.editButton, { marginLeft: sizes.sm }]}
          textStyle={styles.editButtonText}
          disabled={!onEditPress}
        />
      </View>

      <Text style={[typography.body, styles.username, { color: theme.description }]}>{username}</Text>

      <Spacer size="md" />

      <View style={styles.statsRow}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statItem}>
            <Text style={[typography.titleH6, styles.statValue]}>{stat.value}</Text>
            <Text style={[typography.bodySm, styles.statLabel, { color: theme.description }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {website ? (
        <>
          <Spacer size="sm" />
          <TextWithLinks
            text={website}
            style={[typography.body, styles.centerText]}
            linkTextStyle={[styles.websiteLink, { color: theme.primary }]}
            onLinkPress={onWebsitePress}
          />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#2B2B2B',
  },
  addButton: {
    position: 'absolute',
    bottom: 4,
    right: -4,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  editButton: {
    minHeight: 32,
    paddingHorizontal: 14,
    borderRadius: 16,
    width: 'auto',
    alignSelf: 'center',
  },
  editButtonText: {
    fontSize: 14,
  },
  username: {
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 280,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontWeight: '600',
  },
  statLabel: {
    marginTop: 2,
  },
  websiteLink: {
    fontWeight: '500',
  },
});

export default ProfileSummary;
