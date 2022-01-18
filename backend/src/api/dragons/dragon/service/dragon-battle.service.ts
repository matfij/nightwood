import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MathService } from "src/common/services/math.service";
import { Repository } from "typeorm";
import { BattleDragon, TurnResult } from "../model/definitions/dragon-battle";
import { Dragon } from "../model/dragon.entity";
import { BattleResultDto } from "../model/dto/battle-result.dto";
import { DragonDto } from "../model/dto/dragon.dto";

@Injectable()
export class DragonBattleService {

    private readonly BASE_HEALTH = 100;
    private readonly BASE_MANA = 20;
    private readonly BASE_DAMAGE = 10;
    private readonly BASE_ARMOR = 5;
    private readonly BASE_SPEED = 10;

    constructor (
        @InjectRepository(Dragon)
        private dragonRepository: Repository<Dragon>,
        private mathService: MathService,
    ) {}

    async executeBattle(ownedDragon: DragonDto, enemyDragon: DragonDto): Promise<Partial<BattleResultDto>> {
        let owned = this.calculateBattleStats(ownedDragon);
        let enemy = this.calculateBattleStats(enemyDragon);

        const logs = [];
        let result = '';

        while (owned.health > 0 && enemy.health > 0) {
            let turnResult: TurnResult;

            if (owned.initiative > enemy.initiative) {
                turnResult = this.performMovement(owned, enemy, true);
                owned = turnResult.attacker;
                enemy = turnResult.defender;
            } else {
                turnResult = this.performMovement(enemy, owned, false);
                owned = turnResult.defender;
                enemy = turnResult.attacker;
            }
            logs.push(turnResult.log);
        }

        if (owned.health > enemy.health) {
            owned = await this.saveBattleResults(true, owned, enemy, logs.length);
            const gainedExperience = owned.experience - ownedDragon.experience;
            result = `<div class="owned">${owned.name} won and gained ${gainedExperience} experience.</div>`;
        } else {
            owned = await this.saveBattleResults(false, owned, enemy, logs.length);
            result =`<div class="enemy">${enemy.name} won.</div>` ;
        }

        return {
            ownedDragon: owned,
            enemyDragon: enemy,
            logs: logs,
            result: result,
        };
    }

    private calculateBattleStats(dragon: DragonDto): BattleDragon {
        const health = this.BASE_HEALTH + 5 * dragon.endurance + 2 * dragon.strength + dragon.will;
        const mana = this.BASE_MANA + 5 * dragon.will;
        const damage = this.BASE_DAMAGE + dragon.strength + 0.1 * dragon.dexterity;
        const armor = this.BASE_ARMOR + 0.5 * dragon.endurance + 0.1 * dragon.strength;
        const speed = this.BASE_SPEED + 1.5 * dragon.dexterity;

        const initiative = 1 * speed;

        return {
            ...dragon,
            health: health,
            mana: mana,
            damage: damage,
            armor: armor,
            speed: speed,
            initiative: initiative,
        };
    }

    private performMovement(attacker: BattleDragon, defender: BattleDragon, ownedTurn: boolean): TurnResult {
        let cssClasses = ownedTurn ? 'item-log log-owned' : 'item-log log-enemy';

        defender.initiative += defender.speed;

        /**
         * Dodge chance
         */
        const hitChance = 0.5 + Math.random();
        let dodgeChance = Math.random() + 0.5 * Math.min(1, (defender.dexterity - 0.4 * attacker.dexterity) / (defender.level + 5));
        dodgeChance = this.mathService.limit(0.6, dodgeChance, 1.1);

        if (dodgeChance > hitChance) {
            const log = `
                <div class="${cssClasses}">
                    ${attacker.name} (${attacker.health.toFixed(1)}) 
                    missess.
                </div>`;

            return { attacker: attacker, defender: defender, log: log };
        }

        /**
         * Critical chance
         */
        const nocritChance = 0.5 + Math.random();
        let critChance = Math.random() + 0.5 * Math.min(0.5, attacker.luck / attacker.level);
        critChance = this.mathService.limit(0.6, critChance, 1);

        if (critChance > nocritChance) {
            const baseHit = 
                this.mathService.randRange(0.9, 1.2) 
                * (1.25 + (attacker.strength / attacker.level)) 
                * attacker.damage - defender.armor;
            defender.health -= baseHit;

            cssClasses += ' log-crit';
            const log = `
                <div class="${cssClasses}">
                    ${attacker.name} (${attacker.health.toFixed(1)}) 
                    critically strikes 
                    ${defender.name} (${defender.health.toFixed(1)}) 
                    for ${baseHit.toFixed(1)}.
                </div>`;

            return { attacker: attacker, defender: defender, log: log };
        }

        /**
         * Regular hit
         */
        const baseHit = this.mathService.randRange(0.9, 1.2) * attacker.damage - defender.armor;
        defender.health -= baseHit;

        const log = `
            <div class="${cssClasses}">
                ${attacker.name} (${attacker.health.toFixed(1)}) 
                strikes 
                ${defender.name} (${defender.health.toFixed(1)}) 
                for ${baseHit.toFixed(1)}.
            </div>`;

        return { attacker: attacker, defender: defender, log: log };
    }

    private async saveBattleResults(ownedWin: boolean, owned: BattleDragon, enemy: BattleDragon, battleLength: number): Promise<BattleDragon> {
        if (ownedWin) {
            let gainedExperience = 10 
                + this.mathService.randRange(0.7, 1.2) * (enemy.level - owned.level)
                + this.mathService.randRange(0.05, 0.12) * battleLength;
            gainedExperience = Math.round(this.mathService.limit(10, gainedExperience, 1000));
            
            owned.experience += gainedExperience;
        }
        
        owned.stamina -= 1 + Math.floor(battleLength / 10);
        if (owned.stamina < 0) owned.stamina = 0;
        
        await this.dragonRepository.update(owned.id, { experience: owned.experience, stamina: owned.stamina });
        return owned;
    }
}
