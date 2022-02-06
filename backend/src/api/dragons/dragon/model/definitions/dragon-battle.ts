import { ApiProperty } from "@nestjs/swagger";
import { DragonDto } from "../dto/dragon.dto"

export class BattleDragon extends DragonDto {

    @ApiProperty()
    maxHealth: number;

    @ApiProperty()
    health: number;

    @ApiProperty()
    maxMana: number;

    @ApiProperty()
    mana: number;

    @ApiProperty()
    damage: number;

    @ApiProperty()
    armor: number;

    @ApiProperty()
    speed: number;

    @ApiProperty()
    initiative: number;
}

export interface TurnResult {
    attacker: BattleDragon;
    defender: BattleDragon;
    log: string;
}
