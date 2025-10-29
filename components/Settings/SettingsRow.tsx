import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SizesType, ThemeType, useTheme } from '../../theme';

export type SettingsRowVariant = 'default' | 'value' | 'switch' | 'link';

export interface SettingsRowProps {
  title: string;
  description?: string;
  value?: string;
  variant?: SettingsRowVariant;
  onPress?: () => void;
  isLast?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (nextValue: boolean) => void;
}

const SettingsRow: React.FC<SettingsRowProps> = ({
  title,
  description,
  value,
  variant = 'default',
  onPress,
  isLast,
  switchValue = false,
  onSwitchChange,
}) => {
  const { theme, typography, sizes } = useTheme();
  const styles = React.useMemo(() => createStyles(theme, sizes), [theme, sizes]);

  const showValue = variant === 'value' && value;
  const showChevron = variant === 'link';
  const showSwitch = variant === 'switch' && onSwitchChange;

  const content = (
    <View style={styles.rowContent}>
      <View style={styles.textContainer}>
        <Text style={[typography.titleH6Regular, styles.title]}>
          {title}
        </Text>
        {description ? (
          <Text style={[typography.bodySm, styles.description]}>
            {description}
          </Text>
        ) : null}
      </View>
      {(showValue || showSwitch || showChevron) ? (
        <View style={styles.rightContainer}>
          {showValue ? (
            <Text style={[typography.bodySm, styles.value]} numberOfLines={1}>
              {value}
            </Text>
          ) : null}
          {showSwitch ? (
            <Switch
              value={switchValue}
              onValueChange={onSwitchChange}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={theme.white}
              ios_backgroundColor={theme.border}
            />
          ) : null}
          {showChevron ? (
            <MaterialIcons name="chevron-right" size={20} color={theme.placeholder} />
          ) : null}
        </View>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity style={[styles.row, isLast && styles.lastRow]} onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.row, isLast && styles.lastRow]}>{content}</View>;
};

const createStyles = (theme: ThemeType, sizes: SizesType) =>
  StyleSheet.create({
    row: {
      paddingVertical: sizes.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.border,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    rowContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      paddingRight: sizes.md,
    },
    title: {
      color: theme.text,
    },
    description: {
      marginTop: sizes.xs,
      color: theme.greyText,
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: sizes.xs,
    },
    value: {
      color: theme.placeholder,
    },
  });

export default SettingsRow;
