import { ItemRarity } from "../definitions/item-rarity";
import { FoodType, ItemType } from "../definitions/item-type";
import { ItemDto } from "../dto/item.dto"

export const BUBULAE_STEAK: ItemDto = {
    name: 'BubulaeSteak',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Food,
    foodType: FoodType.Strength,
};

export const IHON_BERRY: ItemDto = {
    name: 'IhonBerry',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Food,
    foodType: FoodType.Dexterity,
};

export const RELIQUM_EGG: ItemDto = {
    name: 'ReliqumEgg',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Food,
    foodType: FoodType.Endurance,
};

export const SPIRAL_NUT: ItemDto = {
    name: 'SpirialNut',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Food,
    foodType: FoodType.Will,
};

export const RORIS_LEEFS: ItemDto = {
    name: 'RorisLeefs',
    level: 1,
    rarity: ItemRarity.Common,
    type: ItemType.Food,
    foodType: FoodType.Luck,
};

export const MIRACLE_FRUIT: ItemDto = {
    name: 'MiracleFruit',
    level: 1,
    rarity: ItemRarity.Rare,
    type: ItemType.Food,
    foodType: FoodType.Complete,
};
