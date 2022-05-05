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

    @ApiProperty()
    critChance: number;

    @ApiProperty()
    critPower: number;

    @ApiProperty()
    dodgeChance: number;
}

export interface TurnResult {
    attacker: BattleDragon;
    defender: BattleDragon;
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
