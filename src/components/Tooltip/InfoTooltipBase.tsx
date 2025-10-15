import React, { useState } from 'react';
import { Modal, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';

type InfoTooltipBaseProps = {
  content: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
};

export const InfoTooltipBase: React.FC<InfoTooltipBaseProps> = ({
  content,
  style,
  iconSize,
  iconName,
  iconColor,
}) => {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const size = iconSize ?? 20;

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} style={style}>
        <Ionicons name={iconName} size={size} color={iconColor ?? theme.text} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.backgroundSemiTransparent,
          }}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View
            style={{
              maxWidth: '80%',
              padding: 20,
              backgroundColor: theme.card,
              borderRadius: 10,
            }}
          >
            <>{content}</>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
