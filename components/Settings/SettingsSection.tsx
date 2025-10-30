import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ThemeType, useTheme } from '../../theme';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children, style, contentStyle }) => {
  const { theme, globalStyleSheet } = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  const childArray = React.Children.toArray(children).filter(Boolean) as React.ReactElement[];

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={[globalStyleSheet.descriptionCard, styles.title]}>{title.toUpperCase()}</Text>
      <View style={[styles.listContainer, contentStyle]}>
        {childArray.map((child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          const isFirst = index === 0;
          const isLast = index === childArray.length - 1;

          return React.cloneElement(child, {
            isFirst,
            isLast,
          });
        })}
      </View>
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
    },
    title: {
      marginBottom: 12,
      color: theme.placeholder,
    },
    listContainer: {
      borderRadius: 16,
      backgroundColor: theme.card,
      overflow: 'hidden',
    },
  });

export default SettingsSection;
