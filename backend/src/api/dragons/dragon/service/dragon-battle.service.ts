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

        while (owned.health > 0 && enemy.health > 0 && logs.length <= 100) {
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

        if (logs.length >= 100) {
            result =`<div class="neither">The battle did not found a winner.</div>`;
        } else if (owned.health > enemy.health) {
            owned = await this.saveBattleResults(true, owned, enemy, logs.length);
            const gainedExperience = owned.experience - ownedDragon.experience;
            result = `<div class="owned">${owned.name} won and gained ${gainedExperience} experience.</div>`;
        } else {
            owned = await this.saveBattleResults(false, owned, enemy, logs.length);
            result =`<div class="enemy">${enemy.name} won.</div>`;
        }

        return {
            ownedDragon: { id: owned.id, name: owned.name, level: owned.level, stamina: owned.stamina, },
            enemyDragon: { id: enemy.id, name: enemy.name, level: enemy.level, },
            logs: logs,
            result: result,
        };
    }

    private calculateBattleStats(dragon: DragonDto): BattleDragon {
        let health = this.BASE_HEALTH + 5 * dragon.endurance + 2 * dragon.strength + dragon.will;
        let mana = this.BASE_MANA + 5 * dragon.will;
        let damage = this.BASE_DAMAGE + dragon.strength + 0.1 * dragon.dexterity;
        let armor = this.BASE_ARMOR + 0.5 * dragon.endurance + 0.1 * dragon.strength;
        let speed = this.BASE_SPEED + 1.5 * dragon.dexterity;

        health = health * (1 + dragon.skills.greatVigor / 60);
        mana = mana * (1 + dragon.skills.innerFlow / 40);
        speed = speed * (1 + dragon.skills.innateSpeed / 60);

        const initiative = 1 * speed;

        return {
            ...dragon,
            maxHealth: health,
            health: health,
            maxMana: mana,
            mana: mana,
            damage: damage,
            armor: armor,
            speed: speed,
            initiative: initiative,
        };
    }

    private performMovement(attacker: BattleDragon, defender: BattleDragon, ownedTurn: boolean): TurnResult {
        let cssClasses = ownedTurn ? 'item-log log-owned' : 'item-log log-enemy';
        let independentLogs = [];
        let extraLogs = [];
        let isCrit = false;

        /**
         * Preamptive restore effects
         */
        defender.mana += defender.skills.innerFlow;
        defender.initiative += defender.speed;

        /**
         * Dodge chance
         */
        const hitChance = 0.5 + Math.random();
        let dodgeChance = Math.random() + 0.5 * Math.min(1, defender.dexterity - 0.8 * attacker.dexterity);
        dodgeChance = dodgeChance * (1 - attacker.skills.thoughtfulStrike / 60);
        dodgeChance = this.mathService.limit(0.55, dodgeChance, 1.05);

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
        const nocritChance = 0.5 + Math.random();  // 0.5 - 1.5
        let critChance = Math.random() + 0.5 * Math.min(0.5, attacker.luck / (attacker.level + 10));  // 0.25 - 1.25
        critChance = critChance * (1 + attacker.skills.luckyStrike / 40);
        critChance = this.mathService.limit(0.6, critChance, 1.25);

        if (critChance > nocritChance) {
            isCrit = true;
            cssClasses += ' log-crit';
        }

        /**
         * Regular hit
         */
        let baseHit = isCrit 
            ? this.mathService.randRange(1.6, 1.8) * attacker.damage - defender.armor 
            : this.mathService.randRange(0.9, 1.2) * attacker.damage - defender.armor;
        baseHit = this.mathService.limit(5 * Math.random(), baseHit, baseHit);
        defender.health -= baseHit;

        /**
         * Offensive effects
         */
        if (attacker.skills.fireBreath > 0) {
            const baseFireComponent = (1 + attacker.skills.fireBreath / 40) * attacker.will;
            let fireHit = isCrit 
                ? this.mathService.randRange(1.5, 1.6) * baseFireComponent - 0.5 * defender.armor 
                : this.mathService.randRange(0.9, 1.1) * baseFireComponent - 0.5 * defender.armor;
            fireHit = this.mathService.limit(attacker.skills.fireBreath * Math.random(), fireHit, fireHit);
            defender.health -= fireHit;
            extraLogs.push(`<div class="log-extra">+ ${fireHit.toFixed(1)} fire damage</div>`);
        }
        
        if (attacker.skills.pugnaciousStrike > 0 && defender.armor > 0) {
            const armorBreak = attacker.skills.pugnaciousStrike;
            defender.armor -= armorBreak;
            extraLogs.push(`<div class="log-extra">+ broken ${armorBreak.toFixed(1)} armor</div>`);
        }
        
        /**
         * Defensive skills
         */

        if (defender.skills.roughSkin > 0) {
            const reflectedHit = baseHit * defender.skills.roughSkin / 60;
            attacker.health -= reflectedHit;
            extraLogs.push(`<div class="log-extra">- ${defender.name} reflected ${reflectedHit.toFixed(1)} damage</div>`);
        }

        let log = `
            <div class="${cssClasses}">
                ${attacker.name} (${attacker.health.toFixed(1)}) 
                ${isCrit ? 'critically strikes' : 'strikes'} 
                ${defender.name} (${defender.health.toFixed(1)}) 
                for ${baseHit.toFixed(1)}`;
        extraLogs.forEach(extraLog => log += extraLog);
        log += `</div>`;

        /**
         * Post-movement effects
         */
        if (defender.skills.soundBody > 0 && defender.health < defender.maxHealth && defender.health > 0) {
            let restoredHealth = 0.05 * defender.maxHealth * (1 + defender.skills.soundBody / 20);
            defender.health += restoredHealth;
            independentLogs.push(`<div class="item-log log-status">${defender.name} restored ${restoredHealth.toFixed(1)} health.</div>`);
        }

        independentLogs.forEach(independentLog => log += independentLog);

        return { attacker: attacker, defender: defender, log: log };
    }

    private async saveBattleResults(ownedWin: boolean, owned: BattleDragon, enemy: BattleDragon, battleLength: number): Promise<BattleDragon> {
        if (ownedWin) {
            let gainedExperience = 10 * this.mathService.randRange(0.7, 1.3) 
                * Math.log(1 + Math.max(1, (enemy.level - owned.level)));
            gainedExperience = Math.round(this.mathService.limit(1, gainedExperience, 100));

            owned.experience += gainedExperience;
        }

        owned.stamina -= 1 + Math.floor(battleLength / 10);
        if (owned.stamina < 0) owned.stamina = 0;

        await this.dragonRepository.update(owned.id, { experience: owned.experience, stamina: owned.stamina });
        return owned;
    }
}
