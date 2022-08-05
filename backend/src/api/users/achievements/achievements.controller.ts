import { Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/util/jwt.guard";
import { AchievementsService } from "./service/achievements.service";

@Controller('achievements')
@UseGuards(JwtAuthGuard)
@ApiTags('AchievementsController')
export class AchievementsController {
    
    constructor(
        private achievementsService: AchievementsService
    ) {}

    @Post('getCompleted')
    getCompleted() {

    }

}
