import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyleSheetType, SizesType, ThemeType, useTheme, CommonStylesType } from '../../theme';
import { InfoTooltip } from '../Tooltip/InfoTooltip';

export enum AccessType {
  COMMON = "COMMON",
  SUBSCRIBERS = "SUBSCRIBERS",
  PRIVATE = "PRIVATE",
}

interface HeaderProps {
  title: string;
  onBackPress: () => void;
  acceessType?: AccessType;
  children?: React.ReactNode;
  infoTooltip?: React.ReactNode;
}

const HeaderDefault: React.FC<HeaderProps> = ({ title, onBackPress, children, acceessType, infoTooltip }) => {
  const { globalStyleSheet, theme, sizes, commonStyles, typography } = useTheme();
  const styles = getStyles({ globalStyleSheet, theme, sizes, commonStyles });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons name="arrow-back" size={25} color={theme.text} />
      </TouchableOpacity>
      <View style={[styles.titleContainer, !children && { paddingRight: sizes.xl }]}>
        <Text style={typography.titleH5}>{title}</Text>
        {acceessType && acceessType !== AccessType.COMMON && <Text style={styles.access}>{'\u2014'} {acceessType}</Text>}
        {infoTooltip && <InfoTooltip style={{marginLeft: 4}} content={infoTooltip} />}
      </View>
      <View>
        {children}
      </View>
    </View>
  );
};

const getStyles = ({ theme, sizes, globalStyleSheet, commonStyles}: { commonStyles: CommonStylesType, theme: ThemeType, sizes: SizesType, globalStyleSheet: GlobalStyleSheetType }) => StyleSheet.create({
  container: {
    ...globalStyleSheet.flexRowCenter,
    ...commonStyles.backgroundLight,
    paddingVertical: sizes.sm,
    paddingHorizontal: sizes.xs,
  },
  titleContainer: {
    flex: 1,
    ...globalStyleSheet.flexRowCenterCenter,
    // textAlign: "center",
  },
  access: {
    fontSize: sizes.font,
    fontWeight: 'bold',
    color: theme.placeholder,
    textTransform: 'uppercase',
    marginLeft: 2,
    top: 1.5,

    // Эффект выбитого на камне
    textShadowColor: 'rgba(255, 255, 255, 0.8)', // Светлая тень сверху (высветление)
    textShadowOffset: { width: -1, height: -1 }, 
    textShadowRadius: 2,

    // Темная тень снизу (создает глубину выбитого эффекта)
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  }
});

export default HeaderDefault;
