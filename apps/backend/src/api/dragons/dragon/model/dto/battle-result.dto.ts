import { ApiProperty } from "@nestjs/swagger";
import { DragonBattleDto } from "./dragon-battle.dto";

export class BattleResultDto {

    @ApiProperty()
    ownedDragon: Partial<DragonBattleDto>;

    @ApiProperty()
    enemyDragon: Partial<DragonBattleDto>;

    @ApiProperty()
    logs: string[];

    @ApiProperty()
    result: string;
}
