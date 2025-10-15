import React from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';
import { ThemeType, useTheme } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  title?: string;
  subTitle?: string;
  styleTitleContainer?: ViewStyle;
}

const CardContainer: React.FC<CardProps> = ({ children, style, title, subTitle, styleTitleContainer }) => {
  const { globalStyleSheet, theme, commonStyles, typography } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[commonStyles.card, style]}>
      {(title || subTitle) &&
        <View style={[styles.titleContainer, styleTitleContainer]}>
          {title && <Text style={[typography.titleH4Regular, styles.title]}>{title}</Text> }
          {subTitle && <Text style={typography.body}>{subTitle}</Text>}
        </View>
      }
      {children}
    </View>
  );
};

const getStyles = (theme:ThemeType) => StyleSheet.create({
  titleContainer: {
   display: "flex",
   alignItems: "center",
   borderBottomWidth: 1,
   borderBottomColor: theme.border,
   paddingBottom: 24,
   paddingTop: 20,
  },
  title: {
    marginBottom: 8,
   },
});

export default CardContainer;