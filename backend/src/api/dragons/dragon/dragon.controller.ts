import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors, Request } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/users/auth/util/jwt.guard";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { PaginationInterceptor } from "src/common/interceptors/pagination.interceptor";
import { LearnskillDto } from "../dragon-skills/model/dto/learn-skill.dto";
import { BattleResultDto } from "./model/dto/battle-result.dto";
import { CreateDragonDto } from "./model/dto/create-dragon.dto";
import { DragonDto } from "./model/dto/dragon.dto";
import { GetDragonDto } from "./model/dto/get-dragon.dto";
import { PageDragonDto } from "./model/dto/page-dragon.dto";
import { StartBattleDto } from "./model/dto/start-battle.dto";
import { DragonService } from "./service/dragon.service";

@Controller('dragon')
@UseGuards(JwtAuthGuard)
@ApiTags('DragonController')
export class DragonController {

    constructor(
        private dragonService: DragonService
    ) {}

    @Post('create')
    @ApiOkResponse({ type: DragonDto })
    create(@Body() dto: CreateDragonDto): Promise<DragonDto> {
        return this.dragonService.create(dto);
    }

    @Get('getOne/:id')
    @ApiOkResponse({ type: DragonDto })
    getOne(@Param('id') id: string): Promise<DragonDto> {
        return this.dragonService.getOne(id);
    }

    @Post('getAll')
    @UseInterceptors(PaginationInterceptor)
    @ApiOkResponse({ type: PageDragonDto })
    getAll(@Body() dto: GetDragonDto): Promise<PageDragonDto> {
        return this.dragonService.getAll(dto);
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
    startBattle(@Request() req: AuthorizedRequest, @Body() dto: StartBattleDto): Promise<BattleResultDto> {
        return this.dragonService.startBattle(req.user.id!, dto);
    }

    @Post('learnSkill')
    @ApiOkResponse({ type: DragonDto })
    learnSkill(@Request() req: AuthorizedRequest, @Body() dto: LearnskillDto): Promise<DragonDto> {
      return this.dragonService.learnSkill(req.user.id, dto);
    }
}
