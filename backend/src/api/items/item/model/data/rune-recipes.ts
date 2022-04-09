
import { ItemRecipeDto } from "../dto/item-recipe.dto";
import { RUNE_AGILITY_1, RUNE_AGILITY_2, RUNE_AGILITY_3, RUNE_ATTACK_1, RUNE_ATTACK_2, RUNE_ATTACK_3, RUNE_DEFENSE_1, RUNE_DEFENSE_2, RUNE_DEFENSE_3, RUNE_WISDOM_1, RUNE_WISDOM_2, RUNE_WISDOM_3, SHARD_AGILITY, SHARD_ATTACK, SHARD_BLANK, SHARD_DEFENCE, SHARD_UNITY, SHARD_WISDOM } from "./runes";

export const RECIPE_RUNE_ATTACK_1: ItemRecipeDto = {
    uid: 'recipe-r-1',
    product: RUNE_ATTACK_1,
    ingredients: [
        { ...SHARD_BLANK, quantity: 50 },
        { ...SHARD_ATTACK, quantity: 10 },
        { ...SHARD_UNITY, quantity: 1 },
    ],
};

export const RECIPE_RUNE_ATTACK_2: ItemRecipeDto = {
    uid: 'recipe-r-2',
    product: RUNE_ATTACK_2,
    ingredients: [
        { ...SHARD_BLANK, quantity: 100 },
        { ...SHARD_ATTACK, quantity: 20 },
        { ...SHARD_UNITY, quantity: 2 },
    ],
};

export const RECIPE_RUNE_ATTACK_3: ItemRecipeDto = {
    uid: 'recipe-r-3',
    product: RUNE_ATTACK_3,
    ingredients: [
        { ...SHARD_BLANK, quantity: 500 },
        { ...SHARD_ATTACK, quantity: 50 },
        { ...SHARD_UNITY, quantity: 5 },
    ],
};

export const RECIPE_RUNE_DEFENSE_1: ItemRecipeDto = {
    uid: 'recipe-r-4',
    product: RUNE_DEFENSE_1,
    ingredients: [
        { ...SHARD_BLANK, quantity: 50 },
        { ...SHARD_DEFENCE, quantity: 10 },
        { ...SHARD_UNITY, quantity: 1 },
    ],
};

export const RECIPE_RUNE_DEFENSE_2: ItemRecipeDto = {
    uid: 'recipe-r-5',
    product: RUNE_DEFENSE_2,
    ingredients: [
        { ...SHARD_BLANK, quantity: 100 },
        { ...SHARD_DEFENCE, quantity: 20 },
        { ...SHARD_UNITY, quantity: 2 },
    ],
};

export const RECIPE_RUNE_DEFENSE_3: ItemRecipeDto = {
    uid: 'recipe-r-6',
    product: RUNE_DEFENSE_3,
    ingredients: [
        { ...SHARD_BLANK, quantity: 500 },
        { ...SHARD_DEFENCE, quantity: 50 },
        { ...SHARD_UNITY, quantity: 5 },
    ],
};

export const RECIPE_RUNE_AGILITY_1: ItemRecipeDto = {
    uid: 'recipe-r-7',
    product: RUNE_AGILITY_1,
    ingredients: [
        { ...SHARD_BLANK, quantity: 50 },
        { ...SHARD_AGILITY, quantity: 10 },
        { ...SHARD_UNITY, quantity: 1 },
    ],
};

export const RECIPE_RUNE_AGILITY_2: ItemRecipeDto = {
    uid: 'recipe-r-8',
    product: RUNE_AGILITY_2,
    ingredients: [
        { ...SHARD_BLANK, quantity: 100 },
        { ...SHARD_AGILITY, quantity: 20 },
        { ...SHARD_UNITY, quantity: 2 },
    ],
};

export const RECIPE_RUNE_AGILITY_3: ItemRecipeDto = {
    uid: 'recipe-r-9',
    product: RUNE_AGILITY_3,
    ingredients: [
        { ...SHARD_BLANK, quantity: 500 },
        { ...SHARD_AGILITY, quantity: 50 },
        { ...SHARD_UNITY, quantity: 5 },
    ],
};

export const RECIPE_RUNE_WISDOM_1: ItemRecipeDto = {
    uid: 'recipe-r-10',
    product: RUNE_WISDOM_1,
    ingredients: [
        { ...SHARD_BLANK, quantity: 50 },
        { ...SHARD_WISDOM, quantity: 10 },
        { ...SHARD_UNITY, quantity: 1 },
    ],
};

export const RECIPE_RUNE_WISDOM_2: ItemRecipeDto = {
    uid: 'recipe-r-11',
    product: RUNE_WISDOM_2,
    ingredients: [
        { ...SHARD_BLANK, quantity: 100 },
        { ...SHARD_WISDOM, quantity: 20 },
        { ...SHARD_UNITY, quantity: 2 },
    ],
};

export const RECIPE_RUNE_WISDOM_3: ItemRecipeDto = {
    uid: 'recipe-r-12',
    product: RUNE_WISDOM_3,
    ingredients: [
        { ...SHARD_BLANK, quantity: 500 },
        { ...SHARD_WISDOM, quantity: 50 },
        { ...SHARD_UNITY, quantity: 5 },
    ],
};
