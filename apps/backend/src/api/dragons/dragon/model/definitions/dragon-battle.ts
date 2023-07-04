import { DragonBattleDto } from "../dto/dragon-battle.dto";

export interface TurnResult {
    attacker: DragonBattleDto;
    defender: DragonBattleDto;
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
