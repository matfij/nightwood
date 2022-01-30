import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/users/auth/util/jwt.guard";
import { DragonSkillsService } from "./service/dragon-skills.service";

@Controller('dragonSkills')
@UseGuards(JwtAuthGuard)
@ApiTags('DragonSkillsController')
export class DragonSkillsController {

    constructor(
        private dragonSkillsService: DragonSkillsService
    ) {}
}
