import { BadRequestException, Injectable } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";

@Injectable()
export class TranslateService {

    constructor(
        private i18nService: I18nService,
    ) {}

    async translate(key: string, args?: any): Promise<string> {
        args = {
            ...args,
            lang: 'en',
        };
        return await this.i18nService.translate(key, { args: args });
    }

    async throw(key: string, args?: any): Promise<BadRequestException> {
        const message = await this.translate(key, args);

        throw new BadRequestException(message);
    }
}
