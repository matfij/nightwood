import { ItemRarity } from "../definitions/item-rarity";
import { ItemType } from "../definitions/item-type";
import { ItemDto } from "../dto/item.dto";

export const TRANSMUTATION_STONE: ItemDto = {
    uid: 'item-i-1',
    name: 'Transmutation Stone',
    level: 10,
    rarity: ItemRarity.Mythical,
    type: ItemType.Ingredient,
};

export const GATE_PARTICLE: ItemDto = {
    uid: 'item-i-2',
    name: 'Gate Particle',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Ingredient,
};

export const GATE_KEY: ItemDto = {
    uid: 'item-i-3',
    name: 'Gate Key',
    level: 1,
    rarity: ItemRarity.Rare,
    type: ItemType.Ingredient,
};

export const SUPERCHARGED_CRYSTAL: ItemDto = {
    uid: 'item-i-4',
    name: 'Supercharged Crystal',
    level: 1,
    rarity: ItemRarity.Mythical,
    type: ItemType.Ingredient,
};

export const ETERNAL_FLOWER: ItemDto = {
    uid: 'item-i-5',
    name: 'Eternal Flower',
    level: 1,
    rarity: ItemRarity.Mythical,
    type: ItemType.Ingredient,
};

export const MIDNIGHT_ESSENCE: ItemDto = {
    uid: 'item-i-6',
    name: 'Midnight Essence',
    level: 1,
    rarity: ItemRarity.Mythical,
    type: ItemType.Ingredient,
};
