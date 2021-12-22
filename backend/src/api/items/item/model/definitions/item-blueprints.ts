import { DEFAULT_STARTING_FOOD_QUANTITY } from "src/configuration/item.config";
import { CreateItemDto } from "../dto/create-item.dto";
import { FoodType, ItemType } from "./item-type";

export const StartingItems: CreateItemDto[] = [
    {
        name: 'bubulaeSteak',
        quantity: DEFAULT_STARTING_FOOD_QUANTITY,
        type: ItemType.Food,
        foodType: FoodType.Strength,
    },
    {
        name: 'ihonBerry',
        quantity: DEFAULT_STARTING_FOOD_QUANTITY,
        type: ItemType.Food,
        foodType: FoodType.Dexterity,
    },
    {
        name: 'reliqumEgg',
        quantity: DEFAULT_STARTING_FOOD_QUANTITY,
        type: ItemType.Food,
        foodType: FoodType.Endurance,
    },
    {
        name: 'spirialNut',
        quantity: DEFAULT_STARTING_FOOD_QUANTITY,
        type: ItemType.Food,
        foodType: FoodType.Will,
    },
    {
        name: 'rorisLeefs',
        quantity: DEFAULT_STARTING_FOOD_QUANTITY,
        type: ItemType.Food,
        foodType: FoodType.Luck,
    },
];