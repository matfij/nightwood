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
