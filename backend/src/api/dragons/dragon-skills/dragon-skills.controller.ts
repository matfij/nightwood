import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/users/auth/util/jwt.guard";
import { SkillGetDto } from "./model/dto/skill-get.dto";
import { SkillDto } from "./model/dto/skill.dto";
import { DragonSkillsService } from "./service/dragon-skills.service";

@Controller('dragonSkills')
@UseGuards(JwtAuthGuard)
@ApiTags('DragonSkillsController')
export class DragonSkillsController {

    constructor(
      private dragonSkillsService: DragonSkillsService
    ) {}

    @Post('getSkills')
    @ApiOkResponse({ type: [SkillDto] })
    getSkills(@Body() dto: SkillGetDto): Promise<SkillDto[]> {
      return this.dragonSkillsService.getSkills(dto);
    }
}
