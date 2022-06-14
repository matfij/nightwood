import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class BattleStartDto {

    @IsNumber()
    @ApiProperty()
    ownedDragonId: number;
    
    @IsNumber()
    @ApiProperty()
    enemyDragonId: number;
}

export class BattleGuardianStartDto {

    @IsNumber()
    @ApiProperty()
    ownedDragonId: number;

    @IsString()
    @ApiProperty()
    expeditionUid: string;
}
