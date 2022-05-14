import { ApiProperty } from "@nestjs/swagger";
import { BattleDragonDto } from "../definitions/dragon-battle";

export class BattleResultDto {

    @ApiProperty()
    ownedDragon: Partial<BattleDragonDto>;

    @ApiProperty()
    enemyDragon: Partial<BattleDragonDto>;

    @ApiProperty()
    logs: string[];

    @ApiProperty()
    result: string;
}
