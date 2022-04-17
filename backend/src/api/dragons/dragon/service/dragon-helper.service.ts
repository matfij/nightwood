import { Injectable } from "@nestjs/common";
import { EquipmentStatisticsDto } from "src/api/items/item/model/definitions/equipment";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";
import { MathService } from "src/common/services/math.service";
import { BattleDragon } from "../model/definitions/dragon-battle";
import { DragonDto } from "../model/dto/dragon.dto";

@Injectable()
export class BattleHelperService {

    private readonly BASE_HEALTH = 100;
    private readonly BASE_MANA = 20;
    private readonly BASE_DAMAGE = 10;
    private readonly BASE_ARMOR = 5;
    private readonly BASE_SPEED = 10;

    constructor (
        private mathService: MathService,
    ) {}

    calculateBattleStats(dragon: DragonDto, baseRival: DragonDto): BattleDragon {
        const rival = this.getRivalStats(baseRival);
        const runeStats = this.getRunesStats(dragon.runes);

        dragon.strength += runeStats.strength + runeStats.allAttributes;
        dragon.dexterity += runeStats.dexterity + runeStats.allAttributes;
        dragon.endurance += runeStats.endurance + runeStats.allAttributes;
        dragon.will += runeStats.will + runeStats.allAttributes;
        dragon.luck += runeStats.luck + runeStats.allAttributes;

        let health = this.BASE_HEALTH + 5 * dragon.endurance + 2 * dragon.strength + dragon.will + runeStats.health;
        let mana = this.BASE_MANA + 5 * dragon.will + runeStats.mana;
        let damage = this.BASE_DAMAGE + dragon.strength + 0.1 * dragon.dexterity;
        let armor = this.BASE_ARMOR + 0.8 * dragon.endurance + runeStats.armor;
        let speed = this.BASE_SPEED + 1.5 * dragon.dexterity + runeStats.speed;

        health = health * (1 + dragon.skills.greatVigor / 60);
        mana = mana * (1 + dragon.skills.innerFlow / 40);
        speed = speed * (1 + dragon.skills.innateSpeed / 60);

        const initiative = 1 * speed + runeStats.initiative;

        let critChance = Math.min(0.5, dragon.luck - 0.33 * rival.luck)
            * (1 + dragon.skills.luckyStrike / 40)
            * runeStats.criticalChance / 66;
        critChance = this.mathService.limit(0.6, critChance, 1.25);
        
        let critPower = 1.5 + runeStats.criticalPower;
        critPower = this.mathService.limit(1.25, critPower, 3);

        let dodgeChance = Math.min(0.5, dragon.dexterity - 0.33 * rival.dexterity)
            * (1 - rival.skills.thoughtfulStrike / 60);
        dodgeChance = this.mathService.limit(0.55, dodgeChance, 1.05);

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
            critChance: critChance,
            critPower: critPower,
            dodgeChance: dodgeChance,
        };
    }

    private getRivalStats(dragon: DragonDto): BattleDragon {
        const runeStats = this.getRunesStats(dragon.runes);
        
        dragon.strength += runeStats.strength + runeStats.allAttributes;
        dragon.dexterity += runeStats.dexterity + runeStats.allAttributes;
        dragon.endurance += runeStats.endurance + runeStats.allAttributes;
        dragon.will += runeStats.will + runeStats.allAttributes;
        dragon.luck += runeStats.luck + runeStats.allAttributes;

        let health = this.BASE_HEALTH + 5 * dragon.endurance + 2 * dragon.strength + dragon.will + runeStats.health;
        let mana = this.BASE_MANA + 5 * dragon.will + runeStats.mana;
        let damage = this.BASE_DAMAGE + dragon.strength + 0.1 * dragon.dexterity;
        let armor = this.BASE_ARMOR + 0.8 * dragon.endurance + runeStats.armor;
        let speed = this.BASE_SPEED + 1.5 * dragon.dexterity + runeStats.speed;

        health = health * (1 + dragon.skills.greatVigor / 60);
        mana = mana * (1 + dragon.skills.innerFlow / 40);
        speed = speed * (1 + dragon.skills.innateSpeed / 60);

        const initiative = 0;
        const critChance = 0;
        const critPower = 0;

        const dodgeChance = 0;

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
}
