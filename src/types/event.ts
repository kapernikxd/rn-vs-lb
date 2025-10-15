import { UserId } from "./message";

export type EventParticipant = {
  _id: UserId;
  name: string;
  lastname: string;
  avatarFile: string;
  status?: 'PENDING' | 'CONFIRMED' | 'REJECTED'
};