import { ApiProperty } from "@nestjs/swagger";
import { BattleResult } from "../definitions/dragon-battle";
import { DragonDto } from "./dragon.dto";

export class BattleResultDto {

    @ApiProperty()
    ownedDragon: DragonDto;

    @ApiProperty()
    enemyDragon: DragonDto;

    @ApiProperty({ enum: BattleResult, enumName: 'BattleResult'})
    result: BattleResult;
}
