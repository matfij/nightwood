import { EquipmentType, ItemRarity, ItemType } from "../model/definitions/items";
import { ItemDto } from "../model/dto/item.dto";

export const RUNE_ATTACK_1: ItemDto = {
    uid: 'item-r-7',
    name: 'Attack Rune I',
    level: 10,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        strength: 3,
        criticalChance: 4,
        criticalPower: 0.2,
    },
};

export const RUNE_ATTACK_2: ItemDto = {
    uid: 'item-r-8',
    name: 'Attack Rune II',
    level: 30,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        strength: 10,
        criticalChance: 4,
        criticalPower: 0.2,
    },
};

export const RUNE_ATTACK_3: ItemDto = {
    uid: 'item-r-9',
    name: 'Attack Rune III',
    level: 60,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        strength: 20,
        criticalChance: 4,
        criticalPower: 0.2,
    },
};

export const RUNE_ATTACK_4: ItemDto = {
    uid: 'item-r-19',
    name: 'Attack Rune IV',
    level: 90,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        strength: 30,
        criticalChance: 4,
        criticalPower: 0.2,
    },
};

export const RUNE_DEFENSE_1: ItemDto = {
    uid: 'item-r-10',
    name: 'Defense Rune I',
    level: 10,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        health: 40,
        armor: 4,
    }
};

export const RUNE_DEFENSE_2: ItemDto = {
    uid: 'item-r-11',
    name: 'Defense Rune II',
    level: 30,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        health: 120,
        armor: 12,
    }
};

export const RUNE_DEFENSE_3: ItemDto = {
    uid: 'item-r-12',
    name: 'Defense Rune III',
    level: 60,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        health: 240,
        armor: 24,
    }
};

export const RUNE_DEFENSE_4: ItemDto = {
    uid: 'item-r-20',
    name: 'Defense Rune IV',
    level: 90,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        health: 360,
        armor: 36,
    }
};

export const RUNE_AGILITY_1: ItemDto = {
    uid: 'item-r-13',
    name: 'Agility Rune I',
    level: 10,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        dexterity: 3,
        speed: 5,
    }
};

export const RUNE_AGILITY_2: ItemDto = {
    uid: 'item-r-14',
    name: 'Agility Rune II',
    level: 30,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        dexterity: 10,
        speed: 15,
    }
};

export const RUNE_AGILITY_3: ItemDto = {
    uid: 'item-r-15',
    name: 'Agility Rune III',
    level: 60,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        dexterity: 20,
        speed: 30,
    },
};

export const RUNE_AGILITY_4: ItemDto = {
    uid: 'item-r-21',
    name: 'Agility Rune IV',
    level: 90,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        dexterity: 30,
        speed: 45,
    },
};

export const RUNE_WISDOM_1: ItemDto = {
    uid: 'item-r-16',
    name: 'Wisdom Rune I',
    level: 10,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        allAttributes: 1,
        mana: 15,
    },
};

export const RUNE_WISDOM_2: ItemDto = {
    uid: 'item-r-17',
    name: 'Wisdom Rune II',
    level: 30,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        allAttributes: 3,
        mana: 30,
    },
};

export const RUNE_WISDOM_3: ItemDto = {
    uid: 'item-r-18',
    name: 'Wisdom Rune III',
    level: 60,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        allAttributes: 7,
        mana: 60,
    },
};

export const RUNE_WISDOM_4: ItemDto = {
    uid: 'item-r-22',
    name: 'Wisdom Rune IV',
    level: 90,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        allAttributes: 10,
        mana: 90,
    },
};

/**
 * Special runes
 */

export const RUNE_SPECIAL_ATTACK_1: ItemDto = {
    uid: 'item-r-23',
    name: 'Pupil\'s Attack',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        strength: 1,
        criticalChance: 1,
    },
};

export const RUNE_SPECIAL_ATTACK_2: ItemDto = {
    uid: 'item-r-27',
    name: 'Veteran Strength',
    level: 50,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        strength: 30,
        armor: -15,
        health: 200,
        criticalChance: 2,
    },
};

export const RUNE_SPECIAL_ATTACK_3: ItemDto = {
    uid: 'item-r-31',
    name: 'Tauro Forto',
    level: 100,
    rarity: ItemRarity.Rare,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        strength: 45,
        health: -200,
        criticalChance: 5,
        allAttributes: 10,
    },
};

export const RUNE_SPECIAL_DEFENSE_1: ItemDto = {
    uid: 'item-r-24',
    name: 'Pupil\'s Defense',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        health: 15,
        armor: 1,
    },
};

export const RUNE_SPECIAL_DEFENSE_2: ItemDto = {
    uid: 'item-r-28',
    name: 'Veteran Tenacity',
    level: 50,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        speed: 25,
        armor: 25,
        resistance: 25,
        criticalChance: -5,
    },
};

export const RUNE_SPECIAL_DEFENSE_3: ItemDto = {
    uid: 'item-r-32',
    name: 'Cevala Sano',
    level: 100,
    rarity: ItemRarity.Rare,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        health: 300,
        healthRegeneration: 100,
        armor: 30,
        resistance: 30,
        speed: -30,
    },
};

export const RUNE_SPECIAL_AGILITY_1: ItemDto = {
    uid: 'item-r-25',
    name: 'Pupil\'s Agility',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        dexterity: 1,
        speed: 1,
    },
};

export const RUNE_SPECIAL_AGILITY_2: ItemDto = {
    uid: 'item-r-29',
    name: 'Veteran Dexterity',
    level: 50,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        initiative: 60,
        speed: 30,
        criticalChance: 1,
        mana: -60,
    },
};

export const RUNE_SPECIAL_AGILITY_3: ItemDto = {
    uid: 'item-r-33',
    name: 'Kata Lerteco',
    level: 100,
    rarity: ItemRarity.Rare,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        initiative: 45,
        speed: 45,
        criticalChance: 5,
        dodge: 10,
        armor: -30,
    },
};

export const RUNE_SPECIAL_WISDOM_1: ItemDto = {
    uid: 'item-r-26',
    name: 'Pupil\'s Knwoledge',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        will: 1,
        mana: 10,
    },
};

export const RUNE_SPECIAL_WISDOM_2: ItemDto = {
    uid: 'item-r-30',
    name: 'Veteran Wisdom',
    level: 50,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        will: 30,
        luck: 30,
        health: -90,
    },
};

export const RUNE_SPECIAL_WISDOM_3: ItemDto = {
    uid: 'item-r-34',
    name: 'Strigo Sago',
    level: 100,
    rarity: ItemRarity.Rare,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
    statistics: {
        will: 45,
        healthRegeneration: 100,
        luck: -30,
    },
};

export const RUNES_BASE = [
    RUNE_ATTACK_1,
    RUNE_ATTACK_2,
    RUNE_ATTACK_3,
    RUNE_ATTACK_4,
    RUNE_DEFENSE_1,
    RUNE_DEFENSE_2,
    RUNE_DEFENSE_3,
    RUNE_DEFENSE_4,
    RUNE_AGILITY_1,
    RUNE_AGILITY_2,
    RUNE_AGILITY_3,
    RUNE_AGILITY_4,
    RUNE_WISDOM_1,
    RUNE_WISDOM_2,
    RUNE_WISDOM_3,
    RUNE_WISDOM_4,
];

export const RUNES_SPECIAL = [
    RUNE_SPECIAL_ATTACK_1,
    RUNE_SPECIAL_DEFENSE_1,
    RUNE_SPECIAL_AGILITY_1,
    RUNE_SPECIAL_WISDOM_1,
    RUNE_SPECIAL_ATTACK_2,
    RUNE_SPECIAL_DEFENSE_2,
    RUNE_SPECIAL_AGILITY_2,
    RUNE_SPECIAL_WISDOM_2,
    RUNE_SPECIAL_ATTACK_3,
    RUNE_SPECIAL_DEFENSE_3,
    RUNE_SPECIAL_AGILITY_3,
    RUNE_SPECIAL_WISDOM_3,
];

export const RUNES = [
    ...RUNES_BASE,
    ...RUNES_SPECIAL,
];
