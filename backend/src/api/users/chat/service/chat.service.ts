import { Injectable } from "@nestjs/common";
import { ErrorService } from "src/common/services/error.service";
import { CHAT_MESSAGE_MAX_LENGTH, CHAT_MESSAGE_MIN_LENGTH } from "src/configuration/backend.config";

@Injectable()
export class ChatService {

    constructor(
        private errorService: ErrorService,
    ) {}

    validateMessage(content: string): boolean {
        if (content.length < CHAT_MESSAGE_MIN_LENGTH) return false;
        if (content.length > CHAT_MESSAGE_MAX_LENGTH) return false;
        
        if (!this.errorService.checkBannedWords(content)) return false;

        return true;
    }
}
