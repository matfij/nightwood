import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../users/auth/util/jwt.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ActionDragonTourneamentService } from './service/action-dragon-tournament.service';
import { UserRole } from '../users/user/model/definitions/users';
import { Roles } from '../users/auth/util/roles.decorator';
import { RolesGuard } from '../users/auth/util/roles.guard';

@Controller('actionAdmin')
@UseGuards(JwtAuthGuard)
@ApiTags('ActionAdminController')
export class ActionAdminController {
    constructor(private actionDragonTourneamentService: ActionDragonTourneamentService) {}

    @Post('/awardTournamentWinners')
    @UseGuards(RolesGuard)
    @Roles(UserRole.Administrator)
    @ApiOkResponse()
    awardTournamentWinners(): Promise<void> {
        return this.actionDragonTourneamentService.awardTournamentWinners();
    }
}
