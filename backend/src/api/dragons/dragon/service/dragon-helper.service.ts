import { Injectable } from "@nestjs/common";
import { BOOSTERS } from "src/api/items/alchemy/model/data/boosters";
import { EquipmentStatisticsDto } from "src/api/items/item/model/definitions/equipment";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";
import { MathService } from "src/common/services/math.service";
import { BattleDragonDto } from "../model/definitions/dragon-battle";
import { DragonDto } from "../model/dto/dragon.dto";

@Injectable()
export class BattleHelperService {

    private readonly BASE_HEALTH = 100;
    private readonly BASE_MANA = 20;
    private readonly BASE_ARMOR = 5;
    private readonly BASE_RESISTANCE = 5;
    private readonly BASE_SPEED = 10;
    private readonly MAX_DODGE_CHANCE = 0.5;
    private readonly BASE_PHYSICAL_ATTACK = 10;
    private readonly BASE_MAGICAL_ATTACK = 10;
    private readonly BASE_CRIT_CHANCE = 0.05;
    private readonly BASE_CRIT_POWER = 1.5;
    private readonly MAX_CRIT_CHANCE = 0.5;
    private readonly MAX_CRIT_POWER = 3;

    constructor (
        private mathService: MathService,
    ) {}

    calculateBattleStats(dragon: DragonDto, baseRival: DragonDto): BattleDragonDto {
        const rival = this.getRawStats(baseRival);
        const runeStats = this.getRunesStats(dragon.runes);
        const boosterStats = this.getBoosterStats(dragon.boosterUid);

        dragon.strength += runeStats.strength + runeStats.allAttributes;
        dragon.dexterity += runeStats.dexterity + runeStats.allAttributes;
        dragon.endurance += runeStats.endurance + runeStats.allAttributes;
        dragon.will += runeStats.will + runeStats.allAttributes;
        dragon.luck += runeStats.luck + runeStats.allAttributes;

        let health = this.BASE_HEALTH + 5 * dragon.endurance + dragon.strength + dragon.will + runeStats.health;
        let mana = this.BASE_MANA + 4 * dragon.will + runeStats.mana;
        let armor = this.BASE_ARMOR + 0.9 * dragon.endurance + runeStats.armor;
        let resistance = this.BASE_RESISTANCE + 0.6 * dragon.will + runeStats.resistance;
        let speed = this.BASE_SPEED + 1.5 * dragon.dexterity + runeStats.speed;
        let physicalAttack = this.BASE_PHYSICAL_ATTACK + dragon.strength + 0.1 * dragon.dexterity + 0.1 * dragon.will;
        let magicalAttack = this.BASE_MAGICAL_ATTACK + dragon.will + 0.1 * dragon.luck;
        
        health = health * (1 + dragon.skills.greatVigor / 50) * (1 + boosterStats.healthBoost ?? 0);
        mana = mana * (1 + dragon.skills.innerFlow / 40) * (1 + boosterStats.manaBoost ?? 0);
        armor = armor * (1 + boosterStats.armorBoost ?? 0);
        resistance = resistance + 0.2 * armor;
        speed = speed * (1 + dragon.skills.innateSpeed / 60) * (1 + boosterStats.speedBoost ?? 0);
        physicalAttack = physicalAttack * (1 + boosterStats.physicalAttackBoost ?? 0);
        magicalAttack = magicalAttack * (1 + boosterStats.magicalAttackBoost ?? 0);
        let manaRegen =  mana * (dragon.skills.innerFlow / 40);

        const initiative = speed + runeStats.initiative;
        const critChance = Math.min(
            this.MAX_CRIT_CHANCE, 
            (1 + boosterStats.criticalChanceBoost ?? 0) * (this.BASE_CRIT_CHANCE + dragon.luck / (dragon.level + 10) + runeStats.criticalChance / 100 + (dragon.skills.luckyStrike / 100))
        );
        const critPower = Math.min(
            this.MAX_CRIT_POWER, 
            this.BASE_CRIT_POWER + dragon.luck / (dragon.level + 10) + runeStats.criticalPower
        );
        const dodgeChance = Math.min(
            this.MAX_DODGE_CHANCE, 
            (1 + boosterStats.dodgeBoost ?? 0) * ((dragon.dexterity + dragon.luck) / (2*dragon.level + 20)) * (1 - rival.skills.thoughtfulStrike / 50)
        );

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
        };
    }

    getRawStats(dragon: DragonDto): BattleDragonDto {
        const runeStats = this.getRunesStats(dragon.runes);
        const boosterStats = this.getBoosterStats(dragon.boosterUid);
        
        dragon.strength += runeStats.strength + runeStats.allAttributes;
        dragon.dexterity += runeStats.dexterity + runeStats.allAttributes;
        dragon.endurance += runeStats.endurance + runeStats.allAttributes;
        dragon.will += runeStats.will + runeStats.allAttributes;
        dragon.luck += runeStats.luck + runeStats.allAttributes;

        let health = this.BASE_HEALTH + 5 * dragon.endurance + dragon.strength + dragon.will + runeStats.health;
        let mana = this.BASE_MANA + 4 * dragon.will + runeStats.mana;
        let armor = this.BASE_ARMOR + 0.9 * dragon.endurance + runeStats.armor;
        let resistance = this.BASE_RESISTANCE + 0.6 * dragon.will + runeStats.resistance;
        let speed = this.BASE_SPEED + 1.5 * dragon.dexterity + runeStats.speed;
        let physicalAttack = this.BASE_PHYSICAL_ATTACK + dragon.strength + 0.1 * dragon.dexterity;
        let magicalAttack = this.BASE_MAGICAL_ATTACK + dragon.will + 0.1 * dragon.luck;
        
        health = health * (1 + dragon.skills.greatVigor / 50) * (1 + boosterStats.healthBoost ?? 0);
        mana = mana * (1 + dragon.skills.innerFlow / 40) * (1 + boosterStats.manaBoost ?? 0);
        armor = armor * (1 + boosterStats.armorBoost ?? 0);
        resistance = resistance + 0.2 * armor;
        speed = speed * (1 + dragon.skills.innateSpeed / 60) * (1 + boosterStats.speedBoost ?? 0);
        physicalAttack = physicalAttack * (1 + boosterStats.physicalAttackBoost ?? 0);
        magicalAttack = magicalAttack * (1 + boosterStats.magicalAttackBoost ?? 0);
        let manaRegen =  mana * (dragon.skills.innerFlow / 40);

        const initiative = speed + runeStats.initiative;
        const critChance = Math.min(
            this.MAX_CRIT_CHANCE, 
            (1 + boosterStats.criticalChanceBoost ?? 0) * (this.BASE_CRIT_CHANCE + dragon.luck / (dragon.level + 10) + runeStats.criticalChance / 100 + (dragon.skills.luckyStrike / 100))
        );
        const critPower = Math.min(
            this.MAX_CRIT_POWER, 
            this.BASE_CRIT_POWER + dragon.luck / (dragon.level + 10) + runeStats.criticalPower
        );
        const dodgeChance = Math.min(
            this.MAX_DODGE_CHANCE, 
            (1 + boosterStats.dodgeBoost ?? 0) * ((dragon.dexterity + dragon.luck) / (2*dragon.level + 20))
        );

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
        };
        runes.forEach(rune => {
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
        }
        const booster = BOOSTERS.find(b => b.uid === boosterUid);
        return { ...boosterStats, ...booster?.statistics };
    }
}
