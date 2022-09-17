import { Controller, UseGuards, Post, Request } from "@nestjs/common";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { JwtAuthGuard } from "../auth/util/jwt.guard";
import { PenaltyService } from "./service/penalty.service";

@Controller('penalty')
@UseGuards(JwtAuthGuard)
@ApiTags('PenaltyController')
export class PenaltyController {

    constructor(
        private penaltyService: PenaltyService,
    ) {}

    @Post('imposePenalty')
    @ApiOkResponse()
    imposePenalty(@Request() req: AuthorizedRequest): Promise<void> {
        return this.penaltyService.imposePenalty(req.user);
    }
}
