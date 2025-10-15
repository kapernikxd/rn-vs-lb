import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Spacer from '../Spacer';
import { IconLabel } from './IconLabel';
import { useTheme } from '../../../theme';



interface AddressBlockProps {
  address?: string;
  mapPoint: [number, number];
}

export const AddressBlock: React.FC<AddressBlockProps> = ({ address, mapPoint }) => {
  const { globalStyleSheet, theme, sizes, typography } = useTheme();

  const handlePress = () => {
    // Use Linking to open the map URL
    Linking.openURL(`https://www.google.com/maps?q=${mapPoint[0]},${mapPoint[1]}&z=17`);
  };

  return (
    <View>
      <IconLabel icon='location-outline' label='Address:' />
      <Spacer size='xxs' />
      <Text style={typography.body}>
        {address}
      </Text>
      <TouchableOpacity onPress={handlePress} style={globalStyleSheet.flexRowCenter}>
        <Text style={[typography.textLink, { marginRight: sizes.xxs }]}>View on the map</Text>
        <Ionicons style={{ paddingTop: 3 }} name="chevron-forward-outline" size={sizes.font} color={theme.primary} />
      </TouchableOpacity>
    </View>
  );
};

