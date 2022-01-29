export interface ChatMessage {
    date: string;
    nickname: string;
    data: string;
}

export enum ChatMode {
    Error = 'Error',
    General = 'General',
    OffTopic = 'OffTopic',
}
