import { Injectable } from '@nestjs/common';
import { BOOSTERS } from 'src/api/items/alchemy/data/boosters';
import { EquipmentStatisticsDto } from 'src/api/items/item/model/dto/equipment-statistics.dto';
import { ItemDto } from 'src/api/items/item/model/dto/item.dto';
import { MathService } from 'src/common/services/math.service';
import { ExpeditionGuardianDto } from '../../dragon-action/model/dto/expedition-guardian.dto';
import { DragonBattleDto } from '../model/dto/dragon-battle.dto';
import { DragonDto } from '../model/dto/dragon.dto';

@Injectable()
export class BattleHelperService {
    private readonly BASE_HEALTH = 100;
    private readonly BASE_MANA = 20;
    private readonly BASE_ARMOR = 5;
    private readonly BASE_RESISTANCE = 5;
    private readonly BASE_SPEED = 10;
    private readonly BASE_INITIATIVE = 10;
    private readonly MAX_DODGE_CHANCE = 0.5;
    private readonly BASE_DODGE_CHANCE = 0.05;
    private readonly BASE_PHYSICAL_ATTACK = 10;
    private readonly BASE_MAGICAL_ATTACK = 10;
    private readonly BASE_CRIT_CHANCE = 0.05;
    private readonly BASE_CRIT_POWER = 1.5;
    private readonly MAX_CRIT_CHANCE = 0.5;
    private readonly MAX_CRIT_POWER = 3;

    constructor(private mathService: MathService) {}

    calculateBattleStats(dragon: Partial<DragonDto>): DragonBattleDto {
        const runeStats = this.getRunesStats(dragon.runes);
        const boosterStats = this.getBoosterStats(dragon.boosterUid);

        dragon.strength += runeStats.strength + runeStats.allAttributes;
        dragon.dexterity += runeStats.dexterity + runeStats.allAttributes;
        dragon.endurance += runeStats.endurance + runeStats.allAttributes;
        dragon.will += runeStats.will + runeStats.allAttributes;
        dragon.luck += runeStats.luck + runeStats.allAttributes;

        let health =
            this.BASE_HEALTH + 5 * dragon.endurance + dragon.strength + dragon.will + runeStats.health;
        let mana = this.BASE_MANA + 4 * dragon.will + runeStats.mana;
        let armor = this.BASE_ARMOR + 0.9 * dragon.endurance + runeStats.armor;
        let resistance = this.BASE_RESISTANCE + 0.8 * dragon.will + runeStats.resistance;
        let speed = this.BASE_SPEED + 1.5 * dragon.dexterity + runeStats.speed;
        let physicalAttack =
            this.BASE_PHYSICAL_ATTACK +
            dragon.strength +
            0.1 * dragon.dexterity +
            0.1 * dragon.will +
            runeStats.physicalAttack;
        let magicalAttack =
            this.BASE_MAGICAL_ATTACK + dragon.will + 0.1 * dragon.luck + runeStats.magicalAttack;

        health = health * (1 + (dragon.skills.greatVigor || 0) / 50) * (1 + boosterStats.healthBoost ?? 0);
        mana = mana * (1 + (dragon.skills.innerFlow || 0) / 40) * (1 + boosterStats.manaBoost ?? 0);
        armor = armor * (1 + boosterStats.armorBoost ?? 0) * (1 + (dragon.skills.inferialBlessing || 0) / 50);
        resistance = (resistance + 0.3 * armor) * (1 + (dragon.skills.inferialBlessing || 0) / 50);
        speed = speed * (1 + (dragon.skills.innateSpeed || 0) / 60) * (1 + boosterStats.speedBoost ?? 0);
        physicalAttack = physicalAttack * (1 + boosterStats.physicalAttackBoost ?? 0);
        magicalAttack = magicalAttack * (1 + boosterStats.magicalAttackBoost ?? 0);
        let manaRegen = mana * ((dragon.skills.innerFlow || 0) / 40) + runeStats.manaRegeneration;
        let healthRegen = 0 + runeStats.healthRegeneration;

        let initiative = speed + runeStats.initiative;
        let critChance = Math.min(
            this.MAX_CRIT_CHANCE,
            (1 + boosterStats.criticalChanceBoost ?? 0) *
                (this.BASE_CRIT_CHANCE +
                    dragon.luck / (dragon.level + 10) +
                    runeStats.criticalChance / 100 +
                    (dragon.skills.luckyStrike || 0) / 100),
        );
        let critPower = Math.min(
            this.MAX_CRIT_POWER,
            this.BASE_CRIT_POWER + dragon.luck / (dragon.level + 10) + runeStats.criticalPower,
        );
        let dodgeChance = Math.min(
            this.MAX_DODGE_CHANCE,
            (1 + boosterStats.dodgeBoost ?? 0) *
                ((dragon.dexterity + dragon.luck) / (2 * dragon.level + 20)) +
                runeStats.dodge / 100 +
                dragon.skills.dodge / 170,
        );

        health = Math.max(this.BASE_HEALTH, health);
        mana = Math.max(this.BASE_MANA, mana);
        resistance = Math.max(this.BASE_RESISTANCE, resistance);
        armor = Math.max(this.BASE_ARMOR, armor);
        critChance = Math.max(this.BASE_CRIT_CHANCE, critChance);
        speed = Math.max(this.BASE_SPEED, speed);
        initiative = Math.max(this.BASE_INITIATIVE, initiative);
        physicalAttack = Math.max(this.BASE_PHYSICAL_ATTACK, physicalAttack);
        magicalAttack = Math.max(this.BASE_MAGICAL_ATTACK, magicalAttack);
        dodgeChance = Math.max(this.BASE_DODGE_CHANCE, dodgeChance);

        return {
            ...dragon,
            maxHealth: health,
            health: health,
            maxMana: mana,
            mana: mana,
            manaRegen: manaRegen,
            physicalAttack: physicalAttack,
            magicalAttack: magicalAttack,
            armor: armor,
            resistance: resistance,
            speed: speed,
            initiative: initiative,
            critChance: critChance,
            critPower: critPower,
            dodgeChance: dodgeChance,
            healthRegen: healthRegen,
            deepWounds: 0,
        };
    }

    private getRunesStats(runes: ItemDto[]): EquipmentStatisticsDto {
        const runeStats: EquipmentStatisticsDto = {
            health: 0,
            mana: 0,
            armor: 0,
            resistance: 0,
            speed: 0,
            initiative: 0,
            strength: 0,
            dexterity: 0,
            endurance: 0,
            will: 0,
            luck: 0,
            allAttributes: 0,
            criticalChance: 0,
            criticalPower: 0,
            healthRegeneration: 0,
            manaRegeneration: 0,
            physicalAttack: 0,
            magicalAttack: 0,
            dodge: 0,
        };
        runes.forEach((rune) => {
            runeStats.health += rune.statistics.health ?? 0;
            runeStats.mana += rune.statistics.mana ?? 0;
            runeStats.armor += rune.statistics.armor ?? 0;
            runeStats.resistance += rune.statistics.resistance ?? 0;
            runeStats.speed += rune.statistics.speed ?? 0;
            runeStats.initiative += rune.statistics.initiative ?? 0;
            runeStats.strength += rune.statistics.strength ?? 0;
            runeStats.dexterity += rune.statistics.dexterity ?? 0;
            runeStats.endurance += rune.statistics.endurance ?? 0;
            runeStats.will += rune.statistics.will ?? 0;
            runeStats.luck += rune.statistics.luck ?? 0;
            runeStats.allAttributes += rune.statistics.allAttributes ?? 0;
            runeStats.criticalChance += rune.statistics.criticalChance ?? 0;
            runeStats.criticalPower += rune.statistics.criticalPower ?? 0;
            runeStats.healthRegeneration += rune.statistics.healthRegeneration ?? 0;
            runeStats.manaRegeneration += rune.statistics.manaRegeneration ?? 0;
            runeStats.physicalAttack += rune.statistics.physicalAttack ?? 0;
            runeStats.magicalAttack += rune.statistics.magicalAttack ?? 0;
            runeStats.dodge += rune.statistics.dodge ?? 0;
        });
        return runeStats;
    }

    private getBoosterStats(boosterUid: string): EquipmentStatisticsDto {
        let boosterStats: EquipmentStatisticsDto = {
            healthBoost: 0,
            manaBoost: 0,
            armorBoost: 0,
            physicalAttackBoost: 0,
            magicalAttackBoost: 0,
            criticalChanceBoost: 0,
            speedBoost: 0,
            dodgeBoost: 0,
        };
        const booster = BOOSTERS.find((b) => b.uid === boosterUid);
        return { ...boosterStats, ...booster?.statistics };
    }

    createDragonFromGuardian(guardian: ExpeditionGuardianDto): Partial<DragonDto> {
        const dragon: Partial<DragonDto> = {
            ...guardian,
        };

        return dragon;
    }

    getSkillLog(
        name: string,
        attacker: DragonBattleDto,
        defender: DragonBattleDto,
        baseDamage: number,
        inflictedDamege: number,
        extraLogs: string[],
        extraClasses?: string,
    ) {
        let log = `
        <div class="item-log log-skill ${extraClasses}">
            ${attacker.name} (${Math.round(attacker.health)}) uses <b>${name}</b>
            with power of ${Math.round(baseDamage)}`;
        extraLogs.forEach((extraLog) => (log += extraLog));
        log += `<div>${defender.name} (${Math.round(defender.health)}) took ${Math.round(inflictedDamege)} damage</div></div>`;
        return log;
    }
}
