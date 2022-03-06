import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class BattleStartDto {

    @IsNumber()
    @ApiProperty()
    ownedDragonId: number;
    
    @IsNumber()
    @ApiProperty()
    enemyDragonId: number;
}
