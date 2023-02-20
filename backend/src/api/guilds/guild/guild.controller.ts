import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/users/auth/util/jwt.guard";
import { GuildService } from "./service/guild.service";

@Controller('guild')
@UseGuards(JwtAuthGuard)
@ApiTags('GuildController')
export class GuildController {

    constructor(
        private guildService: GuildService,
    ) {}

}
