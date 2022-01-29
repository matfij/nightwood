export interface ChatMessage {
  date: number;
  nickname: string;
  data: string;
  mode: ChatMode;
}

export enum ChatMode {
  Error = 'Error',
  General = 'General',
  OffTopic = 'OffTopic',
}
