import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

import { SizesType, useTheme, CommonStylesType } from '../../theme';

interface OrganizerContainerProps {
  avatarUri: string;
  organizerName: string;
  onPress: () => void;
}

const Organizer: React.FC<OrganizerContainerProps> = ({ avatarUri, organizerName, onPress }) => {
  const { globalStyleSheet, sizes, commonStyles, typography } = useTheme();
  const styles = getStyles({ sizes, commonStyles });

  return (
    <TouchableOpacity onPress={onPress} style={globalStyleSheet.flexRowCenter}>
      <Image source={{ uri: avatarUri }} style={styles.avatar} />
      <View>
        <Text style={typography.body}>Organizer</Text>
        <Text
          style={typography.titleH6Regular}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {organizerName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = ({ sizes, commonStyles}: { sizes: SizesType, commonStyles: CommonStylesType }) => StyleSheet.create({
  avatar: {
    ...commonStyles.avatarSm,
    marginRight: sizes.sm,
  },
});

export default Organizer;