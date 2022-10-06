import { UserRole } from "../../user/model/definitions/users";

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
