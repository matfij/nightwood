import { ApiProperty } from "@nestjs/swagger";
import { BattleDragon } from "../definitions/dragon-battle";

export class BattleResultDto {

    @ApiProperty()
    ownedDragon: BattleDragon;

    @ApiProperty()
    enemyDragon: BattleDragon;

    @ApiProperty()
    logs: string[];

    @ApiProperty()
    result: string;
}
