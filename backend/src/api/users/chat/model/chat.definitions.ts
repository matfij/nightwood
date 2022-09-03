export interface ChatMessage {
    date: number;
    userId: number;
    nickname: string;
    data: string;
    mode: ChatMode;
}

export enum ChatMode {
    Error = 'Error',
    General = 'General',
    OffTopic = 'OffTopic',
}
