import { ItemRarity } from "../definitions/item-rarity";
import { ItemType } from "../definitions/item-type";
import { ItemDto } from "../dto/item.dto";

export const ATTACK_SHARD: ItemDto = {
    uid: 'item-r-1',
    name: 'Attack Shard',
    level: 1,
    rarity: ItemRarity.Scarce,
    type: ItemType.Ingredient,
};

export const DEFENCE_SHARD: ItemDto = {
    uid: 'item-r-2',
    name: 'Defence Shard',
    level: 1,
    rarity: ItemRarity.Scarce,
    type: ItemType.Ingredient,
};

export const AGILITY_SHARD: ItemDto = {
    uid: 'item-r-3',
    name: 'Agility Shard',
    level: 1,
    rarity: ItemRarity.Scarce,
    type: ItemType.Ingredient,
};

export const WISDOM_SHARD: ItemDto = {
    uid: 'item-r-4',
    name: 'Wisdom Shard',
    level: 1,
    rarity: ItemRarity.Scarce,
    type: ItemType.Ingredient,
};

export const UNITY_SHARD: ItemDto = {
    uid: 'item-r-5',
    name: 'Unity Shard',
    level: 10,
    rarity: ItemRarity.Rare,
    type: ItemType.Ingredient,
};

export const BLANK_SHARD: ItemDto = {
    uid: 'item-r-6',
    name: 'Blank Shard',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Ingredient,
};

