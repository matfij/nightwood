import { Controller, UseGuards, Post, Request, Body } from "@nestjs/common";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { JwtAuthGuard } from "../auth/util/jwt.guard";
import { Roles } from "../auth/util/roles.decorator";
import { RolesGuard } from "../auth/util/roles.guard";
import { UserRole } from "../user/model/definitions/users";
import { PenaltyImposeDto } from "./model/dto/penalty-impose.dto";
import { PenaltyService } from "./service/penalty.service";

@Controller('penalty')
@UseGuards(JwtAuthGuard)
@ApiTags('PenaltyController')
export class PenaltyController {

    constructor(
        private penaltyService: PenaltyService,
    ) {}

    @UseGuards(RolesGuard)
    @Roles(UserRole.Administrator, UserRole.Moderator)
    @Post('imposePenalty')
    @ApiOkResponse()
    imposePenalty(@Request() req: AuthorizedRequest, @Body() dto: PenaltyImposeDto): Promise<void> {
        return this.penaltyService.imposePenalty(req.user, dto);
    }
}
