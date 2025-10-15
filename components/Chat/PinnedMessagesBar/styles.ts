// components/Chat/PinnedMessagesBar/styles.ts
import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';

export const getStyles = (theme: ThemeType) => {
  const primary = (theme as any).primary || '#6f2da8';
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background4,
      paddingTop: 10,
      paddingBottom: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.border,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      marginBottom: 6,
      gap: 6,
    },
    headerIcon: { color: primary },
    title: { color: theme.text, fontSize: 14, fontWeight: '600' },
    counterBadge: {
      marginLeft: 6,
      paddingHorizontal: 6,
      height: 18,
      borderRadius: 9,
      backgroundColor: theme.backgroundLight,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.border,
    },
    counterText: { fontSize: 11, color: theme.text, opacity: 0.7 },

    listContentVertical: { paddingHorizontal: 12, paddingRight: 12 },

    item: {
      flexDirection: 'row',
      alignItems: 'stretch',
      backgroundColor: theme.backgroundLight,
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.border,
    },
    itemLeftAccent: { width: 4, backgroundColor: primary, opacity: 0.9 },
    itemContent: { flex: 1, paddingVertical: 10, paddingHorizontal: 10 },
    text: { fontSize: 14, lineHeight: 18, color: theme.text },

    actions: { flexDirection: 'row', alignItems: 'center' },
    navBtn: { paddingHorizontal: 6, justifyContent: 'center' },

    unpinButton: { justifyContent: 'center', paddingHorizontal: 6 },
    unpinIcon: { color: theme.text, opacity: 0.6 },

    navButtons: { marginLeft: 'auto', flexDirection: 'row', gap: 4 },

    // modal
    modalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    modalCard: {
      width: '100%',
      maxWidth: 560,
      borderRadius: 14,
      backgroundColor: theme.backgroundLight,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.border,
      overflow: 'hidden',
    },
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.border,
    },
    modalTitle: { flex: 1, fontSize: 16, fontWeight: '600', color: theme.text },
    modalBody: { maxHeight: 360, paddingHorizontal: 14, paddingVertical: 12 },

    modalActions: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
      gap: 8,
    },
    modalActionBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor: theme.background4,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.border,
    },
    modalActionText: { fontSize: 14, color: theme.text },
    modalCloseBtn: {
      marginLeft: 'auto',
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor: primary,
    },
    modalCloseText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  });
};
