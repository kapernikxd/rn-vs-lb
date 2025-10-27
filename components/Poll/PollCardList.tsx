import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, CommonStylesType } from '../../theme';

interface PollCardProps {
  question: string;
  creatorName: string;
  creatorAvatar: string;
  votesCount: number;
  onPress?: () => void;
  createdAt: string | null;
  votesLabel: string;
}

const PollCardList: React.FC<PollCardProps> = ({
  question,
  creatorName,
  creatorAvatar,
  votesCount,
  onPress,
  createdAt,
  votesLabel,
}) => {
  const { globalStyleSheet, commonStyles, typography } = useTheme();
  const styles = getStyles({ commonStyles });

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: creatorAvatar }} style={commonStyles.avatarSm} />
      <View style={styles.content}>
        <View style={globalStyleSheet.flexRowCenterBetween}>
          <Text style={[typography.titleH6, { width: '85%' }]} numberOfLines={2} ellipsizeMode="tail">
            {question}
          </Text>
        </View>
        <Text style={typography.bodyXs}>{creatorName}</Text>
        <View style={globalStyleSheet.flexRowCenterBetween}>
          <Text style={typography.bodyXs}>{votesCount} {votesLabel}</Text>
          <Text style={typography.bodyXs}>{createdAt}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = ({ commonStyles }: { commonStyles: CommonStylesType }) =>
  StyleSheet.create({
    container: {
      ...commonStyles.card,
      ...commonStyles.shadow,
      flexDirection: 'row',
      marginVertical: 4,
      alignItems: 'center',
      padding: 8,
    },
    content: {
      flex: 1,
      marginLeft: 8,
    },
  });

export default PollCardList;
