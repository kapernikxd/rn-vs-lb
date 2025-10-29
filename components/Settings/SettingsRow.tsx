import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SizesType, ThemeType, useTheme } from '../../theme';

export interface SettingsRowProps {
  title: string;
  description?: string;
  value?: string;
  rightAccessory?: React.ReactNode;
  onPress?: () => void;
  isLast?: boolean;
}

const SettingsRow: React.FC<SettingsRowProps> = ({
  title,
  description,
  value,
  rightAccessory,
  onPress,
  isLast,
}) => {
  const { theme, typography, sizes } = useTheme();
  const styles = React.useMemo(() => createStyles(theme, sizes), [theme, sizes]);

  const hasRightContent = Boolean(value || rightAccessory);

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
      {hasRightContent ? (
        <View style={styles.rightContainer}>
          {value ? (
            <Text style={[typography.bodySm, styles.value]} numberOfLines={1}>
              {value}
            </Text>
          ) : null}
          {rightAccessory ? <View style={styles.accessory}>{rightAccessory}</View> : null}
        </View>
      ) : null}
    </View>
  );

  const rowStyle = [styles.row, isLast && styles.lastRow];

  if (onPress) {
    return (
      <TouchableOpacity style={rowStyle} onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={rowStyle}>{content}</View>;
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
      flexShrink: 0,
      justifyContent: 'flex-end',
    },
    value: {
      color: theme.placeholder,
    },
    accessory: {
      marginLeft: sizes.xs,
    },
  });

export default SettingsRow;
