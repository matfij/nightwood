import { Injectable } from "@nestjs/common";
import { DateService } from "src/common/services/date.service";
import { ErrorService } from "src/common/services/error.service";
import { CHAT_MESSAGE_MAX_LENGTH, CHAT_MESSAGE_MIN_LENGTH } from "src/configuration/backend.config";
import { UserDto } from "../../user/model/dto/user.dto";
import { ChatMessage, ChatMode } from "../model/chat";

@Injectable()
export class ChatService {

    SAVED_MESSAGES_LIMIT = 100;

    chatMode: ChatMode = ChatMode.General;
    private savedMessages: ChatMessage[] = [];

    constructor(
        private dateService: DateService,
        private errorService: ErrorService,
    ) {}
        
    getMessages() {
        return this.savedMessages;
    }

    validateMessage(content: string): boolean {
        if (content.length < CHAT_MESSAGE_MIN_LENGTH) return false;
        if (content.length > CHAT_MESSAGE_MAX_LENGTH) return false;
        
        if (!this.errorService.isPhareClear(content, true)) return false;

        return true;
    }

    addMessage(user: UserDto, message: ChatMessage): ChatMessage {
        if (user === null) return;
        if (!this.validateMessage(message.data)) return;
        if (!this.dateService.checkIfNextEventAvailable(user.mutedUntil)) return;

        message = {
            ...message,
            nickname: user.nickname,
            userId: user.id,
            userRole: user.role,
        };
        this.savedMessages.push(message);
        if (this.savedMessages.length > this.SAVED_MESSAGES_LIMIT) this.savedMessages.shift();
        return message;
    }
}
