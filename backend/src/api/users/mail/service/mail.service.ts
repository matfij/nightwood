import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DateService } from "src/common/services/date.service";
import { ErrorService } from "src/common/services/error.service";
import { FindManyOptions, Repository } from "typeorm";
import { UserService } from "../../user/service/user.service";
import { MailSendSystemParams } from "../model/definitions/mail-params";
import { MailGetDto } from "../model/dto/mail-get.dto";
import { MailPageDto } from "../model/dto/mail-page.dto";
import { MailSendDto } from "../model/dto/mail-send.dto";
import { MailDto } from "../model/dto/mail.dto";
import { Mail } from "../model/mail.entity";

@Injectable()
export class MailService {

    constructor(
        @InjectRepository(Mail)
        private mailRepository: Repository<Mail>,
        private userService: UserService,
        private dateService: DateService,
        private errorService: ErrorService,
    ) {}

    async sendMail(userId: number, dto: MailSendDto): Promise<MailDto> {
        const user = await this.userService.getOne(userId);
        const receiver = await this.userService.getOne(dto.receiverName);

        const mail: MailDto = {
            sentDate: this.dateService.getCurrentDate(),
            senderId: user.id,
            senderName: user.nickname,
            receiverId: receiver.id,
            topic: dto.topic,
            message: dto.message,
        };

        const newMail = await this.mailRepository.save(mail);
        return newMail;
    }

    async sendSystemMail(params: MailSendSystemParams): Promise<MailDto> {
        const mail: MailDto = {
            sentDate: this.dateService.getCurrentDate(),
            senderName: params.senderName,
            receiverId: params.receiverId,
            topic: params.topic,
            message: params.message,
        };

        const newMail = await this.mailRepository.save(mail);
        return newMail;
    }

    async readMail(userId: number, mailId: number): Promise<MailDto> {
        let mail = await this.checkOwnedMail(userId, mailId);

        mail.isRead = true;
        await this.mailRepository.save(mail);

        return mail;
    }

    async checkUnreadMails(userId: number): Promise<MailPageDto> {
        const mails = await this.mailRepository.find({
            where: { receiverId: userId, isRead: false },
            order: { sentDate: 'ASC' },
            take: 100,
        });

        const mailPage: MailPageDto = {
            data: mails,
            meta: { totalItems: mails.length },
        };
        return mailPage;
    }

    async getAllMails(userId: number, dto: MailGetDto): Promise<MailPageDto> {
        dto.page = Math.max(0, dto.page ?? 0);
        dto.limit = Math.max(1, dto.limit ?? 20);

        const filterOptions: FindManyOptions<Mail> = {
            where: { receiverId: userId },
            order: { sentDate: 'ASC' },
        };

        const mails = await this.mailRepository.find({
            ...filterOptions,
            skip: dto.page * dto.limit,
            take: dto.limit, 
        });
        const count = await this.mailRepository.count({
            ...filterOptions,
        }); 

        const mailPage: MailPageDto = {
            data: mails,
            meta: { totalItems: count },
        };
        return mailPage;
    }

    async checkOwnedMail(userId: number, mailId: number): Promise<MailDto> {
        const mail = await this.mailRepository.findOne({
            where: { id: mailId, receiverId: userId },
        });
        if(!mail) this.errorService.throw('errors.mailNotFound');
        return mail;
    }
}
