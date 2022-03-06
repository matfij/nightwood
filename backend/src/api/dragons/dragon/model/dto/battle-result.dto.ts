import { ApiProperty } from "@nestjs/swagger";
import { BattleDragon } from "../definitions/dragon-battle";

export class BattleResultDto {

    @ApiProperty()
    ownedDragon: Partial<BattleDragon>;

    @ApiProperty()
    enemyDragon: Partial<BattleDragon>;

    @ApiProperty()
    logs: string[];

    @ApiProperty()
    result: string;
}
