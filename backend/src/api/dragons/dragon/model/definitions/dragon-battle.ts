import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { DragonDto } from "../dto/dragon.dto"

export class BattleDragonDto extends PartialType(DragonDto) {

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
}

export interface TurnResult {
    attacker: BattleDragonDto;
    defender: BattleDragonDto;
    log: string;

    cssClasses?: string;
    skip?: boolean;
}

export enum BattleResultType {
    Win,
    Loss,
    Draw,
}

export interface BattleResultExperience {
    ownedExperience: number;
    enemyExperience: number;
}
