import { View, TouchableOpacity, Text } from 'react-native';
import React, { FC, ReactNode } from 'react';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderHomeProps {
  logo: ReactNode;
  onPressFilter: () => void;
  isAuth: boolean;
  onlyLogo?: boolean;
}

export const HeaderHome: FC<HeaderHomeProps> = ({ logo, onPressFilter, isAuth, onlyLogo = false }) => {
  return (
    <View style={[GlobalStyleSheet.flexalingjust, { height: 50 }]}>
      <View>
        <Text>
          {logo}
        </Text>
      </View>
      {!onlyLogo &&
        <View style={{ flexDirection: 'row' }}>
          {isAuth && <TouchableOpacity
            style={[GlobalStyleSheet.btnicon, { marginRight: 10, backgroundColor: '#EFF3FA' }]}
            onPress={() => console.log('createpost')}
          >
            <Icon
              name={"add-sharp"}
              size={28}
              color={"#475A77"}
            />
          </TouchableOpacity>
          }
          {isAuth &&
            <TouchableOpacity
              style={[GlobalStyleSheet.btnicon, { marginRight: 10, backgroundColor: '#EFF3FA' }]}
              onPress={() => console.log('notification')}
            >
              <Icon
                name={"notifications-outline"}
                size={22}
                color={"#475A77"}
              />
            </TouchableOpacity>
          }
          <TouchableOpacity
            style={[GlobalStyleSheet.btnicon, { backgroundColor: '#EFF3FA' }]}
            onPress={onPressFilter}
          >
            <Icon
              name={"filter"}
              size={22}
              color={"#475A77"}
            />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};