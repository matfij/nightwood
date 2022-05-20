import { Body, Controller, Post, UseGuards, Request, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/users/auth/util/jwt.guard';
import { AuthorizedRequest } from 'src/common/definitions/requests';
import { ItemDto } from '../item/model/dto/item.dto';
import { MixtureRecipeDto } from './model/definitions/mixture-recipe.dto';
import { MixtureComposeDto } from './model/dto/mixture-compose.dto';
import { MixtureDto } from './model/dto/mixture.dto';
import { AlchemyService } from './service/alchemy.service';

@Controller('alchemy')
@UseGuards(JwtAuthGuard)
@ApiTags('AlchemyController')
export class AlchemyController {

    constructor(
        private alchemyService: AlchemyService
    ) {}

    @Post('getMixtureRecipes')
    @ApiOkResponse({ type: [MixtureRecipeDto] })
    getMixtureRecipes(): Promise<MixtureRecipeDto[]> {
        return this.alchemyService.getMixtureRecipes();
    }

    @Post('prepareMixture')
    @ApiOkResponse({ type: MixtureDto })
    composeMixture(@Request() req: AuthorizedRequest, @Body() dto: MixtureComposeDto): Promise<MixtureDto> {
        return this.alchemyService.composeMixture(req.user, dto);
    }

    @Post('prepareMixture/:id')
    @ApiOkResponse({ type: ItemDto })
    collectMixture(@Request() req: AuthorizedRequest, @Param('id') id: string): Promise<ItemDto> {
        return this.alchemyService.collectMixture(req.user, +id);
    }
}
