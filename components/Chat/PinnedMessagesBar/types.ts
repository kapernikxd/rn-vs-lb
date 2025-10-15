// components/Chat/PinnedMessagesBar/types.ts
import { MessageDTO } from '../../../types/message'; // ← поправь путь при необходимости

export interface PinnedMessagesBarProps {
  pinnedMessages: MessageDTO[];
  onUnpin: (messageId: string) => void;
  onPress: (messageId: string) => void;  // перейти к сообщению в чате
  isGroupChat: boolean;
  myId: string;
  lastReadMessageIdOpponent?: string | null;
  fixedItemHeight?: number; // если задана, измерение высоты не требуется
  itemSpacing?: number;     // отступ между карточками (по умолчанию 8)
}

export interface PinnedChipProps {
  item: MessageDTO;
  index: number;
  total: number;
  onTap: () => void;      // открыть модалку
  onOpen: () => void;     // перейти к сообщению в чате
  onUnpin: (e?: any) => void;
  onMeasuredHeight?: (h: number) => void;
  fixedHeight?: number;
}

export interface PinnedModalProps {
  visible: boolean;
  message: MessageDTO | null;
  isGroupChat: boolean;
  myId: string;
  lastReadMessageIdOpponent?: string | null;
  onClose: () => void;
  onOpenInChat: (messageId: string) => void;
}
