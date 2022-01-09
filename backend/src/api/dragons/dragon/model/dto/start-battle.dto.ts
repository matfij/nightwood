import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class StartBattleDto {

    @IsNumber()
    @ApiProperty()
    ownedDragonId: number;
    
    @IsNumber()
    @ApiProperty()
    enemyDragonId: number;
}
