import { BadRequestException, Injectable } from "@nestjs/common";
import { BANNED_WORDS } from "../definitions/banned-words";

@Injectable()
export class ErrorService {

    throw(message: string): BadRequestException {
        throw new BadRequestException(message);
    }

    checkBannedWords(text: string, isChat: boolean = false): boolean {
        let clear = true;

        if (!isChat) text = text.toLowerCase().replace(/ /g, '');

        BANNED_WORDS.forEach(word => {
            if (text.includes(word)) clear = false;
        });

        return clear;
    }
}
