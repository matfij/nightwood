import { ItemRarity } from "../definitions/item-rarity";
import { EquipmentType, ItemType } from "../definitions/item-type";
import { ItemDto } from "../dto/item.dto";

export const SHARD_ATTACK: ItemDto = {
    uid: 'item-r-1',
    name: 'Attack Shard',
    level: 1,
    rarity: ItemRarity.Scarce,
    type: ItemType.Ingredient,
};

export const SHARD_DEFENCE: ItemDto = {
    uid: 'item-r-2',
    name: 'Defence Shard',
    level: 1,
    rarity: ItemRarity.Scarce,
    type: ItemType.Ingredient,
};

export const SHARD_AGILITY: ItemDto = {
    uid: 'item-r-3',
    name: 'Agility Shard',
    level: 1,
    rarity: ItemRarity.Scarce,
    type: ItemType.Ingredient,
};

export const SHARD_WISDOM: ItemDto = {
    uid: 'item-r-4',
    name: 'Wisdom Shard',
    level: 1,
    rarity: ItemRarity.Scarce,
    type: ItemType.Ingredient,
};

export const SHARD_UNITY: ItemDto = {
    uid: 'item-r-5',
    name: 'Unity Shard',
    level: 10,
    rarity: ItemRarity.Rare,
    type: ItemType.Ingredient,
};

export const SHARD_BLANK: ItemDto = {
    uid: 'item-r-6',
    name: 'Blank Shard',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Ingredient,
};

export const RUNE_ATTACK_1: ItemDto = {
    uid: 'item-r-7',
    name: 'Attack Rune I',
    level: 10,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
};

export const RUNE_ATTACK_2: ItemDto = {
    uid: 'item-r-8',
    name: 'Attack Rune II',
    level: 30,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
};

export const RUNE_ATTACK_3: ItemDto = {
    uid: 'item-r-9',
    name: 'Attack Rune III',
    level: 60,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
};

export const RUNE_DEFENSE_1: ItemDto = {
    uid: 'item-r-10',
    name: 'Defense Rune I',
    level: 10,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
};

export const RUNE_DEFENSE_2: ItemDto = {
    uid: 'item-r-11',
    name: 'Defense Rune II',
    level: 30,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
};

export const RUNE_DEFENSE_3: ItemDto = {
    uid: 'item-r-12',
    name: 'Defense Rune III',
    level: 60,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
};

export const RUNE_AGILITY_1: ItemDto = {
    uid: 'item-r-13',
    name: 'Agility Rune I',
    level: 10,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
};

export const RUNE_AGILITY_2: ItemDto = {
    uid: 'item-r-14',
    name: 'Agility Rune II',
    level: 30,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
};

export const RUNE_AGILITY_3: ItemDto = {
    uid: 'item-r-15',
    name: 'Agility Rune III',
    level: 60,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
};

export const RUNE_WISDOM_1: ItemDto = {
    uid: 'item-r-16',
    name: 'Wisdom Rune I',
    level: 10,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
};

export const RUNE_WISDOM_2: ItemDto = {
    uid: 'item-r-17',
    name: 'Wisdom Rune II',
    level: 30,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
};

export const RUNE_WISDOM_3: ItemDto = {
    uid: 'item-r-18',
    name: 'Wisdom Rune III',
    level: 60,
    rarity: ItemRarity.Scarce,
    type: ItemType.Equipment,
    equipmentType: EquipmentType.Rune,
};
