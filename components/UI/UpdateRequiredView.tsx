import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Animated,
} from 'react-native';
import { useTheme } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Spacer from './Spacer';
import { Button } from '../Button';

type Props = {
  anim: Animated.Value;           // внешний Animated.Value с уже запущенным loop
  refreshing: boolean;
  onRefresh: () => void;
  onPressUpdate: () => void;
  title: string;
  description: string;
  updateButtonText: string;
};

export const UpdateRequiredView = memo(({ anim, refreshing, onRefresh, onPressUpdate, title, description, updateButtonText }: Props) => {
  const { theme, commonStyles, typography } = useTheme() as any;

  const ui = {
    bg: theme?.background ?? '#fff',
    primary: theme?.primary ?? '#6f2da8',
    container: commonStyles?.container ?? { flex: 1, padding: 16 },
    titleH2: typography?.titleH2 ?? { fontSize: 24, fontWeight: '700' },
    body: typography?.body ?? { fontSize: 16 },
  };

  return (
    <ScrollView
      contentContainerStyle={[ui.container, { backgroundColor: ui.bg, flexGrow: 1, justifyContent: 'center' }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Animated.View style={[styles.iconContainer, { transform: [{ translateY: anim }] }]}>
        <MaterialCommunityIcons name="update" size={64} color={ui.primary} />
      </Animated.View>

      <Spacer size="xl" />
      <Text style={[ui.titleH2, styles.title]}>{title}</Text>

      <Spacer size="sm" />
      <Text style={[ui.body, styles.description]}>
        {description}
      </Text>

      <Spacer size="xl" />
      <View style={styles.button}>
        <Button title={updateButtonText} onPress={onPressUpdate} />
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  button: { width: '70%' },
  iconContainer: { alignItems: 'center' },
  title: { textAlign: 'center' },
  description: { textAlign: 'center', paddingHorizontal: 20 },
});
