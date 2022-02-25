import { Controller, Post, UseGuards, Request, Body, Param } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { JwtAuthGuard } from "../auth/util/jwt.guard";
import { MailGetDto } from "./model/dto/mail-get.dto";
import { MailPageDto } from "./model/dto/mail-page.dto";
import { MailSendDto } from "./model/dto/mail-send.dto";
import { MailDto } from "./model/dto/mail.dto";
import { MailService } from "./service/mail.service";

@Controller('mail')
@UseGuards(JwtAuthGuard)
@ApiTags('MailController')
export class MailController {

    constructor (
        private mailService: MailService,
    ) {}

    @Post('send')
    @ApiOkResponse({ type: MailDto })
    send(@Request() req: AuthorizedRequest, @Body() dto: MailSendDto): Promise<MailDto> {
        return this.mailService.sendMail(req.user.id, dto);
    }

    @Post('read/:id')
    @ApiOkResponse({ type: MailDto })
    read(@Request() req: AuthorizedRequest, @Param('id') id: string): Promise<MailDto> {
        return this.mailService.readMail(req.user.id, +id);
    }

    @Post('checkUnread')
    @ApiOkResponse({ type: MailPageDto })
    checkUnread(@Request() req: AuthorizedRequest): Promise<MailPageDto> {
        return this.mailService.checkUnreadMails(req.user.id);
    }

    @Post('getAll')
    @ApiOkResponse({ type: MailPageDto })
    getAll(@Request() req: AuthorizedRequest, @Body() dto: MailGetDto): Promise<MailPageDto> {
        return this.mailService.getAllMails(req.user.id, dto);
    }
}
