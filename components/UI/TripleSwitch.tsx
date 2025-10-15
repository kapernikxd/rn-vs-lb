import React, { FC } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemeType, useTheme } from '../../theme';
export type TripleSwitchValue = 'left' | 'center' | 'right';

interface TripleSwitchProps {
  value: TripleSwitchValue;
  onChange: (value: TripleSwitchValue) => void;
  leftLabel: string;
  centerLabel: string;
  rightLabel: string;
}

const TripleSwitch: FC<TripleSwitchProps> = ({ value, onChange, leftLabel, centerLabel, rightLabel }) => {
  const { theme, typography } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.segment, value === 'left' && styles.activeSegment]}
        onPress={() => onChange(value === 'left' ? 'center' : 'left')}
      >
        <Text style={[typography.titleH6Regular, value === 'left' ? styles.activeText : styles.inactiveText]}>
          {leftLabel}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.segment, value === 'center' && styles.activeSegment]}
        onPress={() => onChange('center')}
      >
        <Text style={[typography.titleH6Regular, value === 'center' ? styles.activeText : styles.inactiveText]}>
          {centerLabel}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.segment, value === 'right' && styles.activeSegment]}
        onPress={() => onChange(value === 'right' ? 'center' : 'right')}
      >
        <Text style={[typography.titleH6Regular, value === 'right' ? styles.activeText : styles.inactiveText]}>
          {rightLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.primary,
      borderRadius: 20,
      overflow: 'hidden',
    },
    segment: {
      flex: 1,
      paddingVertical: 6,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    activeSegment: {
      backgroundColor: theme.primary,
    },
    inactiveText: {
      color: theme.primary,
    },
    activeText: {
      color: theme.white,
    },
  });

export default TripleSwitch;
