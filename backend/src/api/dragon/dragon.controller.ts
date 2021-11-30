import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/util/jwt.guard";
import { CreateDragonDto } from "./model/dto/create-dragon.dto";
import { DragonDto } from "./model/dto/dragon.dto";
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
}
