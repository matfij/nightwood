import { BadRequestException, Injectable } from "@nestjs/common";
import { BANNED_WORDS } from "../definitions/banned-words";

@Injectable()
export class ErrorService {

    throw(message: string): BadRequestException {
        throw new BadRequestException(message);
    }

    checkBannedWords(text: string): boolean {
        let clear = true;

        text = text.toLowerCase().replace(/ /g, '');

        BANNED_WORDS.forEach(word => {
            if (text.includes(word)) clear = false;
        });

        return clear;
    }
}
