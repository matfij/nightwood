import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {

    DEFAULT_SENDER = 'system@re.nightwood.dev';

    constructor(
        private mailerService: MailerService,
    ) {}

    sendEmail() {
        const params: ISendMailOptions = {
            to: 'mateusz.michal.fijak@gmail.com', // list of receivers
            from: this.DEFAULT_SENDER,
            subject: 'Testing ✔', // Subject line
            html: '<b>welcome to Nightwood</b>', // HTML body content
        };
        this.mailerService.sendMail(params)
            .then(reason => {
                console.log('Email success:', reason);
            })
            .catch(reason => {
                console.log('Email error:', reason);
            });
    }
}
