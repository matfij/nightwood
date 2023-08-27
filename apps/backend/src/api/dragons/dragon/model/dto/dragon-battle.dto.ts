import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { DragonDto } from "./dragon.dto"

export class DragonBattleDto extends PartialType(DragonDto) {

    @ApiProperty()
    maxHealth: number;

    @ApiProperty()
    health: number;

    @ApiProperty()
    maxMana: number;

    @ApiProperty()
    mana: number;

    @ApiProperty()
    manaRegen: number;

    @ApiProperty()
    physicalAttack: number;

    @ApiProperty()
    magicalAttack: number;

    @ApiProperty()
    armor: number;

    @ApiProperty()
    resistance: number;

    @ApiProperty()
    speed: number;

    @ApiProperty()
    initiative: number;

    @ApiProperty()
    critChance: number;

    @ApiProperty()
    critPower: number;

    @ApiProperty()
    dodgeChance: number;

    @ApiProperty()
    healthRegen: number;

    @ApiPropertyOptional()
    deepWounds: number;

    @ApiPropertyOptional()
    blazeScar: number;

    @ApiPropertyOptional()
    critBoost: CritBoost;
}

export interface CritBoost {
    extraChance: number;
    turnLeft: number;
}
