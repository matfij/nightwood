import { UserRole } from "src/app/client/api";

export interface ChatMessage {
  date: number;
  userId: number;
  userRole: UserRole;
  nickname: string;
  data: string;
  mode: ChatMode;
}

export enum ChatMode {
  Error = 'Error',
  General = 'General',
  OffTopic = 'OffTopic',
}
