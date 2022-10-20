import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import { Test } from "@nestjs/testing";
import { EmailReplaceToken, EmailType } from "../definitions/emails";
import { EmailService } from "./email.service";
import { ErrorService } from "./error.service";

describe('EmailService', () => {
    const fs = require('fs');

    let emailService: EmailService;
    let mailerService: MailerService;
    let errorService: ErrorService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                MailerModule.forRoot({
                    transport: {
                        host: '0.0.0.0',
                        port: 0,
                    }
                })
            ],
            providers: [
                EmailService,
                ErrorService,
            ]
        }).compile();

        emailService = moduleRef.get<EmailService>(EmailService);
        mailerService = moduleRef.get<MailerService>(MailerService);
        errorService = moduleRef.get<ErrorService>(ErrorService);
    });

    it('should create the service', () => {
        expect(emailService).toBeTruthy();
    });

    it('should successfully send email', () => {
        const receiver = 'test@mail.com';
        const type = EmailType.Activation;
        const tokens: EmailReplaceToken[] = [
            { token: '$email', value: receiver }
        ];

        jest.spyOn(fs, 'readFileSync').mockImplementation(() => 'template data');
        const sendEmailSpy = jest.spyOn(mailerService, 'sendMail').mockImplementation(() => 
            new Promise(() => {})
        );

        emailService.sendEmail(receiver, type, tokens);

        expect(sendEmailSpy).toBeCalledWith(
            expect.objectContaining({
                to: receiver,
                from: 'Nightwood@re.nightwood.dev',
                subject: 'Nightwood - activate your account'
            })
        );
    });
});
