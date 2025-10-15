export type MessageId = string;
export type UserId = string;

type Sender = {
  _id: UserId;
}

export interface MessageDTO {
  _id: MessageId;
  sender: Sender;
  content: string;
  chat?: {
    _id?: string
  } | string;
  readBy: UserId[];
  createdAt: string;
  replyTo?: MessageDTO;
  isEdited: boolean;
  images?: string[];
  attachments?: string[];
}