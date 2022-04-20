import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors, Request } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/users/auth/util/jwt.guard";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { PaginationInterceptor } from "src/common/interceptors/pagination.interceptor";
import { SkillLearnDto } from "../dragon-skills/model/dto/skill-learn.dto";
import { BattleResultDto } from "./model/dto/battle-result.dto";
import { DragonCreateDto } from "./model/dto/dragon-create.dto";
import { DragonDto } from "./model/dto/dragon.dto";
import { DragonGetDto } from "./model/dto/dragon-get.dto";
import { DragonPageDto } from "./model/dto/dragon-page.dto";
import { BattleStartDto } from "./model/dto/battle-start.dto";
import { DragonService } from "./service/dragon.service";
import { DragonTamerActionDto } from "./model/dto/dragon-tamer-actions.dto";

@Controller('dragon')
@UseGuards(JwtAuthGuard)
@ApiTags('DragonController')
export class DragonController {

    constructor(
        private dragonService: DragonService
    ) {}

    @Post('create')
    @ApiOkResponse({ type: DragonDto })
    create(@Body() dto: DragonCreateDto): Promise<DragonDto> {
        return this.dragonService.create(dto);
    }

    @Get('getOne/:id')
    @ApiOkResponse({ type: DragonDto })
    getOne(@Param('id') id: string): Promise<DragonDto> {
        return this.dragonService.getOne(id);
    }

    @Post('getAll')
    @UseInterceptors(PaginationInterceptor)
    @ApiOkResponse({ type: DragonPageDto })
    getAll(@Body() dto: DragonGetDto): Promise<DragonPageDto> {
        return this.dragonService.getAll(dto);
    }

    @Post('getBest')
    @UseInterceptors(PaginationInterceptor)
    @ApiOkResponse({ type: DragonPageDto })
    getBest(@Body() dto: DragonGetDto): Promise<DragonPageDto> {
        return this.dragonService.getBest(dto);
    }

    @Post('getOwned')
    @UseInterceptors(PaginationInterceptor)
    @ApiOkResponse({ type: [DragonDto] })
    getOwned(@Request() req: AuthorizedRequest): Promise<DragonDto[]> {
        return this.dragonService.getOwnedDragons(req.user.id!);
    }

    @Post('startBattle')
    @UseInterceptors(PaginationInterceptor)
    @ApiOkResponse({ type: BattleResultDto })
    startBattle(@Request() req: AuthorizedRequest, @Body() dto: BattleStartDto): Promise<BattleResultDto> {
        return this.dragonService.startBattle(req.user.id!, dto);
    }

    @Post('learnSkill')
    @ApiOkResponse({ type: DragonDto })
    learnSkill(@Request() req: AuthorizedRequest, @Body() dto: SkillLearnDto): Promise<DragonDto> {
      return this.dragonService.learnSkill(req.user.id, dto);
    }

    @Post('getTamerActions')
    @ApiOkResponse({ type: [DragonTamerActionDto] })
    getTamerActions(): Promise<DragonTamerActionDto[]> {
      return this.dragonService.getTamerActions();
    }
}
