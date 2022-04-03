import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { EMAIL_TEMPLATES, EmailType, EmailReplaceToken } from "../definitions/emails";

const fs = require('fs')

@Injectable()
export class EmailService {

    private TEMPLATES_PATH = 'src/common/data';
    private DEFAULT_SENDER = 'Nightwood@re.nightwood.dev';

    constructor(
        private mailerService: MailerService,
    ) {}

    sendEmail(receiver: string, type: EmailType, tokens: EmailReplaceToken[]) {
        const emailTemplate = EMAIL_TEMPLATES.find(t => t.type === type);
        let emailData: string = fs.readFileSync(`${this.TEMPLATES_PATH}/${emailTemplate.template}`, 'utf8');

        tokens.forEach(token => {
            emailData = emailData.replace(token.token, token.value);
        });

        const params: ISendMailOptions = {
            to: receiver,
            from: this.DEFAULT_SENDER,
            subject: emailTemplate.subject,
            html: emailData,
        };
        this.mailerService.sendMail(params)
            .then(reason => {
                console.log('Email success:', reason);
            })
            .catch(reason => {
                console.log('Email error:', reason);
            }
        );
    }
}
