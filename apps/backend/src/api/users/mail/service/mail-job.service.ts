import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { DateService } from "src/common/services/date.service";
import { MAIL_OUT_OF_DATE_DAYS } from "src/configuration/backend.config";
import { LessThan, Repository } from "typeorm";
import { MailDto } from "../model/dto/mail.dto";
import { Mail } from "../model/mail.entity";

@Injectable()
export class MailJobService {

    constructor(
        @InjectRepository(Mail)
        private mailRepository: Repository<Mail>,
        private dateService: DateService,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_3AM)
    private async deleteOutOfDateMails() {
        const mails = await this.getOutOfDateMessages();
        for (const mail of mails) {
            await this.mailRepository.delete(mail);
        }
    }

    private async getOutOfDateMessages(): Promise<MailDto[]> {
        const thresholdDate = this.dateService.getPastDate(MAIL_OUT_OF_DATE_DAYS);
        const mails = await this.mailRepository.find({
            where: {
                sentDate: LessThan(thresholdDate)
            }
        });
        return mails;
    }
}
