import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/users/auth/util/jwt.guard";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "src/configuration/user.config";
import { CreateDragonDto } from "./model/dto/create-dragon.dto";
import { DragonDto } from "./model/dto/dragon.dto";
import { GetDragonDto } from "./model/dto/get-dragon.dto";
import { PageDragonDto } from "./model/dto/page-dragon.dto";
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
    create(@Request() req: AuthorizedRequest, @Body() dto: CreateDragonDto): Promise<DragonDto> {
        return this.dragonService.create(req.user.id, dto);
    }

    @Get('getOne/:id')
    @ApiOkResponse({ type: DragonDto })
    getOne(@Param('id') id: string): Promise<DragonDto> {
        return this.dragonService.getOne(id);
    }

    @Get('getAll')
    @ApiOkResponse({ type: PageDragonDto })
    getAll(@Body() dto: GetDragonDto): Promise<PageDragonDto> {
        // todo - add default pagination middleware
        dto.page = dto.page ?? DEFAULT_PAGE;
        dto.limit = dto.limit ?? DEFAULT_LIMIT;

        return this.dragonService.getAll(dto);
    }
}
