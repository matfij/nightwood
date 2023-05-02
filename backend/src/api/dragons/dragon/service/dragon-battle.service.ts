import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MathService } from "src/common/services/math.service";
import { Repository } from "typeorm";
import { ExpeditionDto } from "../../dragon-action/model/dto/expedition.dto";
import { MagicArrow } from "../../dragon-skills/data/skills-common";
import { AirVector, DeepWounds, EnchantedBarrier, FireBolt, IceBolt, LeafCut, RockBlast, Thunderbolt } from "../../dragon-skills/data/skills-exclusive";
import { DragonBattleDto } from "../model/dto/dragon-battle.dto";
import { Dragon } from "../model/dragon.entity";
import { BattleResultDto } from "../model/dto/battle-result.dto";
import { DragonDto } from "../model/dto/dragon.dto";
import { BattleHelperService } from "./dragon-helper.service";
import { TurnResult, BattleResultType, BattleResultExperience } from "../model/definitions/dragon-battle";

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

        const logs = [];
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

        const logs = [];
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

    private performMovement(attacker: DragonBattleDto, defender: DragonBattleDto, ownedTurn: boolean, turn: number): TurnResult {
        let cssClasses = ownedTurn ? 'item-log log-owned' : 'item-log log-enemy';
        let turnResult: TurnResult = { attacker: attacker, defender: defender, log: '', cssClasses: cssClasses };

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
        const dodgeChance = turnResult.defender.dodgeChance * (1 - attacker.skills.thoughtfulStrike / 70);
        if (!turnResult.skip && dodgeChance > Math.random()) {
            turnResult.log = `
                <div class="item-log log-miss">
                    ${turnResult.attacker.name} (${turnResult.attacker.health.toFixed(1)}) 
                    missess.
                </div>`;

            turnResult.skip = true;
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

        return turnResult;
    }

    private executeSpecialAttacks(turnResult: TurnResult, turn: number): TurnResult {
        let attacker = turnResult.attacker;
        let defender = turnResult.defender;
        let log = turnResult.log;
        let extraLogs = [];
        let cssClasses = turnResult.cssClasses;

        let blockedHit = 0;

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

        if (!attacker.prominenceBlastUsed && attacker.skills.prominenceBlast > 0) {
            let skillHit = 
                (1 + attacker.skills.prominenceBlast / 6) 
                * (3.7 * attacker.magicalAttack)
                - defender.resistance;
            skillHit = this.mathService.randRange(0.9, 1.1) * this.mathService.limit(attacker.level / 5, skillHit, skillHit);
            skillHit *= (1 - blockedHit);
            defender.health -= skillHit;
            attacker.prominenceBlastUsed = true;
            attacker.mana = 0;

            cssClasses += ' log-skill skill-special';
            log = `
            <div class="${cssClasses}">
                ${attacker.name} (${attacker.health.toFixed(1)}) uses <b style="color: red;">Prominence Blast</b> 
                and strikes ${defender.name} (${defender.health.toFixed(1)}) for ${skillHit.toFixed(1)} damage.`
            extraLogs.forEach(extraLog => log += extraLog);
            log += `</div>`;

            return { attacker: attacker, defender: defender, skip: true, log: log };
        }

        if (attacker.skills.magicArrow > 0) {
            const castCost = MagicArrow.castMana * (1 + attacker.skills.magicArrow / 10);
            if (attacker.mana > castCost && Math.random() < MagicArrow.castChance) {
                let skillHit = (1 + attacker.skills.magicArrow / 10) * (1.1 * attacker.magicalAttack) - defender.resistance;
                skillHit = this.mathService.randRange(0.9, 1.1) * this.mathService.limit(attacker.level / 5, skillHit, skillHit);
                skillHit *= (1 - blockedHit);
                defender.health -= skillHit;
                attacker.mana -= castCost;
                
                let brokenResistance = 0;
                if (defender.resistance > 0) {
                    brokenResistance = this.mathService.randRange(0.9, 1.1) * (3 + 0.05 * defender.resistance * attacker.skills.magicArrow);
                    defender.resistance -= brokenResistance;
                    extraLogs.push(`<div class="log-extra">+ broken ${brokenResistance.toFixed(1)} resistance</div>`);
                }

                cssClasses += ' log-skill';
                log = `
                <div class="${cssClasses}">
                    ${attacker.name} (${attacker.health.toFixed(1)}) uses <b>Magic Arrow</b> and strikes ${defender.name} (${defender.health.toFixed(1)}) 
                    for ${skillHit.toFixed(1)} damage.`
                extraLogs.forEach(extraLog => log += extraLog);
                log += `</div>`;

                return { attacker: attacker, defender: defender, skip: true, log: log };
            }
        }
        if (attacker.skills.fireBolt > 0) {
            const castCost = FireBolt.castMana * (1 + attacker.skills.fireBolt / 8);
            if (attacker.mana > castCost && Math.random() < FireBolt.castChance) {
                let skillHit = (1 + attacker.skills.fireBolt / 10) * (1.5 * attacker.magicalAttack) - defender.resistance;
                skillHit = this.mathService.randRange(0.9, 1.1) * this.mathService.limit(attacker.level / 5, skillHit, skillHit);
                skillHit *= (1 - blockedHit);
                defender.health -= skillHit;
                attacker.mana -= castCost;
                
                const extraCritPower = attacker.skills.fireBolt;
                attacker.critPower += extraCritPower / 100;
                extraLogs.push(`<div class="log-extra">+ critical power boost (${extraCritPower.toFixed(1)} %)</div>`);

                cssClasses += ' log-skill';
                log = `
                <div class="${cssClasses}">
                    ${attacker.name} (${attacker.health.toFixed(1)}) uses <b>Fire bolt</b> and strikes ${defender.name} (${defender.health.toFixed(1)}) 
                    for ${skillHit.toFixed(1)} damage.`
                extraLogs.forEach(extraLog => log += extraLog);
                log += `</div>`;

                return { attacker: attacker, defender: defender, log: log, skip: true, cssClasses: cssClasses };
            }
        }
        if (attacker.skills.iceBolt > 0) {
            const castCost = IceBolt.castMana * (1 + attacker.skills.iceBolt / 8);
            if (attacker.mana > castCost && Math.random() < IceBolt.castChance) {
                let skillHit = (1 + attacker.skills.iceBolt / 10) * (1.4 * attacker.magicalAttack) - defender.resistance;
                skillHit = this.mathService.randRange(0.9, 1.1) * this.mathService.limit(attacker.level / 5, skillHit, skillHit);
                skillHit *= (1 - blockedHit);
                defender.health -= skillHit;
                attacker.mana -= castCost;

                const skillSlow = this.mathService.randRange(0.9, 1.1) * (5 + 0.075 * defender.speed * attacker.skills.iceBolt);
                defender.initiative -= skillSlow;
                extraLogs.push(`<div class="log-extra">+ slow (${skillSlow.toFixed(1)} initiative)</div>`);

                cssClasses += ' log-skill';
                log = `
                <div class="${cssClasses}">
                    ${attacker.name} (${attacker.health.toFixed(1)}) uses <b>Ice Bolt</b> and strikes ${defender.name} (${defender.health.toFixed(1)}) 
                    for ${skillHit.toFixed(1)} damage.`
                extraLogs.forEach(extraLog => log += extraLog);
                log += `</div>`;

                return { attacker: attacker, defender: defender, log: log, skip: true, cssClasses: cssClasses };
            }
        }
        if (attacker.skills.airVector > 0) {
            const castCost = AirVector.castMana * (1 + attacker.skills.airVector / 8);
            if (attacker.mana > castCost && Math.random() < AirVector.castChance) {
                let skillHit = (1 + attacker.skills.airVector / 10) * (1.3 * attacker.magicalAttack) - defender.resistance;
                skillHit = this.mathService.randRange(0.9, 1.1) * this.mathService.limit(attacker.level / 5, skillHit, skillHit);
                skillHit *= (1 - blockedHit);
                defender.health -= skillHit;
                attacker.mana -= castCost;
                
                const skillHaste = this.mathService.randRange(0.9, 1.1) * (5 + 0.09 * attacker.speed * attacker.skills.airVector);
                attacker.initiative += skillHaste;
                extraLogs.push(`<div class="log-extra">+ haste (${skillHaste.toFixed(1)} initiative)</div>`);

                cssClasses += ' log-skill';
                log = `
                <div class="${cssClasses}">
                    ${attacker.name} (${attacker.health.toFixed(1)}) uses <b>Air Vector</b> and strikes ${defender.name} (${defender.health.toFixed(1)}) 
                    for ${skillHit.toFixed(1)} damage;`
                extraLogs.forEach(extraLog => log += extraLog);
                log += `</div>`;

                return { attacker: attacker, defender: defender, log: log, skip: true };
            }
        }
        if (attacker.skills.rockBlast > 0) {
            const castCost = RockBlast.castMana * (1 + attacker.skills.rockBlast / 8);
            if (attacker.mana > castCost && Math.random() < RockBlast.castChance) {
                let skillHit = (1 + attacker.skills.rockBlast / 10) * (1.5 * attacker.magicalAttack) - defender.resistance;
                skillHit = this.mathService.randRange(0.9, 1.1) * this.mathService.limit(attacker.level / 5, skillHit, skillHit);
                skillHit *= (1 - blockedHit);
                defender.health -= skillHit;
                attacker.mana -= castCost;
                
                const stunChance = 0.1 + attacker.skills.rockBlast / 75;
                if (stunChance > Math.random()) {
                    defender.initiative -= defender.speed;
                    extraLogs.push(`<div class="log-extra">+ stun</div>`);
                }

                cssClasses += ' log-skill';
                log = `
                <div class="${cssClasses}">
                    ${attacker.name} (${attacker.health.toFixed(1)}) uses <b>Rock Blast</b> and strikes ${defender.name} (${defender.health.toFixed(1)}) 
                    for ${skillHit.toFixed(1)} damage.`;
                extraLogs.forEach(extraLog => log += extraLog);
                log += `</div>`;

                return { attacker: attacker, defender: defender, log: log, skip: true, cssClasses: cssClasses };
            }
        }
        if (attacker.skills.thunderbolt > 0) {
            const castCost = Thunderbolt.castMana * (1 + attacker.skills.thunderbolt / 9);
            if (attacker.mana > castCost && Math.random() < Thunderbolt.castChance) {
                let skillHit = (1 + attacker.skills.thunderbolt / 10) * (1.9 * attacker.magicalAttack) - defender.resistance;
                skillHit = this.mathService.randRange(0.6, 2.1) * this.mathService.limit(attacker.level / 5, skillHit, skillHit);
                skillHit *= (1 - blockedHit);
                defender.health -= skillHit;
                attacker.mana -= castCost;

                const paralysisChance = 0.125 + attacker.skills.thunderbolt / 75;
                if (paralysisChance > Math.random()) {
                    defender.speed -= 0.1 * defender.speed;
                    defender.initiative -= 0.25 * defender.speed;
                    extraLogs.push(`<div class="log-extra">+ paralysis</div>`);
                }

                cssClasses += ' log-skill';
                log = `
                <div class="${cssClasses}">
                    ${attacker.name} (${attacker.health.toFixed(1)}) uses <b>Thunderbolt</b> and strikes ${defender.name} (${defender.health.toFixed(1)}) 
                    for ${skillHit.toFixed(1)} damage.`;
                extraLogs.forEach(extraLog => log += extraLog);
                log += `</div>`;

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
        if (attacker.critChance > Math.random()) {
            isCrit = true;
            critFactor = attacker.critPower;
            cssClasses += ' log-crit';
        }

        /**
         * Lethal blow
         */
        if (attacker.skills.lethalBlow) {
            const lethalHitChance = attacker.skills.lethalBlow / 300;
            if (lethalHitChance > Math.random()) {
                lethalFactor = 10;
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
        let baseHit = critFactor * rageFactor * attacker.physicalAttack * lethalFactor;
        baseHit = isArmorPenetrated ? baseHit : baseHit - defender.armor;
        baseHit *= (1 - blockedHit);
        baseHit = this.mathService.randRange(0.9, 1.1) * this.mathService.limit(1 + attacker.level / 10, baseHit, baseHit);
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
            defender.health -= fireHit;
            extraLogs.push(`<div class="log-extra">+ ${fireHit.toFixed(1)} fire damage</div>`);
        }

        if (attacker.skills.staticStrike) {
            const baseStaticComponent = Math.log(2 + attacker.skills.staticStrike) * (0.3 * attacker.magicalAttack);
            let staticHit = critFactor * rageFactor * baseStaticComponent - defender.resistance;
            staticHit *= (1 - blockedHit);
            staticHit = this.mathService.randRange(0.5, 1.9) * this.mathService.limit(1 + attacker.level / 9, staticHit, staticHit);
            defender.health -= staticHit;
            extraLogs.push(`<div class="log-extra">+ ${staticHit.toFixed(1)} electric damage</div>`);

            if (defender.armor > 0) {
                const armorBreak = 0.5 + 0.1 * defender.armor * attacker.skills.staticStrike / 50;
                defender.armor -= armorBreak;
                extraLogs.push(`<div class="log-extra">+ broken ${armorBreak.toFixed(1)} armor</div>`);
            }
        }

        let leafCutCost = LeafCut.castMana * (1 + attacker.skills.leafCut / 50);
        if (attacker.skills.leafCut > 0 && attacker.mana > leafCutCost) {
            const baseLeafComponent = Math.log(2 + attacker.skills.leafCut) * (0.6 * attacker.magicalAttack);
            let leafHit = critFactor * rageFactor * baseLeafComponent - defender.resistance;
            leafHit *= (1 - blockedHit);
            leafHit = this.mathService.randRange(0.9, 1.1) * this.mathService.limit(1 + attacker.level / 8, leafHit, leafHit);
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
                ${attacker.name} (${attacker.health.toFixed(1)}) 
                ${isCrit ? 'critically strikes' : 'strikes'}
                ${defender.name} (${defender.health.toFixed(1)}) 
                for ${baseHit.toFixed(1)}`;
        extraLogs.forEach(extraLog => log += extraLog);
        log += `</div>`;

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
            attacker.deepWounds *= 0.82;
            independentLogs.push(`<div class="item-log log-status">${attacker.name} suffered ${attacker.deepWounds.toFixed(1)} internal damage.</div>`);
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

        return { attacker: attacker, defender: defender, log: log, cssClasses: cssClasses, skip: false };
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
                enemy.experience -= lostExperience;
                resultExperience = { ownedExperience: gainedExperience, enemyExperience: lostExperience };
                break;
            }
            case BattleResultType.Loss: {
                let gainedExperience = 3 * Math.log(10 + Math.max(-8, 1.5 * (owned.level - enemy.level)));
                gainedExperience = Math.round(this.mathService.randRange(0.8, 1.2) * this.mathService.limit(1, gainedExperience, 50));
                let lostExperience = gainedExperience / 2;
                lostExperience = Math.round(this.mathService.randRange(0.8, 1.2) * this.mathService.limit(1, lostExperience, 10));

                owned.experience -= lostExperience;
                enemy.experience += gainedExperience;
                resultExperience = { ownedExperience: lostExperience, enemyExperience: gainedExperience };
                break;
            }
            case BattleResultType.Draw: {
                let gainedExperience = 3 * Math.log(10 + Math.max(-8, 1.5 * (enemy.level - owned.level)));
                gainedExperience = Math.round(this.mathService.randRange(0.8, 1.2) * this.mathService.limit(1, gainedExperience, 50));

                owned.experience += gainedExperience;
                enemy.experience += gainedExperience;
                resultExperience = { ownedExperience: gainedExperience, enemyExperience: gainedExperience };
                break;
            }
        }

        owned.stamina -= 3 + Math.floor(battleLength / 25);
        if (owned.stamina < 0) owned.stamina = 0;

        owned.battledWith.push(enemy.id);

        if (owned.experience < 0) owned.experience = 0;
        if (enemy.experience < 0) enemy.experience = 0;

        await this.dragonRepository.update(
            owned.id, 
            { experience: owned.experience, stamina: owned.stamina, battledWith: owned.battledWith },
        );
        await this.dragonRepository.update(
            enemy.id,
            { experience: enemy.experience },
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
