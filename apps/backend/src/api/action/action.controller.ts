import { Body, Controller, Post, UseGuards, Request, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DragonActionDto } from 'src/api/dragons/dragon-action/model/dto/dragon-action.dto';
import { ExpeditionReportDto } from 'src/api/dragons/dragon-action/model/dto/expedition-result.dto';
import { StartExpeditionDto } from 'src/api/dragons/dragon-action/model/dto/expedition-start.dto';
import { DragonAdoptDto } from 'src/api/dragons/dragon/model/dto/dragon-adopt.dto';
import { DragonDto } from 'src/api/dragons/dragon/model/dto/dragon.dto';
import { DragonFeedDto } from 'src/api/dragons/dragon/model/dto/dragon-feed.dto';
import { AuctionBuyResultDto } from 'src/api/items/auction/model/dto/auction-buy-result.dto';
import { AuthorizedRequest } from 'src/common/definitions/requests';
import { ActionDragonService } from './service/action-dragon.service';
import { ActionEventService } from './service/action-event.service';
import { ActionItemService } from './service/action-item.service';
import { JwtAuthGuard } from '../users/auth/util/jwt.guard';
import { DragonEquipDto } from '../dragons/dragon/model/dto/dragon-equip.dto';
import { DragonChangeNatureDto, DragonRenameDto } from '../dragons/dragon/model/dto/dragon-tamer-params.dto';
import { DragonSummonDto } from '../dragons/dragon/model/dto/dragon-summon.dto';
import { BoosterActivateDto } from '../items/alchemy/model/dto/booster-activate.dto';
import { Roles } from '../users/auth/util/roles.decorator';
import { RolesGuard } from '../users/auth/util/roles.guard';
import { UserRole } from '../users/user/model/definitions/users';

@Controller('action')
@UseGuards(JwtAuthGuard)
@ApiTags('ActionController')
export class ActionController {
    constructor(
        private actionDragonService: ActionDragonService,
        private actionEventService: ActionEventService,
        private actionItemService: ActionItemService,
    ) {}

    @Post('checkAllAchievements')
    @UseGuards(RolesGuard)
    @Roles(UserRole.Administrator, UserRole.Moderator)
    @ApiOkResponse({ type: DragonDto })
    checkAllAchievements(): Promise<void> {
        return this.actionDragonService.checkAllAchievements();
    }

    @Post('adoptDragon')
    @ApiOkResponse({ type: DragonDto })
    adoptDragon(@Request() req: AuthorizedRequest, @Body() dto: DragonAdoptDto): Promise<DragonDto> {
        return this.actionDragonService.adoptDragon(req.user.id, dto);
    }

    @Post('summonDragon')
    @ApiOkResponse({ type: DragonDto })
    summonDragon(@Request() req: AuthorizedRequest, @Body() dto: DragonSummonDto): Promise<DragonDto> {
        return this.actionDragonService.summonDragon(req.user.id, dto);
    }

    @Post('feedDragon')
    @ApiOkResponse({ type: DragonDto })
    feedDragon(@Request() req: AuthorizedRequest, @Body() dto: DragonFeedDto): Promise<DragonDto> {
        return this.actionDragonService.feedDragon(req.user.id, dto);
    }

    @Post('activateBooster')
    @ApiOkResponse()
    activateBooster(@Request() req: AuthorizedRequest, @Body() dto: BoosterActivateDto): Promise<void> {
        return this.actionDragonService.activateBooster(req.user, dto);
    }

    @Post('equipDragon')
    @ApiOkResponse({ type: DragonDto })
    equipDragon(@Request() req: AuthorizedRequest, @Body() dto: DragonEquipDto): Promise<DragonDto> {
        return this.actionDragonService.equipDragon(req.user.id, dto);
    }

    @Post('unequipDragon')
    @ApiOkResponse({ type: DragonDto })
    unequipDragon(@Request() req: AuthorizedRequest, @Body() dto: DragonEquipDto): Promise<DragonDto> {
        return this.actionDragonService.unequipDragon(req.user.id, dto);
    }

    @Post('renameDragon')
    @ApiOkResponse({ type: DragonDto })
    renameDragon(@Request() req: AuthorizedRequest, @Body() dto: DragonRenameDto): Promise<DragonDto> {
        return this.actionDragonService.renameDragon(req.user.id, dto);
    }

    @Post('resetDragonSkills/:id')
    @ApiOkResponse({ type: DragonDto })
    resetDragonSkills(@Request() req: AuthorizedRequest, @Param('id') id: string): Promise<DragonDto> {
        return this.actionDragonService.resetDragonSkills(req.user.id, +id);
    }

    @Post('restoreDragonStamina/:id')
    @ApiOkResponse({ type: DragonDto })
    restoreDragonStamina(@Request() req: AuthorizedRequest, @Param('id') id: string): Promise<DragonDto> {
        return this.actionDragonService.restoreDragonStamina(req.user.id, +id);
    }

    @Post('changeDragonNature')
    @ApiOkResponse({ type: DragonDto })
    changeDragonNature(
        @Request() req: AuthorizedRequest,
        @Body() dto: DragonChangeNatureDto,
    ): Promise<DragonDto> {
        return this.actionDragonService.changeDragonNature(req.user.id, dto);
    }

    @Post('ascentDragonPower/:id')
    @ApiOkResponse({ type: DragonDto })
    ascentDragonPower(@Request() req: AuthorizedRequest, @Param('id') id: string): Promise<DragonDto> {
        return this.actionDragonService.ascentDragonPower(req.user.id, +id);
    }

    @Post('releaseDragon/:id')
    @ApiOkResponse()
    releaseDragon(@Request() req: AuthorizedRequest, @Param('id') id: string) {
        return this.actionDragonService.releaseDragon(req.user.id, +id);
    }

    @Post('startExpedition')
    @ApiOkResponse({ type: DragonActionDto })
    startExpedition(
        @Request() req: AuthorizedRequest,
        @Body() dto: StartExpeditionDto,
    ): Promise<DragonActionDto> {
        return this.actionEventService.startExpedition(req.user.id, dto);
    }

    @Post('checkExpeditions')
    @ApiOkResponse({ type: [ExpeditionReportDto] })
    checkExpeditions(@Request() req: AuthorizedRequest): Promise<ExpeditionReportDto[]> {
        return this.actionEventService.checkExpeditions(req.user.id);
    }

    @Post('extendDragonLimit')
    @ApiOkResponse()
    extendDragonLimit(@Request() req: AuthorizedRequest): Promise<void> {
        return this.actionEventService.extendDragonLimit(req.user.id);
    }

    @Post('buyAuction/:id')
    @ApiOkResponse({ type: AuctionBuyResultDto })
    async buyAuction(
        @Request() req: AuthorizedRequest,
        @Param('id') id: string,
    ): Promise<AuctionBuyResultDto> {
        return this.actionItemService.buyAuction(req.user.id, +id);
    }

    @Post('decomposeItem/:id')
    @ApiOkResponse()
    decomposeItem(@Request() req: AuthorizedRequest, @Param('id') itemId: number): Promise<number> {
        return this.actionItemService.decomposeItem(req.user.id, itemId);
    }
}
