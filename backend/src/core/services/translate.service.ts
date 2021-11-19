import { Injectable } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";

@Injectable()
export class TranslateService {

    constructor(
        private i18nService: I18nService,
    ) {}

    async translate(key: string, args?: any): Promise<string> {
        return await this.i18nService.translate(key, { args: args });
    }
}
