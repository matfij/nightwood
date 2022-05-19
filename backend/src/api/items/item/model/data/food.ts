import { ItemRarity } from "../definitions/item-rarity";
import { FoodType, ItemType } from "../definitions/item-type";
import { ItemDto } from "../dto/item.dto"

export const BUBULAE_STEAK: ItemDto = {
    uid: 'item-f-1',
    name: 'Bubulae Steak',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Food,
    foodType: FoodType.Strength,
};

export const IHON_BERRY: ItemDto = {
    uid: 'item-f-2',
    name: 'Ihon Berry',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Food,
    foodType: FoodType.Dexterity,
};

export const RELIQUM_EGG: ItemDto = {
    uid: 'item-f-3',
    name: 'Reliqum Egg',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Food,
    foodType: FoodType.Endurance,
};

export const SPIRAL_NUT: ItemDto = {
    uid: 'item-f-4',
    name: 'Spirial Nut',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Food,
    foodType: FoodType.Will,
};

export const RORIS_LEEFS: ItemDto = {
    uid: 'item-f-5',
    name: 'Roris Leefs',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Food,
    foodType: FoodType.Luck,
};

export const MIRACLE_FRUIT: ItemDto = {
    uid: 'item-f-6',
    name: 'Miracle Fruit',
    level: 1,
    rarity: ItemRarity.Rare,
    type: ItemType.Food,
    foodType: FoodType.Complete,
};

export const MIGHTY_EXTRACT: ItemDto = {
    uid: 'item-f-7',
    name: 'Mighty Extract',
    level: 10,
    rarity: ItemRarity.Scarce,
    type: ItemType.Food,
    foodType: FoodType.StrengthPotion,
};

export const NIMBUS_NECTAR: ItemDto = {
    uid: 'item-f-8',
    name: 'Nimbus Nectar',
    level: 10,
    rarity: ItemRarity.Scarce,
    type: ItemType.Food,
    foodType: FoodType.DexterityPotion,
};

export const TITAN_BREW: ItemDto = {
    uid: 'item-f-9',
    name: 'Titan Potion',
    level: 10,
    rarity: ItemRarity.Scarce,
    type: ItemType.Food,
    foodType: FoodType.EndurancePotion,
};

export const ENCHANTER_POTION: ItemDto = {
    uid: 'item-f-10',
    name: 'Enchanters Potion',
    level: 10,
    rarity: ItemRarity.Scarce,
    type: ItemType.Food,
    foodType: FoodType.WillPotion,
};

export const RAINBOW_MIXTURE: ItemDto = {
    uid: 'item-f-11',
    name: 'Lucky Extract',
    level: 10,
    rarity: ItemRarity.Scarce,
    type: ItemType.Food,
    foodType: FoodType.LuckPotion,
};

export const SPARKING_AMBROSIA: ItemDto = {
    uid: 'item-f-12',
    name: 'Sparkling Ambrosia',
    level: 10,
    rarity: ItemRarity.Rare,
    type: ItemType.Food,
    foodType: FoodType.CompletePotion,
};
