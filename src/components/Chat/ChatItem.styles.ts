import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme';

export const getStyles = (theme: ThemeType) => StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  senderContainer: {
    flexDirection: 'row',
    alignItems: "center",
    // justifyContent: "space-between",
  },
  unread: {
    // top:10,
    marginLeft: 8,
    width:18,
    height: 18,
    textAlign:"center",
    backgroundColor: theme.success,
    color: theme.white,
    borderRadius: 20,
    fontSize: 12,
    lineHeight: 16,
  },
  senderName: {
    fontSize: 14,
    marginRight: 4,
    color: theme.text,
  },
  senderMessage: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  timeAgo: {
    fontSize: 13,
    color: theme.placeholder,
  },

  status: {
    position: "absolute",
    width:12,
    height: 12,
    borderWidth: 2,
    borderColor: theme.white,
    borderRadius: 10,
    bottom: 0,
    right:1,
  },
  online: {
    backgroundColor: theme.success,
  },
  offline: {
    backgroundColor: theme.danger,
  }
});
