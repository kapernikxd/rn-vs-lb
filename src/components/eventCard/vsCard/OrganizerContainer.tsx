import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';

interface OrganizerContainerProps {
  avatarUri: string;
  organizerName: string;
  organizerLink: string;
}

const OrganizerContainer: React.FC<OrganizerContainerProps> = ({ avatarUri, organizerName, organizerLink }) => {

  const handlePress = () => {
    if (organizerLink) {
      Linking.openURL(organizerLink).catch(err => console.error("Couldn't load page", err));
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image source={{ uri: avatarUri }} style={styles.avatar} />
      <View style={styles.organizerTextContainer}>
        <Text style={styles.organizerTitle}>Organizer</Text>
        <Text
          style={styles.organizerText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {organizerName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: SIZES.sm,
    },
    organizerTextContainer: {
        flex: 1,
        paddingRight: SIZES.sm,
    },
    organizerTitle: {
        ...FONTS.font,
        color: COLORS.dark,
    },
    organizerText: {
        ...FONTS.h6,
    },
});

export default OrganizerContainer;