import { ItemType } from "src/api/items/item/model/definitions/item-type";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";

export const BOOSTER_ATTACK: ItemDto = {
    uid: 'item-b-1',
    name: 'Attack Booster',
    level: 10,
    type: ItemType.Booster,
    statistics: {
        physicalAttackBoost: 0.1,
        criticalChanceBoost: 0.2,
    }
};

export const BOOSTER_DEFENSE: ItemDto = {
    uid: 'item-b-2',
    name: 'Defense Booster',
    level: 10,
    type: ItemType.Booster,
    statistics: {
        healthBoost: 0.2,
        armorBoost: 0.1,
    }
};

export const BOOSTER_AGILITY: ItemDto = {
    uid: 'item-b-3',
    name: 'Agility Booster',
    level: 10,
    type: ItemType.Booster,
    statistics: {
        speedBoost: 0.1,
        dodgeBoost: 0.2,
    }
};

export const BOOSTER_WISDOM: ItemDto = {
    uid: 'item-b-4',
    name: 'Wisdom Booster',
    level: 10,
    type: ItemType.Booster,
    statistics: {
        manaBoost: 0.1,
        criticalPower: 0.2,
    }
};


export const BOOSTERS = [
    BOOSTER_ATTACK,
    BOOSTER_DEFENSE,
    BOOSTER_AGILITY,
    BOOSTER_WISDOM,
];
