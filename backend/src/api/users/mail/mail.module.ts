import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailController } from "./mail.controller";
import { MailService } from "./service/mail.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([]),
    ],
    controllers: [
        MailController,
    ],
    providers: [
        MailService,
    ],
    exports: [
        MailService,
    ],
})
export class MailModule {}
