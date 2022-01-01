import { DEFAULT_STARTING_FOOD_QUANTITY } from "src/configuration/item.config";
import { FoodType, ItemType } from "../definitions/item-type";
import { ItemDto } from "../dto/item.dto"

export const BUBULAE_STEAK: ItemDto = {
    name: 'BubulaeSteak',
    level: 0,
    quantity: DEFAULT_STARTING_FOOD_QUANTITY,
    type: ItemType.Food,
    foodType: FoodType.Strength,
};

export const IHON_BERRY: ItemDto = {
    name: 'IhonBerry',
    level: 0,
    quantity: DEFAULT_STARTING_FOOD_QUANTITY,
    type: ItemType.Food,
    foodType: FoodType.Dexterity,
};

export const RELIQUM_EGG: ItemDto = {
    name: 'ReliqumEgg',
    level: 0,
    quantity: DEFAULT_STARTING_FOOD_QUANTITY,
    type: ItemType.Food,
    foodType: FoodType.Endurance,
};

export const SPIRAL_NUT: ItemDto = {
    name: 'SpirialNut',
    level: 0,
    quantity: DEFAULT_STARTING_FOOD_QUANTITY,
    type: ItemType.Food,
    foodType: FoodType.Will,
};

export const RORIS_LEEFS: ItemDto = {
    name: 'RorisLeefs',
    level: 0,
    quantity: DEFAULT_STARTING_FOOD_QUANTITY,
    type: ItemType.Food,
    foodType: FoodType.Luck,
};
