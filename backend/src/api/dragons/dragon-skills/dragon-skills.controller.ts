import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/users/auth/util/jwt.guard";
import { GetSkillsDto } from "./model/dto/get-skills.dto";
import { SkillDto } from "./model/dto/skill.dto";
import { DragonSkillsService } from "./service/dragon-skills.service";

@Controller('dragonSkills')
// @UseGuards(JwtAuthGuard)
@ApiTags('DragonSkillsController')
export class DragonSkillsController {

    constructor(
        private dragonSkillsService: DragonSkillsService
    ) {}

    @Post('getSkills')
    @ApiOkResponse({ type: [SkillDto] })
    getSkills(@Body() dto: GetSkillsDto): Promise<SkillDto[]> {
      return this.dragonSkillsService.getSkills(dto);
    }
}
