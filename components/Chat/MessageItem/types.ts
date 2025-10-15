// components/Chat/MessageItem/types.ts
export type MessageUser = { _id: string; fullName?: string | null };

export type MessageDTO = {
  _id: string;
  sender: MessageUser;
  content?: string | null;
  images?: string[];
  attachments?: string[];
  createdAt: string;
  isEdited?: boolean;
  dateLabel?: string;
  replyTo?: {
    _id: string;
    sender?: MessageUser | null;
    content?: string | null;
    images?: string[];
    attachments?: string[];
  } | null;
};

export interface LinkPreviewData {
  url: string;
  title?: string;
  description?: string;
  image?: string;
}

export interface MessageItemProps {
  item: MessageDTO;
  myId: string;
  isGroupChat: boolean;
  isReadByOpponent?: boolean;

  onLongPress?: () => void;
  isSelected?: boolean;

  timeText?: string;
  senderNameOverride?: string;

  linkHandler?: (url: string) => void;
  linkPreview?: LinkPreviewData | null;
  linkPreviewLoading?: boolean;

  onDownloadImage?: (url: string) => void;
  onShareImage?: (url: string) => void;
}
