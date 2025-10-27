import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, ThemeType } from '../../theme';
import CardContainer from './CardContainer';

export type DescriptionSectionProps = {
  title: string;
  text: string;
  expanded: boolean;
  onToggle: () => void;
  style?: ViewStyle;
  expandedLabel: string;
  collapsedLabel: string;
};

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  title,
  text,
  expanded,
  onToggle,
  style,
  expandedLabel,
  collapsedLabel,
}) => {
  const { theme, typography } = useTheme();
  const s = getStyles(theme);

  return (
    <View style={[s.section, style]}>
      <Text style={s.sectionTitle}>{title}</Text>
      <CardContainer style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
        <Text numberOfLines={expanded ? undefined : 3} style={typography.body}>
          {text}
        </Text>
        <TouchableOpacity onPress={onToggle}>
          <Text style={s.moreLink}>{expanded ? expandedLabel : collapsedLabel}</Text>
        </TouchableOpacity>
      </CardContainer>
    </View>
  );
};

export default DescriptionSection;

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    section: { paddingHorizontal: 16, marginTop: 36 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: theme.black, marginBottom: 8 },
    moreLink: { color: theme.primary, marginTop: 6, fontWeight: '600' },
  });
