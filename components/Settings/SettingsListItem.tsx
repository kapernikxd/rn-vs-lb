import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeType, useTheme } from '../../theme';

type ValueTone = 'default' | 'muted' | 'primary';

const VALUE_TONE_MAP: Record<ValueTone, 'valueDefault' | 'valueMuted' | 'valuePrimary'> = {
  default: 'valueDefault',
  muted: 'valueMuted',
  primary: 'valuePrimary',
};

export interface SettingsListItemProps {
  label: string;
  description?: string;
  value?: string;
  valueTone?: ValueTone;
  valueStyle?: StyleProp<TextStyle>;
  accessory?: React.ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  isFirst?: boolean;
  isLast?: boolean;
}

const SettingsListItem: React.FC<SettingsListItemProps> = ({
  label,
  description,
  value,
  valueTone = 'default',
  valueStyle,
  accessory,
  onPress,
  showChevron,
  disabled,
  containerStyle,
  isFirst,
  isLast,
}) => {
  const { theme, typography } = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  const content = (
    <View
      style={[
        styles.item,
        isFirst && styles.first,
        isLast && styles.last,
        disabled && styles.disabled,
        containerStyle,
      ]}
    >
      <View style={[styles.textContainer, description ? styles.textWithDescription : null]}>
        <Text style={[typography.titleH6Regular, styles.label]}>{label}</Text>
        {description ? <Text style={[styles.description, typography.bodySm]}>{description}</Text> : null}
      </View>
      {value ? (
        <Text
          style={[
            styles.value,
            typography.titleH6Regular,
            styles[VALUE_TONE_MAP[valueTone]],
            valueStyle,
          ]}
        >
          {value}
        </Text>
      ) : null}
      {accessory ? <View style={styles.accessory}>{accessory}</View> : null}
      {showChevron ? <MaterialIcons name="chevron-right" size={22} color={theme.placeholder} /> : null}
    </View>
  );

  if (onPress && !disabled) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.background,
    },
    first: {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    last: {
      borderBottomWidth: 0,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    },
    disabled: {
      opacity: 0.5,
    },
    textContainer: {
      flex: 1,
    },
    textWithDescription: {
      justifyContent: 'center',
    },
    label: {
      color: theme.title,
    },
    description: {
      marginTop: 4,
      color: theme.greyText,
    },
    value: {
      marginLeft: 16,
      color: theme.title,
      flexShrink: 0,
    },
    valueDefault: {
      color: theme.title,
    },
    valueMuted: {
      color: theme.placeholder,
    },
    valuePrimary: {
      color: theme.primary,
    },
    accessory: {
      marginLeft: 16,
    },
  });

export default SettingsListItem;
