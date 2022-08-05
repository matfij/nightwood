import { Controller, Post, UseGuards, Request } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { JwtAuthGuard } from "../auth/util/jwt.guard";
import { AchievementDto } from "./model/dto/achievement.dto";
import { AchievementsDto } from "./model/dto/achievements.dto";
import { AchievementsService } from "./service/achievements.service";

@Controller('achievements')
@UseGuards(JwtAuthGuard)
@ApiTags('AchievementsController')
export class AchievementsController {
    
    constructor(
        private achievementsService: AchievementsService
    ) {}

    @Post('getUserAchievements')
    @ApiOkResponse({ type: AchievementsDto})
    getUserAchievements(@Request() req: AuthorizedRequest): Promise<AchievementsDto> {
        return this.achievementsService.getUserAchievements(req.user.id);
    }

    @Post('getAllAchievements')
    @ApiOkResponse({ type: [AchievementDto]})
    getAllAchievements(): Promise<AchievementDto[]> {
        return this.achievementsService.getAllAchievements();
    }

}
