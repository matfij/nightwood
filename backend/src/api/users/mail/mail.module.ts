import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DateService } from "src/common/services/date.service";
import { ErrorService } from "src/common/services/error.service";
import { UserModule } from "../user/user.module";
import { MailController } from "./mail.controller";
import { Mail } from "./model/mail.entity";
import { MailService } from "./service/mail.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Mail]),
        UserModule,
    ],
    controllers: [
        MailController,
    ],
    providers: [
        MailService,
        DateService,
        ErrorService,
    ],
    exports: [
        MailService,
    ],
})
export class MailModule {}
