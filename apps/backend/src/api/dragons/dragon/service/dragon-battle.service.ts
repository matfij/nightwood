import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MathService } from "src/common/services/math.service";
import { Repository } from "typeorm";
import { ExpeditionDto } from "../../dragon-action/model/dto/expedition.dto";
import { MagicArrow } from "../../dragon-skills/data/skills-common";
import { AirVector, AndromedaArrow, EnchantedBarrier, FireBolt, IceBolt, LaserExedra, LeafCut, RockBlast, SolarBeam, TempestFury, Thunderbolt } from "../../dragon-skills/data/skills-exclusive";
import { DragonBattleDto } from "../model/dto/dragon-battle.dto";
import { Dragon } from "../model/dragon.entity";
import { BattleResultDto } from "../model/dto/battle-result.dto";
import { DragonDto } from "../model/dto/dragon.dto";
import { BattleHelperService } from "./dragon-helper.service";
import { TurnResult, BattleResultType, BattleResultExperience } from "../model/definitions/dragon-battle";
import { zip } from "rxjs";

@Injectable()
export class DragonBattleService {

    constructor (
        @InjectRepository(Dragon)
        private dragonRepository: Repository<Dragon>,
        private battleHelperService: BattleHelperService,
        private mathService: MathService,
    ) {}

    async executeBattle(ownedDragon: DragonDto, enemyDragon: Partial<DragonDto>): Promise<Partial<BattleResultDto>> {
        let owned = this.battleHelperService.calculateBattleStats(ownedDragon);
        let enemy = this.battleHelperService.calculateBattleStats(enemyDragon);

        const logs = this.performInitialMovement(owned, enemy);
        let result = '';

        while (owned.health > 0 && enemy.health > 0 && logs.length <= 100) {
            let turnResult: TurnResult;

            if (owned.initiative > enemy.initiative) {
                turnResult = this.performMovement(owned, enemy, true, logs.length);
                owned = turnResult.attacker;
                enemy = turnResult.defender;
            } else {
                turnResult = this.performMovement(enemy, owned, false, logs.length);
                owned = turnResult.defender;
                enemy = turnResult.attacker;
            }
            logs.push(turnResult.log);
        }

        if (logs.length >= 100) {
            const resultExperience = await this.saveBattleResults(BattleResultType.Draw, owned, enemy, logs.length);
            result =`<div class="neither">The battle did not found a winner. 
                Both participants gained ${resultExperience.ownedExperience} experience.</div>`;
        } else if (owned.health > enemy.health) {
            const resultExperience = await this.saveBattleResults(BattleResultType.Win, owned, enemy, logs.length);
            result = `<div class="owned">${owned.name} won and gained ${resultExperience.ownedExperience} experience.<br>
                ${enemy.name} lost ${resultExperience.enemyExperience} experience.</div>`;
        } else {
            const resultExperience = await this.saveBattleResults(BattleResultType.Loss, owned, enemy, logs.length);
            result = `<div class="enemy">${enemy.name} won and gained ${resultExperience.enemyExperience} experience.<br>
                ${owned.name} lost ${resultExperience.ownedExperience} experience.</div>`;
        }

        return {
            ownedDragon: { id: owned.id, name: owned.name, level: owned.level, stamina: owned.stamina, },
            enemyDragon: { id: enemy.id, name: enemy.name, level: enemy.level, },
            logs: logs,
            result: result,
        };
    }

    async executeGuardianBattle(ownedDragon: DragonDto, expedition: ExpeditionDto): Promise<Partial<BattleResultDto>> {
        let enemyDragon = this.battleHelperService.createDragonFromGuardian(expedition.guardian);
        
        let owned = this.battleHelperService.calculateBattleStats(ownedDragon);
        let enemy = this.battleHelperService.calculateBattleStats(enemyDragon);

        const logs = this.performInitialMovement(owned, enemy);
        let result = '';

        while (owned.health > 0 && enemy.health > 0 && logs.length <= 100) {
            let turnResult: TurnResult;

            if (owned.initiative > enemy.initiative) {
                turnResult = this.performMovement(owned, enemy, true, logs.length);
                owned = turnResult.attacker;
                enemy = turnResult.defender;
            } else {
                turnResult = this.performMovement(enemy, owned, false, logs.length);
                owned = turnResult.defender;
                enemy = turnResult.attacker;
            }
            logs.push(turnResult.log);
        }

        if (logs.length >= 100) {
            await this.saveBattleGuardianResults(BattleResultType.Draw, owned, expedition, logs.length);
            result =`<div class="neither">The battle did not found a winner</div>`;
        } else if (owned.health > enemy.health) {
            await this.saveBattleGuardianResults(BattleResultType.Win, owned, expedition, logs.length);
            result = `<div class="owned">${owned.name} won and gained access to new areas in ${expedition.name}.</div>`;
        } else {
            await this.saveBattleGuardianResults(BattleResultType.Loss, owned, expedition, logs.length);
            result = `<div class="enemy">${owned.name} failed ${enemyDragon.name}'s challenge.</div>`;
        }

        return {
            ownedDragon: { id: owned.id, name: owned.name, level: owned.level, stamina: owned.stamina, },
            enemyDragon: { id: enemy.id, name: enemy.name, level: enemy.level, },
            logs: logs,
            result: result,
        };
    }

    private performInitialMovement(owned: DragonBattleDto, enemy: DragonBattleDto): string[] {
        const logs = [];
        let attacker = owned;
        let defender = enemy;
        
        if (owned.initiative <= enemy.initiative) {
          [attacker, defender] = [defender, attacker];
        }
        
        let initialResult = this.executeOneTimeAttacks({
            attacker: attacker,
            defender: defender,
            log: '',
        });
        [owned, enemy] = [initialResult.attacker, initialResult.defender];
        if (initialResult.log.length) {
            logs.push(initialResult.log);
        }
        
        if (enemy.health <= 0) {
            return logs;
        }

        initialResult = this.executeOneTimeAttacks({
            attacker: enemy,
            defender: owned,
            log: '',
        });
        [owned, enemy] = [initialResult.defender, initialResult.attacker];
        if (initialResult.log.length) {
            logs.push(initialResult.log);
        }

        return logs;
    }

    private performMovement(attacker: DragonBattleDto, defender: DragonBattleDto, ownedTurn: boolean, turn: number): TurnResult {
        let cssClasses = ownedTurn ? 'item-log log-owned' : 'item-log log-enemy';
        let turnResult: TurnResult = { attacker: attacker, defender: defender, log: '', cssClasses: cssClasses };
        let dodged = false;

        /**
         * Preamptive restore effects
         */
        turnResult.defender.mana += defender.manaRegen;
        turnResult.defender.initiative += defender.speed;

        /**
         * Special attacks
         */
        turnResult = this.executeSpecialAttacks(turnResult, turn);

        /**
         * Dodge chance
         */
        let dodgeChance = turnResult.defender.dodgeChance * (1 - (attacker.skills.thoughtfulStrike || 0) / 70);
        // dodgeChance = Math.min(dodgeChance, 0.67);
        if (!turnResult.skip && dodgeChance > Math.random()) {
            turnResult.log = `
                <div class="item-log log-miss">
                    ${turnResult.attacker.name} (${Math.round(turnResult.attacker.health)}) missess.
                </div>`;
            turnResult.skip = true;
            dodged = true;
        }

        /**
         * Regular turn
         */
        if (!turnResult.skip) {
            turnResult = this.executeRegularTurn(turnResult);
        }

        /**
         * Post-movement effects
         */
        turnResult = this.executePostTurnEffects(turnResult, turn);

        /**
         * Counterattack
         */
        if (!dodged && turnResult.skip && defender.skills.counterattack) {
            const counterattackChance = defender.skills.counterattack / 40;
            if (counterattackChance > Math.random()) {
                defender.initiative = attacker.initiative + defender.speed;
                turnResult.log += `<div class="item-log log-status">${defender.name} performs counterattack:</div>`
            }
        }

        return turnResult;
    }

    private executeOneTimeAttacks(turnResult: TurnResult): TurnResult {
        let attacker = turnResult.attacker;
        let defender = turnResult.defender;
        let log = turnResult.log;
        let extraLogs = [];

        if (attacker.skills.prominenceBlast > 0) {
            let baseDamage =  this.mathService.randRange(0.9, 1.1) * (attacker.skills.prominenceBlast / 8) * (2.5 * (attacker.magicalAttack + attacker.physicalAttack));
            let inflictedDamege = baseDamage - (defender.resistance + defender.armor);
            inflictedDamege = this.mathService.limit(attacker.level / 5, inflictedDamege, inflictedDamege);
            inflictedDamege = Math.min(inflictedDamege, 0.75 * defender.health)
            defender.health -= inflictedDamege;
            attacker.mana = 0;
            log = this.battleHelperService.getSkillLog('Prominence Blast', attacker, defender, baseDamage, inflictedDamege, extraLogs, 'skill-special skill-initial')
            return { attacker: attacker, defender: defender, skip: false, log: log };
        }
        if (attacker.skills.tidalSurge > 0) {
            let baseDamage = this.mathService.randRange(0.9, 1.1) * (attacker.skills.tidalSurge / 16) * (1 * attacker.magicalAttack);
            let inflictedDamege = baseDamage - defender.resistance;
            inflictedDamege = this.mathService.limit(attacker.skills.tidalSurge, inflictedDamege, inflictedDamege);
            defender.health -= inflictedDamege;
            let speedReduction = this.mathService.randRange(0.9, 1.1) * (5 + 0.025 * defender.speed * attacker.skills.tidalSurge);
            speedReduction = this.mathService.limit(attacker.skills.tidalSurge, speedReduction, defender.speed / 3);
            defender.speed -= speedReduction;
            extraLogs.push(`<div class="log-extra">+ reduced speed by (${speedReduction.toFixed(1)})</div>`);
            log = this.battleHelperService.getSkillLog('Tidal Surge', attacker, defender, baseDamage, inflictedDamege, extraLogs, 'skill-special skill-initial')
            return { attacker: attacker, defender: defender, skip: false, log: log };
        }
        if (attacker.skills.earthquake > 0) {
            let baseDamage = this.mathService.randRange(0.9, 1.1) * (attacker.skills.earthquake / 16) * (1 * attacker.magicalAttack);
            let inflictedDamege = baseDamage - defender.resistance;
            inflictedDamege = this.mathService.limit(attacker.skills.earthquake, inflictedDamege, inflictedDamege);
            defender.health -= inflictedDamege;
            const armorBreak = defender.armor * (attacker.skills.earthquake / 80);
            defender.armor -= armorBreak;
            extraLogs.push(`<div class="log-extra">+ broken (${armorBreak.toFixed(1)}) armor</div>`);
            log = this.battleHelperService.getSkillLog('Earthquake', attacker, defender, baseDamage, inflictedDamege, extraLogs, 'skill-special skill-initial')
            return { attacker: attacker, defender: defender, skip: false, log: log };
        }
        return turnResult;
    }

    private executeSpecialAttacks(turnResult: TurnResult, turn: number): TurnResult {
        let attacker = turnResult.attacker;
        let defender = turnResult.defender;
        let log = turnResult.log;
        let extraLogs = [];
        let cssClasses = turnResult.cssClasses;

        let blockedHit = 0;
        let castFactor = attacker.skills.conserve ? 1 - (attacker.skills.conserve / 60) : 1;

        /**
         * Pre-spell effects
         */
        if (defender.skills.block > 0) {
            const blockChance = 0.05 + defender.skills.block / 100;
            if (blockChance > Math.random()) {
                blockedHit = this.mathService.randRange(0.95, 1.05) * (40 + defender.skills.block) / 120;
                extraLogs.push(`<div class="log-extra">- blocked ${(100*blockedHit).toFixed(1)}% damage</div>`);
            }
        }
        if (attacker.skills.magicArrow > 0) {
            const castCost = castFactor * MagicArrow.castMana * (1 + attacker.skills.magicArrow / 10);
            if (attacker.mana > castCost && Math.random() < MagicArrow.castChance) {
                let baseDamage = this.mathService.randRange(0.9, 1.1) * (1 + attacker.skills.magicArrow / 10) * (1.1 * attacker.magicalAttack)
                let inflictedDamege = baseDamage - defender.resistance;
                inflictedDamege = this.mathService.limit(attacker.level / 5, inflictedDamege, inflictedDamege);
                inflictedDamege *= (1 - blockedHit);
                defender.health -= inflictedDamege;
                attacker.mana -= castCost;
                let brokenResistance = 0;
                if (defender.resistance > 0) {
                    brokenResistance = this.mathService.randRange(0.9, 1.1) * (3 + 0.02 * defender.resistance * attacker.skills.magicArrow);
                    defender.resistance -= brokenResistance;
                    extraLogs.push(`<div class="log-extra">+ broken ${brokenResistance.toFixed(1)} resistance</div>`);
                }
                log = this.battleHelperService.getSkillLog('Magic Arrow', attacker, defender, baseDamage, inflictedDamege, extraLogs, cssClasses);
                return { attacker: attacker, defender: defender, skip: true, log: log };
            }
        }
        if (attacker.skills.fireBolt > 0) {
            const castCost = castFactor * FireBolt.castMana * (1 + attacker.skills.fireBolt / 8);
            if (attacker.mana > castCost && Math.random() < FireBolt.castChance) {
                let baseDamage = this.mathService.randRange(0.9, 1.1) * (1 + attacker.skills.fireBolt / 10) * (1.5 * attacker.magicalAttack);
                let inflictedDamage = baseDamage - defender.resistance;
                inflictedDamage = this.mathService.limit(attacker.level / 5, inflictedDamage, inflictedDamage);
                inflictedDamage *= (1 - blockedHit);
                defender.health -= inflictedDamage;
                attacker.mana -= castCost;
                const extraCritPower = attacker.skills.fireBolt;
                attacker.critPower += extraCritPower / 100;
                extraLogs.push(`<div class="log-extra">+ critical power boost (${extraCritPower.toFixed(1)} %)</div>`);
                log = this.battleHelperService.getSkillLog('Fire Bolt', attacker, defender, baseDamage, inflictedDamage, extraLogs, cssClasses);
                return { attacker: attacker, defender: defender, log: log, skip: true, cssClasses: cssClasses };
            }
        }
        if (attacker.skills.iceBolt > 0) {
            const castCost = castFactor * IceBolt.castMana * (1 + attacker.skills.iceBolt / 8);
            if (attacker.mana > castCost && Math.random() < IceBolt.castChance) {
                let baseDamage = this.mathService.randRange(0.9, 1.1) * (1 + attacker.skills.iceBolt / 10) * (1.4 * attacker.magicalAttack);
                let inflictedDamage = baseDamage - defender.resistance;
                inflictedDamage = this.mathService.limit(attacker.level / 5, inflictedDamage, inflictedDamage);
                inflictedDamage *= (1 - blockedHit);
                defender.health -= inflictedDamage;
                attacker.mana -= castCost;
                const skillSlow = this.mathService.randRange(0.9, 1.1) * (5 + 0.075 * defender.speed * attacker.skills.iceBolt);
                defender.initiative -= skillSlow;
                extraLogs.push(`<div class="log-extra">+ slow (${skillSlow.toFixed(1)} initiative)</div>`);
                log = this.battleHelperService.getSkillLog('Ice Bolt', attacker, defender, baseDamage, inflictedDamage, extraLogs, cssClasses);
                return { attacker: attacker, defender: defender, log: log, skip: true, cssClasses: cssClasses };
            }
        }
        if (attacker.skills.airVector > 0) {
            const castCost = castFactor * AirVector.castMana * (1 + attacker.skills.airVector / 8);
            if (attacker.mana > castCost && Math.random() < AirVector.castChance) {
                let baseDamage = this.mathService.randRange(0.9, 1.1) * (1 + attacker.skills.airVector / 10) * (1.3 * attacker.magicalAttack);
                let inflictedDamage = baseDamage - defender.resistance;
                inflictedDamage = this.mathService.limit(attacker.level / 5, inflictedDamage, inflictedDamage);
                inflictedDamage *= (1 - blockedHit);
                defender.health -= inflictedDamage;
                attacker.mana -= castCost;
                const skillHaste = this.mathService.randRange(0.9, 1.1) * (5 + 0.09 * attacker.speed * attacker.skills.airVector);
                attacker.initiative += skillHaste;
                extraLogs.push(`<div class="log-extra">+ haste (${skillHaste.toFixed(1)} initiative)</div>`);
                log = this.battleHelperService.getSkillLog('Air Vector', attacker, defender, baseDamage, inflictedDamage, extraLogs, cssClasses);
                return { attacker: attacker, defender: defender, log: log, skip: true };
            }
        }
        if (attacker.skills.rockBlast > 0) {
            const castCost = castFactor * RockBlast.castMana * (1 + attacker.skills.rockBlast / 8);
            if (attacker.mana > castCost && Math.random() < RockBlast.castChance) {
                let baseDamage = this.mathService.randRange(0.9, 1.1) * (1 + attacker.skills.rockBlast / 10) * (1.5 * attacker.magicalAttack);
                let inflictedDamage = baseDamage - defender.resistance;
                inflictedDamage = this.mathService.limit(attacker.level / 5, inflictedDamage, inflictedDamage);
                inflictedDamage *= (1 - blockedHit);
                defender.health -= inflictedDamage;
                attacker.mana -= castCost;
                const stunChance = 0.1 + attacker.skills.rockBlast / 75;
                if (stunChance > Math.random()) {
                    defender.initiative -= defender.speed;
                    extraLogs.push(`<div class="log-extra">+ stun</div>`);
                }
                log = this.battleHelperService.getSkillLog('Rock Blast', attacker, defender, baseDamage, inflictedDamage, extraLogs, cssClasses);
                return { attacker: attacker, defender: defender, log: log, skip: true, cssClasses: cssClasses };
            }
        }
        if (attacker.skills.thunderbolt > 0) {
            const castCost = castFactor * Thunderbolt.castMana * (1 + attacker.skills.thunderbolt / 9);
            if (attacker.mana > castCost && Math.random() < Thunderbolt.castChance) {
                let baseDamage = this.mathService.randRange(0.5, 1.9) * (1 + attacker.skills.thunderbolt / 10) * (1.9 * attacker.magicalAttack);
                let inflictedDamage = baseDamage - defender.resistance;
                inflictedDamage = this.mathService.limit(attacker.level / 5, inflictedDamage, inflictedDamage);
                inflictedDamage *= (1 - blockedHit);
                defender.health -= inflictedDamage;
                attacker.mana -= castCost;
                const paralysisChance = 0.125 + attacker.skills.thunderbolt / 75;
                if (paralysisChance > Math.random()) {
                    defender.speed -= 0.1 * defender.speed;
                    defender.initiative -= 0.25 * defender.speed;
                    extraLogs.push(`<div class="log-extra">+ paralysis</div>`);
                }
                log = this.battleHelperService.getSkillLog('Thunderbolt', attacker, defender, baseDamage, inflictedDamage, extraLogs, cssClasses);
                return { attacker: attacker, defender: defender, log: log, skip: true, cssClasses: cssClasses };
            }
        }
        if (attacker.skills.tempestFury > 0) {
            const castCost = castFactor * TempestFury.castMana * (1 + attacker.skills.tempestFury / 7);
            if (attacker.mana > castCost && Math.random() < TempestFury.castChance) {
                let baseDamage = this.mathService.randRange(0.8, 1.4) * (1 + attacker.skills.tempestFury / 8) * (1.9 * attacker.magicalAttack);
                let inflictedDamage = baseDamage - defender.resistance;
                inflictedDamage = this.mathService.limit(attacker.level / 4, inflictedDamage, inflictedDamage);
                inflictedDamage *= (1 - blockedHit);
                defender.health -= inflictedDamage;
                attacker.mana -= castCost;
                extraLogs.push(`<div class="log-extra">+ focus</div>`);
                attacker.critBoost = {
                    extraChance: 1,
                    turnLeft: 1,
                }
                log = this.battleHelperService.getSkillLog('Tempest Fury', attacker, defender, baseDamage, inflictedDamage, extraLogs, cssClasses);
                return { attacker: attacker, defender: defender, log: log, skip: true, cssClasses: cssClasses };
            }
        }
        if (attacker.skills.solarBeam > 0) {
            const castCost = castFactor * SolarBeam.castMana * (1 + attacker.skills.solarBeam / 7);
            if (attacker.mana > castCost && Math.random() < SolarBeam.castChance) {
                let baseDamage = this.mathService.randRange(0.9, 1.3) * (1 + attacker.skills.solarBeam / 7) * (1.9 * attacker.magicalAttack);
                let inflictedDamage = baseDamage - defender.resistance;
                inflictedDamage = this.mathService.limit(attacker.level / 4, inflictedDamage, inflictedDamage);
                inflictedDamage *= (1 - blockedHit);
                defender.health -= inflictedDamage;
                attacker.mana -= castCost;
                attacker.dodgeChance += 0.12;
                extraLogs.push(`<div class="log-extra">+ dazzle</div>`);
                log = this.battleHelperService.getSkillLog('Solar Beam', attacker, defender, baseDamage, inflictedDamage, extraLogs, cssClasses);
                return { attacker: attacker, defender: defender, log: log, skip: true, cssClasses: cssClasses };
            }
        }
        if (attacker.skills.laserExedra > 0) {
            const castCost = castFactor * LaserExedra.castMana * (1 + attacker.skills.laserExedra / 7);
            if (attacker.mana > castCost && Math.random() < LaserExedra.castChance) {
                let baseDamage = this.mathService.randRange(0.9, 1.1) * (1 + attacker.skills.laserExedra / 6) * (1.8 * attacker.magicalAttack);
                let inflictedDamage = baseDamage - defender.resistance;
                inflictedDamage = this.mathService.limit(attacker.level / 4, inflictedDamage, inflictedDamage);
                inflictedDamage *= (1 - blockedHit);
                defender.health -= inflictedDamage;
                defender.maxHealth -= inflictedDamage;
                attacker.mana -= castCost;
                extraLogs.push(`<div class="log-extra">+ permanent loss (${inflictedDamage.toFixed(1)}) health</div>`);
                log = this.battleHelperService.getSkillLog('Laser Exedra', attacker, defender, baseDamage, inflictedDamage, extraLogs, cssClasses);
                return { attacker: attacker, defender: defender, log: log, skip: true, cssClasses: cssClasses };
            }
        }
        if (attacker.skills.andromedaArrow > 0) {
            const castCost = castFactor * AndromedaArrow.castMana * (1 + attacker.skills.andromedaArrow / 7);
            if (attacker.mana > castCost && Math.random() < LaserExedra.castChance) {
                let baseDamage = this.mathService.randRange(0.9, 1.1) * (1 + attacker.skills.andromedaArrow / 9) * (1.8 * attacker.magicalAttack);
                let inflictedDamage = baseDamage - defender.resistance;
                inflictedDamage = this.mathService.limit(attacker.level / 4, inflictedDamage, inflictedDamage);
                inflictedDamage *= (1 - blockedHit);
                defender.health -= inflictedDamage;
                let destroyedMana = defender.maxMana * (attacker.skills.andromedaArrow / 125);
                defender.mana -= destroyedMana;
                attacker.mana -= castCost;
                extraLogs.push(`<div class="log-extra">+ destroyed (${destroyedMana.toFixed(1)}) mana</div>`);
                log = this.battleHelperService.getSkillLog('Andromeda Arrow', attacker, defender, baseDamage, inflictedDamage, extraLogs, cssClasses);
                return { attacker: attacker, defender: defender, log: log, skip: true, cssClasses: cssClasses };
            }
        }
        
        return { attacker: attacker, defender: defender, log: log, cssClasses: cssClasses, skip: false };
    }

    private executeRegularTurn(turnResult: TurnResult): TurnResult {
        let attacker = turnResult.attacker;
        let defender = turnResult.defender;
        let log = turnResult.log;
        let extraLogs = [];
        let cssClasses = turnResult.cssClasses;
        
        let baseDamage = 0;
        let inflictedDamage = 0;
        let isCrit = false;
        let critFactor = 1;
        let isArmorPenetrated = false;
        let rageFactor = 1;
        let blockedHit = 0;
        let lethalFactor = 1;

        /**
         * Pre-offensive effects
         */
        if (attacker.skills.armorPenetration) {
            const penetrationChance = 0.05 + attacker.skills.armorPenetration / 75;
            if (penetrationChance > Math.random()) {
                isArmorPenetrated = true;
                extraLogs.push(`<div class="log-extra">+ armor penetration</div>`);
            }
        }
        if (attacker.skills.rage) {
            if (attacker.health < 0.5 * attacker.maxHealth) {
                rageFactor = 1 + attacker.skills.rage / 75;
                extraLogs.push(`<div class="log-extra">+ rage</div>`);
            }
        }

        /**
         * Pre-defensive skills
         */
        if (defender.skills.block) {
            const blockChance = 0.05 + defender.skills.block / 100;
            if (blockChance > Math.random()) {
                blockedHit = this.mathService.randRange(0.95, 1.05) * (50 + defender.skills.block) / 100;
                extraLogs.push(`<div class="log-extra">- blocked ${(100*blockedHit).toFixed(1)}% damage</div>`);
            }
        }

        if (defender.skills.enchantedBarrier) {
            const barrierCost = EnchantedBarrier.castMana + defender.skills.enchantedBarrier / 8;
            if (defender.mana >= barrierCost) {
                defender.mana -= barrierCost;
                let absorbedHit = (10 + defender.skills.enchantedBarrier / 3) / 100;
                blockedHit += absorbedHit;
                extraLogs.push(`<div class="log-extra">- absorbed ${(100*absorbedHit).toFixed(1)}% damage</div>`);
            }
        }

        /**
         * Critical chance
         */
        let critChance = attacker.critChance;
        if (attacker.critBoost.turnLeft > 0) {
            critChance += attacker.critBoost.extraChance;
            attacker.critBoost.turnLeft -= 1;
        }
        if (critChance > Math.random()) {
            isCrit = true;
            critFactor = attacker.critPower;
            cssClasses += ' log-crit';
        }

        /**
         * Lethal blow
         */
        if (attacker.skills.lethalBlow) {
            const lethalHitChance = attacker.skills.lethalBlow / 100;
            if (isCrit && lethalHitChance > Math.random()) {
                lethalFactor = 2;
                cssClasses += ' log-crit';
                extraLogs.push(`<div class="log-extra">+ lethal blow</div>`);
            }
        }

        /**
         * Freeze
         */
        if (attacker.skills.freeze) {
            const freezeChance = 0.03 + attacker.skills.freeze / 125;
            if (freezeChance > Math.random()) {
                defender.initiative -= defender.speed;
                extraLogs.push(`<div class="log-extra">+ freeze</div>`);
            }
        }

        /**
         * Super Charge
         */
        if (attacker.skills.superCharge) {
            const chargeChance = attacker.skills.superCharge / 250;
            if (chargeChance > Math.random()) {
                const chargedHealth = 0.2 * attacker.maxHealth * (1 + attacker.skills.superCharge / 100);
                attacker.health += chargedHealth;
                extraLogs.push(`<div class="log-extra">+ Thunder God's blessing (gained ${chargedHealth.toFixed(1)} health)</div>`);
            }
        }

        /**
         * Terrible omen
         */
        if (attacker.skills.terribleOmen) {
            const omenChance = attacker.skills.terribleOmen / 150;
            if (omenChance > Math.random() && attacker.dodgeChance < 0.8) {
                const extraDodge = 0.13;
                attacker.dodgeChance += extraDodge;
                attacker.dodgeChance = Math.min(attacker.dodgeChance, 0.8);
                extraLogs.push(`<div class="log-extra">+ terrible omen</div>`);
            }
        }

        /**
         * Regular hit
         */
        let baseHit = this.mathService.randRange(0.9, 1.1) * critFactor * rageFactor * attacker.physicalAttack * lethalFactor;
        baseDamage = baseHit;
        baseHit = isArmorPenetrated ? baseHit : baseHit - defender.armor;
        baseHit *= (1 - blockedHit);
        baseHit = this.mathService.limit(1 + attacker.level / 10, baseHit, baseHit);
        inflictedDamage += baseHit;
        defender.health -= baseHit;

        /**
         * Post-offensive effects
         */
        if (isCrit) {
            if (attacker.skills.criticalDrain) {
                const drainedHealth = baseHit * (0.15 + attacker.skills.criticalDrain / 60);
                attacker.health += drainedHealth;
                defender.health -= drainedHealth;
                const drainedMana = baseHit * (0.075 + attacker.skills.criticalDrain / 80);
                attacker.mana += drainedMana;
                defender.mana -= drainedMana;
                extraLogs.push(`<div class="log-extra">+ drained ${drainedHealth.toFixed(1)} health, ${drainedMana.toFixed(1)} mana</div>`);
            }
            if (attacker.skills.zeal) {
                const acceleration = attacker.speed * (attacker.skills.zeal / 50);
                attacker.initiative += acceleration;
                extraLogs.push(`<div class="log-extra">+ critical acceleration (${acceleration.toFixed(1)}) initiative</div>`);
            }
        }

        if (attacker.skills.veritableStrike) {
            const trueDamage = 0.3 * attacker.physicalAttack + 0.3 * attacker.magicalAttack;
            inflictedDamage += trueDamage;
            defender.health -= trueDamage;
            extraLogs.push(`<div class="log-extra">+ ${trueDamage.toFixed(1)} true damage</div>`);
        }

        if (attacker.skills.lifeLink) {
            const drainedHealth = baseHit * (0.04 + attacker.skills.lifeLink / 80);
            attacker.health += drainedHealth;
            defender.health -= drainedHealth;
            extraLogs.push(`<div class="log-extra">+ drained ${drainedHealth.toFixed(1)} health</div>`);
        }

        if (attacker.skills.fireBreath) {
            const baseFireComponent = Math.log(2 + attacker.skills.fireBreath) * (0.4 * attacker.magicalAttack);
            let fireHit = critFactor * rageFactor * baseFireComponent - defender.resistance;
            fireHit *= (1 - blockedHit);
            fireHit = this.mathService.randRange(0.9, 1.1) * this.mathService.limit(1 + attacker.level / 10, fireHit, fireHit);
            inflictedDamage += fireHit;
            defender.health -= fireHit;
            extraLogs.push(`<div class="log-extra">+ ${fireHit.toFixed(1)} fire damage</div>`);
        }

        if (attacker.skills.staticStrike) {
            const baseStaticComponent = Math.log(2 + attacker.skills.staticStrike) * (0.3 * attacker.magicalAttack);
            let staticHit = critFactor * rageFactor * baseStaticComponent - defender.resistance;
            staticHit *= (1 - blockedHit);
            staticHit = this.mathService.randRange(0.5, 1.9) * this.mathService.limit(1 + attacker.level / 9, staticHit, staticHit);
            inflictedDamage += staticHit;
            defender.health -= staticHit;
            extraLogs.push(`<div class="log-extra">+ ${staticHit.toFixed(1)} electric damage</div>`);

            if (defender.armor > 0) {
                const armorBreak = 0.5 + 0.1 * defender.armor * attacker.skills.staticStrike / 50;
                defender.armor -= armorBreak;
                extraLogs.push(`<div class="log-extra">+ broken ${armorBreak.toFixed(1)} armor</div>`);
            }
            if (attacker.skills.electroStrike) {
                if (defender.resistance > 0) {
                    const resistanceBreak = 0.5 + 0.1 * defender.armor * attacker.skills.staticStrike / 50;
                    defender.resistance -= resistanceBreak;
                    extraLogs.push(`<div class="log-extra">+ broken ${resistanceBreak.toFixed(1)} resistance</div>`);
                }
                const paralysisChance = attacker.skills.electroStrike / 110;
                if (paralysisChance > Math.random()) {
                    defender.speed -= 0.1 * defender.speed;
                    defender.initiative -= 0.25 * defender.speed;
                    extraLogs.push(`<div class="log-extra">+ paralysis</div>`);
                }
            }
        }

        let leafCutCost = LeafCut.castMana * (1 + attacker.skills.leafCut / 50);
        if (attacker.skills.leafCut > 0 && attacker.mana > leafCutCost) {
            const baseLeafComponent = Math.log(2 + attacker.skills.leafCut) * (0.6 * attacker.magicalAttack);
            let leafHit = critFactor * rageFactor * baseLeafComponent - defender.resistance;
            leafHit *= (1 - blockedHit);
            leafHit = this.mathService.randRange(0.9, 1.1) * this.mathService.limit(1 + attacker.level / 8, leafHit, leafHit);
            inflictedDamage += leafHit;
            defender.health -= leafHit;
            attacker.mana -= leafCutCost;
            extraLogs.push(`<div class="log-extra">+ leaf cut ${leafHit.toFixed(1)} damage</div>`);
        }
        
        if (attacker.skills.pugnaciousStrike && defender.armor > 0) {
            const armorBreak = 0.5 + 0.1 * defender.armor * attacker.skills.pugnaciousStrike / 40;
            defender.armor -= armorBreak;
            extraLogs.push(`<div class="log-extra">+ broken ${armorBreak.toFixed(1)} armor</div>`);
        }

        if (attacker.skills.deepWounds) {
            const woundChance = 0.1 + attacker.skills.deepWounds / 75;
            if (woundChance > Math.random()) {
                const newWound = defender.maxHealth * (attacker.skills.deepWounds / 150);
                defender.deepWounds += newWound;
                extraLogs.push(`<div class="log-extra">+ deep wound ${newWound.toFixed(1)} damage</div>`);
            }
        }

        if (attacker.skills.blazeScar) {
            const scarChance = 0.1 + attacker.skills.blazeScar / 60;
            if (scarChance > Math.random()) {
                const newScar = defender.maxHealth * (attacker.skills.blazeScar / 125);
                defender.blazeScar += newScar;
                extraLogs.push(`<div class="log-extra">+ blaze scar ${newScar.toFixed(1)} damage</div>`);
            }
        }
        
        /**
         * Post-defensive skills
         */
        if (defender.skills.roughSkin) {
            const reflectedHit = baseHit * defender.skills.roughSkin / 50;
            attacker.health -= reflectedHit;
            extraLogs.push(`<div class="log-extra">- ${defender.name} reflected ${reflectedHit.toFixed(1)} damage</div>`);
        }

        log += `
            <div class="${cssClasses}">
                ${attacker.name} (${Math.round(attacker.health)}) 
                ${isCrit ? 'critically strikes' : 'strikes'}
                for ${Math.round(baseDamage)}`;
        extraLogs.sort().forEach(extraLog => log += extraLog);
        log += `<div>${defender.name} (${Math.round(defender.health)}) took ${Math.round(inflictedDamage)} damage</div></div>`;

        return { attacker: attacker, defender: defender, log: log, cssClasses: cssClasses, skip: false };
    }

    private executePostTurnEffects(turnResult: TurnResult, turn: number): TurnResult {
        let attacker = turnResult.attacker;
        let defender = turnResult.defender;
        let log = turnResult.log;
        let independentLogs = [];
        let cssClasses = turnResult.cssClasses;

        if ((defender.skills.soundBody > 0 || defender.healthRegen > 0) && defender.health < defender.maxHealth && defender.health > 0) {
            let restoredHealth = (0.05 * defender.maxHealth * (1 + defender.skills.soundBody / 20) + defender.healthRegen)
                / (1 + turn / 15);
            if (restoredHealth > 0) {
                defender.health += restoredHealth;
                if (defender.health > defender.maxHealth) defender.health = defender.maxHealth;
                independentLogs.push(`<div class="item-log log-status">${defender.name} regenerated ${restoredHealth.toFixed(1)} health.</div>`);
            } 
        }

        if (defender.skills.poison > 0) {
            let poisonDamage = (1 + attacker.maxHealth / 100) * (1 + turn / 33) * Math.log(2 + 2 * defender.skills.poison);
            attacker.health -= poisonDamage;
            independentLogs.push(`<div class="item-log log-status">${attacker.name} took ${poisonDamage.toFixed(1)} poison damage.</div>`);
        }
        
        if (attacker.deepWounds > 0) {
            attacker.health -= attacker.deepWounds;
            independentLogs.push(`<div class="item-log log-status">${attacker.name} suffered ${attacker.deepWounds.toFixed(1)} internal damage.</div>`);
            attacker.deepWounds *= 0.82;
        }
        
        if (attacker.blazeScar > 0) {
            attacker.health -= attacker.blazeScar;
            independentLogs.push(`<div class="item-log log-status">${attacker.name} suffered ${attacker.blazeScar.toFixed(1)} blaze damage.</div>`);
            attacker.blazeScar *= 0.66;
        }

        if (defender.skills.woundedPride > 0) {
            const woundedPrideFactor = 
                (1 + (defender.maxHealth - defender.health) / defender.maxHealth) 
                * (1 + defender.skills.woundedPride / 25);
            defender.speed += woundedPrideFactor;
            defender.physicalAttack += woundedPrideFactor;
            defender.magicalAttack += woundedPrideFactor;
            defender.resistance += woundedPrideFactor
            defender.armor += woundedPrideFactor;
            defender.critChance += woundedPrideFactor / 100;
        }

        independentLogs.forEach(independentLog => log += independentLog);

        return { attacker: attacker, defender: defender, log: log, cssClasses: cssClasses, skip: turnResult.skip };
    }

    private async saveBattleResults(result: BattleResultType, owned: DragonBattleDto, enemy: DragonBattleDto, battleLength: number): Promise<BattleResultExperience> {
        let resultExperience: BattleResultExperience = { ownedExperience: 0, enemyExperience: 0 };

        switch (result) {
            case BattleResultType.Win: {
                let gainedExperience = 6 * Math.log(10 + Math.max(-8, 1.5 * (enemy.level - owned.level)));
                gainedExperience = Math.round(this.mathService.randRange(0.8, 1.2) * this.mathService.limit(1, gainedExperience, 50));
                let lostExperience = gainedExperience / 3;
                lostExperience = Math.round(this.mathService.randRange(0.8, 1.2) * this.mathService.limit(1, lostExperience, 10));

                owned.experience += gainedExperience;
                owned.seasonalExperience += gainedExperience;
                enemy.experience -= lostExperience;
                enemy.seasonalExperience -= lostExperience;
                resultExperience = { ownedExperience: gainedExperience, enemyExperience: lostExperience };
                break;
            }
            case BattleResultType.Loss: {
                let gainedExperience = 3 * Math.log(10 + Math.max(-8, 1.5 * (owned.level - enemy.level)));
                gainedExperience = Math.round(this.mathService.randRange(0.8, 1.2) * this.mathService.limit(1, gainedExperience, 50));
                let lostExperience = gainedExperience / 2;
                lostExperience = Math.round(this.mathService.randRange(0.8, 1.2) * this.mathService.limit(1, lostExperience, 10));

                owned.experience -= lostExperience;
                owned.seasonalExperience -= lostExperience;
                enemy.experience += gainedExperience;
                enemy.seasonalExperience += gainedExperience;
                resultExperience = { ownedExperience: lostExperience, enemyExperience: gainedExperience };
                break;
            }
            case BattleResultType.Draw: {
                let gainedExperience = 3 * Math.log(10 + Math.max(-8, 1.5 * (enemy.level - owned.level)));
                gainedExperience = Math.round(this.mathService.randRange(0.8, 1.2) * this.mathService.limit(1, gainedExperience, 50));

                owned.experience += gainedExperience;
                owned.seasonalExperience += gainedExperience;
                enemy.experience += gainedExperience;
                enemy.seasonalExperience += gainedExperience;
                resultExperience = { ownedExperience: gainedExperience, enemyExperience: gainedExperience };
                break;
            }
        }

        owned.stamina -= 3 + Math.floor(battleLength / 25);
        if (owned.stamina < 0) owned.stamina = 0;

        owned.battledWith.push(enemy.id);

        if (owned.experience < 0) owned.experience = 0;
        if (owned.seasonalExperience < 0) owned.seasonalExperience = 0;
        if (enemy.experience < 0) enemy.experience = 0;
        if (enemy.seasonalExperience < 0) enemy.seasonalExperience = 0;

        await this.dragonRepository.update(
            owned.id, 
            { experience: owned.experience, seasonalExperience: owned.seasonalExperience, stamina: owned.stamina, battledWith: owned.battledWith },
        );
        await this.dragonRepository.update(
            enemy.id,
            { experience: enemy.experience, seasonalExperience: enemy.seasonalExperience },
        );
        return resultExperience;
    }

    private async saveBattleGuardianResults(result: BattleResultType, owned: DragonBattleDto, expedition: ExpeditionDto, battleLength: number): Promise<void> {
        owned.stamina -= 3 + Math.floor(battleLength / 25);
        if (owned.stamina < 0) owned.stamina = 0;

        if (result === BattleResultType.Win && owned.unlockedExpeditions.indexOf(expedition.uid) === -1) {
            owned.unlockedExpeditions.push(expedition.uid);
        }

        await this.dragonRepository.update(
            owned.id, 
            { stamina: owned.stamina, unlockedExpeditions: owned.unlockedExpeditions },
        );
    }
}
