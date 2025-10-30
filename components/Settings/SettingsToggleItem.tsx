import React from 'react';
import { Switch, SwitchProps } from 'react-native';
import { useTheme } from '../../theme';
import SettingsListItem, { SettingsListItemProps } from './SettingsListItem';

export interface SettingsToggleItemProps
  extends Omit<SettingsListItemProps, 'value' | 'valueTone' | 'valueStyle' | 'accessory' | 'showChevron' | 'onPress'> {
  value?: boolean;
  defaultValue?: boolean;
  onValueChange?: (value: boolean) => void;
  switchProps?: Omit<SwitchProps, 'value' | 'onValueChange'>;
  toggleOnPress?: boolean;
}

const SettingsToggleItem: React.FC<SettingsToggleItemProps> = ({
  value,
  defaultValue = false,
  onValueChange,
  switchProps,
  toggleOnPress = true,
  disabled,
  ...rest
}) => {
  const { theme } = useTheme();
  const isControlled = typeof value === 'boolean';
  const [internalValue, setInternalValue] = React.useState(defaultValue);

  const currentValue = isControlled ? (value as boolean) : internalValue;

  React.useEffect(() => {
    if (!isControlled) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue, isControlled]);

  const handleChange = (nextValue: boolean) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  const handlePress = () => {
    if (disabled || !toggleOnPress) {
      return;
    }
    handleChange(!currentValue);
  };

  return (
    <SettingsListItem
      {...rest}
      disabled={disabled}
      onPress={toggleOnPress ? handlePress : undefined}
      accessory={
        <Switch
          value={currentValue}
          onValueChange={handleChange}
          trackColor={{ false: theme.backgroundSecond, true: theme.primary }}
          thumbColor={theme.white}
          ios_backgroundColor={theme.backgroundSecond}
          disabled={disabled}
          {...switchProps}
        />
      }
    />
  );
};

export default SettingsToggleItem;
