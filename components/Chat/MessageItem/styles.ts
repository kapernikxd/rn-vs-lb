// components/Chat/MessageItem/styles.ts
import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';

export const getStyles = ({ theme }: { theme: ThemeType }) =>
  StyleSheet.create({
    // reply
    replyBox: {
      backgroundColor: theme.background,
      borderLeftWidth: 3,
      borderLeftColor: theme.primary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      marginBottom: 4,
    },
    replySender: {
      fontWeight: 'bold',
      fontSize: 13,
      color: theme.primary,
    },
    replyText: {
      fontSize: 13,
      color: theme.black,
    },

    // date separator
    dateContainer: {
      alignSelf: 'center',
      marginVertical: 8,
      paddingHorizontal: 10,
      paddingVertical: 4,
      backgroundColor: theme.background,
      borderRadius: 10,
    },
    dateText: {
      fontSize: 12,
      color: theme.dark,
    },

    // message
    messageContainer: {
      maxWidth: '80%',
      marginVertical: 2,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    selected: {
      borderWidth: 1,
      borderColor: theme.primary,
      backgroundColor: `${theme.primary}20`,
    },
    messageRight: {
      alignSelf: 'flex-end',
      backgroundColor: theme.backgroundChatMessageRight,
    },
    messageLeft: {
      alignSelf: 'flex-start',
      backgroundColor: theme.backgroundChatMessageLeft,
    },
    sender: {
      fontWeight: 'bold',
      marginBottom: 2,
      color: theme.text,
    },
    messageText: {
      fontSize: 15,
      color: theme.black,
    },
    messageTextBold: {
      fontWeight: 'bold',
    },
    messageFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    messageTime: {
      fontSize: 11,
      color: theme.greyText,
    },
    readStatusIcon: {
      marginLeft: 4,
    },

    // images
    imagesContainer: {
      marginTop: 4,
    },
    messageImage: {
      width: 150,
      height: 150,
      borderRadius: 8,
      marginTop: 4,
    },

    // links
    linkText: {
      color: theme.primary,
      textDecorationLine: 'underline',
    },
    loadingText: {
      fontSize: 12,
      color: theme.greyText,
      marginTop: 2,
    },

    // modal
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.9)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullImage: {
      width: '90%',
      height: '70%',
      resizeMode: 'contain',
    },
    modalButtons: {
      flexDirection: 'row',
      marginTop: 20,
    },
    modalButton: {
      backgroundColor: theme.primary,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
      marginHorizontal: 8,
    },
    modalButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    modalClose: {
      position: 'absolute',
      top: 40,
      right: 20,
    },
  });
