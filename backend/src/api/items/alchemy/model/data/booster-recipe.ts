import { BUBULAE_STEAK, IHON_BERRY, RELIQUM_EGG, RORIS_LEAVES, SPIRAL_NUT } from "src/api/items/item/model/data/food";
import { ARTICHOKE, SOVAGA_LEAVES } from "src/api/items/item/model/data/ingredients";
import { BoosterRecipeDto } from "../dto/booster-recipe.dto";
import { BOOSTER_AGILITY, BOOSTER_ATTACK, BOOSTER_DEFENSE, BOOSTER_WISDOM } from "./boosters";

export const RECIPE_BOOSTER_ATTACK: BoosterRecipeDto = {
    uid: 'recipe-b-1',
    product: { ...BOOSTER_ATTACK, quantity: 1 },
    ingredients: [
        { ...SOVAGA_LEAVES, quantity: 4 },
        { ...BUBULAE_STEAK, quantity: 8 },
        { ...RORIS_LEAVES, quantity: 2 },
        { ...ARTICHOKE, quantity: 1 },
    ],
};

export const RECIPE_BOOSTER_DEFENCE: BoosterRecipeDto = {
    uid: 'recipe-b-2',
    product: { ...BOOSTER_DEFENSE, quantity: 1 },
    ingredients: [
        { ...SOVAGA_LEAVES, quantity: 4 },
        { ...RELIQUM_EGG, quantity: 8 },
        { ...RORIS_LEAVES, quantity: 2 },
        { ...ARTICHOKE, quantity: 1 },
    ],
};

export const RECIPE_BOOSTER_AGILITY: BoosterRecipeDto = {
    uid: 'recipe-b-3',
    product: { ...BOOSTER_AGILITY, quantity: 1 },
    ingredients: [
        { ...SOVAGA_LEAVES, quantity: 4 },
        { ...IHON_BERRY, quantity: 8 },
        { ...RORIS_LEAVES, quantity: 2 },
        { ...ARTICHOKE, quantity: 1 },
    ],
};

export const RECIPE_BOOSTER_WISDOM: BoosterRecipeDto = {
    uid: 'recipe-b-4',
    product: { ...BOOSTER_WISDOM, quantity: 1 },
    ingredients: [
        { ...SOVAGA_LEAVES, quantity: 4 },
        { ...SPIRAL_NUT, quantity: 8 },
        { ...RORIS_LEAVES, quantity: 2 },
        { ...ARTICHOKE, quantity: 1 },
    ],
};

export const BOOSTER_RECIPES: BoosterRecipeDto[] = [
    RECIPE_BOOSTER_ATTACK,
    RECIPE_BOOSTER_DEFENCE,
    RECIPE_BOOSTER_AGILITY,
    RECIPE_BOOSTER_WISDOM,
];
