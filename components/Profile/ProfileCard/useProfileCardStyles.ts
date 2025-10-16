// src/components/ProfileCard/useProfileCardStyles.ts
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../theme';

export const useProfileCardStyles = () => {
  const { theme, globalStyleSheet, typography } = useTheme();

  const styles = StyleSheet.create({
    cardContainer: {
      alignItems: 'center',
      padding: 16,
      paddingTop: 8,
      paddingBottom: 32,
      backgroundColor: theme.backgroundLight,
      shadowColor: theme.black,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
    },
    navigation: { width: '100%' },
    settingSection: { flexDirection: 'row' },
    iconBackground: {
      backgroundColor: theme.backgroundLight,
      height: 40, width: 40, borderRadius: 50,
      alignItems: 'center', justifyContent: 'center',
    },
    dot: { backgroundColor: theme.danger, right: 5, top: 2 },
    learnMoreText: { color: theme.placeholder, marginLeft: 5 },

    buttonsRow: {
      padding: 8,
      ...globalStyleSheet.flexRowCenterCenter,
      gap: 12,
      marginTop: 12,
    },
    btnPrimary: {
      ...globalStyleSheet.flexRowCenterCenter,
      gap: 8,
      backgroundColor: theme.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      borderColor: theme.primary,
      borderWidth: 1,
      minWidth: '46%',
    },
    btnPrimaryText: {
      fontSize: 14,
      color: theme.white,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    btnOutline: {
      gap: 8,
      ...globalStyleSheet.flexRowCenterCenter,
      backgroundColor: theme.backgroundSecond,
      borderColor: theme.primary,
      borderWidth: 1,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      minWidth: '46%',
    },
    btnOutlineText: {
      fontSize: 14,
      color: theme.primary,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    btnWide: {
      minWidth: '96%',
    },
  });

  return { theme, globalStyleSheet, typography, styles };
};
