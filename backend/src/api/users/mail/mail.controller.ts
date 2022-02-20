import { Controller, Post, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/util/jwt.guard";

@Controller('mail')
@UseGuards(JwtAuthGuard)
@ApiTags('MailController')
export class MailController {

    constructor (

    ) {}

    @Post('send')
    @ApiOkResponse()
    send() {

    }

    @Post('checkUnread')
    @ApiOkResponse()
    checkUnread() {

    }

    @Post('getAll')
    @ApiOkResponse()
    getAll() {

    }
}
