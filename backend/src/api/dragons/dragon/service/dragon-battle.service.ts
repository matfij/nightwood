import { Injectable } from "@nestjs/common";
import { BattleDragon, TurnResult } from "../model/definitions/dragon-battle";
import { BattleResultDto } from "../model/dto/battle-result.dto";
import { DragonDto } from "../model/dto/dragon.dto";

@Injectable()
export class DragonBattleService {

    private readonly BASE_HEALTH = 100;
    private readonly BASE_MANA = 20;
    private readonly BASE_DAMAGE = 10;
    private readonly BASE_ARMOR = 5;
    private readonly BASE_SPEED = 10;

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
            result = `<div class="owned">${owned.name} won, gained ${(1000 * Math.random()).toFixed()} experience.</div>`;
        } else {
            result =`<div class="enemy">${enemy.name} won</div>` ;
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

        // check if hit

        // check if critical

        const baseHit = attacker.damage - defender.armor;
        defender.health -= baseHit;

        const log = `
            <div class="${cssClasses}">
                ${attacker.name} (${attacker.health.toFixed(1)}) 
                strikes 
                ${defender.name} (${defender.health.toFixed(1)}) 
                for ${baseHit.toFixed(1)}.
            </div>`;

        return {
            attacker: attacker,
            defender: defender,
            log: log,
        };
    }
}
