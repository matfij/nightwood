import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/users/auth/util/jwt.guard";
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
    create(@Request() req: any, @Body() dto: CreateDragonDto): Promise<DragonDto> {
        console.log(req.user)
        return this.dragonService.create(req.user.id, dto);
    }
}
