import { View, TouchableOpacity, Text } from 'react-native';
import React, { FC, ReactNode } from 'react';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../theme';

interface HeaderHomeProps {
  logo: ReactNode;
  onPress?: () => void;
  onPressCity?: () => void;
  onPressMap?: () => void;
  onPressSpecialists?: () => void;
  specialistsActive?: boolean;
}

export const HeaderHome: FC<HeaderHomeProps> = ({ logo, onPress, onPressCity, onPressMap, onPressSpecialists, specialistsActive }) => {
  const { globalStyleSheet, theme, commonStyles } = useTheme();

  return (
    <View style={[globalStyleSheet.flexRowCenterBetween, { height: 50 }]}>
      <View>
        <Text>
          {logo}
        </Text>
      </View>
      {(onPress || onPressCity || onPressMap || onPressSpecialists) && (
        <View style={{ flexDirection: 'row' }}>
          {onPressSpecialists && (
            <TouchableOpacity
              style={[commonStyles.btnicon, { marginRight: onPressMap || onPressCity || onPress ? 8 : 0 }]}
              onPress={onPressSpecialists}
            >
              <FontAwesome5 name="id-card" size={20} color={specialistsActive ? theme.primary : theme.text} />
            </TouchableOpacity>
          )}

          {onPressMap && (
            <TouchableOpacity
              style={[commonStyles.btnicon, { marginRight: onPressCity || onPress ? 8 : 0 }]}
              onPress={onPressMap}
            >
              <Ionicons name={"map"} size={22} color={theme.text} />
            </TouchableOpacity>
          )}

          {onPressCity && (
            <TouchableOpacity
              style={[commonStyles.btnicon, { marginRight: onPress ? 8 : 0 }]}
              onPress={onPressCity}
            >
              <Ionicons name={"location-sharp"} size={22} color={theme.text} />
            </TouchableOpacity>
          )}

          {onPress && (
            <TouchableOpacity style={[commonStyles.btnicon]} onPress={onPress}>
              <Ionicons name={"filter"} size={22} color={theme.text} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};