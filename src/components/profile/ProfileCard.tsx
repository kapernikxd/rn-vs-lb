import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { GlobalStyleSheet } from '../../constants';
import { COLORS, FONTS } from '../../constants/theme/theme';
import { IconConverter, IconTypes } from '../icon';
import { Button } from '../buttons';

interface ProfileCardProps {
  name: string;
  quote: string;
  imageUri: string;
  onPostPress: () => void;
  onLearnMorePress: () => void;
  onBack: () => void;
  isAuth: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, quote, onBack, imageUri, onPostPress, onLearnMorePress, isAuth }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={[GlobalStyleSheet.flexalingjust, styles.navigation]}>
        <TouchableOpacity
          onPress={onBack}
        >
          <IconConverter name={'arrow-back'} iconName='arrow-back' lb={IconTypes.IONICONS} size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('Settings')}
        >
          <View style={GlobalStyleSheet.background}>
            <IconConverter name={'settings-outline'} iconName='settings-outline' lb={IconTypes.IONICONS} size={24} />
          </View>
        </TouchableOpacity>
      </View>

      <Image source={{ uri: imageUri }} style={styles.profileImage} />
      <Text style={styles.name}>{name}</Text>
      {/* <Text style={styles.quote}>{quote}</Text> */}

      <TouchableOpacity onPress={onLearnMorePress} style={styles.learnMoreContainer}>
        <IconConverter color={COLORS.greyText} name={'info-outline'} iconName='info-outline' lb={IconTypes.MATERIALICONS} size={18} />
        <Text style={styles.learnMoreText}>Learn more</Text>
      </TouchableOpacity>

      {isAuth && <View style={styles.buttonContainer}>
        {/* <PostButton onPress={onPostPress} title='Post' /> */}
        <Button type="gray-outline" onPress={onPostPress} title='Follow' />
        <Button type="gray-outline" onPress={onPostPress} title='Message' />
      </View>}
    </View >
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
    paddingBottom: 32,
    borderRadius: 16,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  navigation: {
    display: 'flex',
    width: '100%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    ...FONTS.h4,
    fontWeight: 'bold',
  },
  quote: {
    fontSize: 14,
    color: '#000',
    marginVertical: 5,
  },
  learnMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  learnMoreText: {
    ...FONTS.font,
    color: COLORS.greyText,
    marginLeft: 5,
  },
  buttonContainer: {
    width: '100%',
    gap: 8,
    marginTop: 24,
  }
});

export default ProfileCard;
