import { ItemRecipeDto } from '../model/dto/item-recipe.dto';
import { BUBULAE_STEAK, IHON_BERRY, RELIQUM_EGG } from './food';
import {
    SHARD_BLANK,
    SHARD_ATTACK,
    SHARD_UNITY,
    SHARD_DEFENCE,
    SHARD_AGILITY,
    SHARD_WISDOM,
    GATE_PARTICLE,
    SCORIA_ORE,
    AZURE_PEBBLE,
    RUNE_BASE,
} from './ingredients';
import {
    RUNE_SPECIAL_AGILITY_1,
    RUNE_AGILITY_1,
    RUNE_AGILITY_2,
    RUNE_AGILITY_3,
    RUNE_AGILITY_4,
    RUNE_SPECIAL_ATTACK_1,
    RUNE_ATTACK_1,
    RUNE_ATTACK_2,
    RUNE_ATTACK_3,
    RUNE_ATTACK_4,
    RUNE_SPECIAL_DEFENSE_1,
    RUNE_DEFENSE_1,
    RUNE_DEFENSE_2,
    RUNE_DEFENSE_3,
    RUNE_DEFENSE_4,
    RUNE_SPECIAL_WISDOM_1,
    RUNE_WISDOM_1,
    RUNE_WISDOM_2,
    RUNE_WISDOM_3,
    RUNE_WISDOM_4,
    RUNE_SPECIAL_ATTACK_2,
    RUNE_SPECIAL_AGILITY_2,
    RUNE_SPECIAL_DEFENSE_2,
    RUNE_SPECIAL_WISDOM_2,
    RUNE_SPECIAL_ATTACK_3,
    RUNE_SPECIAL_DEFENSE_3,
    RUNE_SPECIAL_AGILITY_3,
    RUNE_SPECIAL_WISDOM_3,
    RUNE_ETER_OFFENSE_1,
    RUNE_ETER_OFFENSE_2,
    RUNE_ETER_OFFENSE_3,
    RUNE_ETER_DEFENSE_1,
    RUNE_ETER_DEFENSE_2,
    RUNE_ETER_DEFENSE_3,
    RUNE_ETER_SPECIAL_1,
    RUNE_ETER_SPECIAL_2,
} from './runes';

/**
 * Regular
 */

export const RECIPE_RUNE_ATTACK_1: ItemRecipeDto = {
    uid: 'recipe-r-1',
    product: RUNE_ATTACK_1,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 40 },
        { ...SHARD_ATTACK, quantity: 10 },
        { ...SHARD_UNITY, quantity: 1 },
    ],
};

export const RECIPE_RUNE_ATTACK_2: ItemRecipeDto = {
    uid: 'recipe-r-2',
    product: RUNE_ATTACK_2,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 80 },
        { ...SHARD_ATTACK, quantity: 20 },
        { ...SHARD_UNITY, quantity: 2 },
    ],
};

export const RECIPE_RUNE_ATTACK_3: ItemRecipeDto = {
    uid: 'recipe-r-3',
    product: RUNE_ATTACK_3,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 120 },
        { ...SHARD_ATTACK, quantity: 40 },
        { ...SHARD_UNITY, quantity: 2 },
    ],
};

export const RECIPE_RUNE_ATTACK_4: ItemRecipeDto = {
    uid: 'recipe-r-13',
    product: RUNE_ATTACK_4,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 160 },
        { ...SHARD_ATTACK, quantity: 60 },
        { ...SHARD_UNITY, quantity: 3 },
    ],
};

export const RECIPE_RUNE_DEFENSE_1: ItemRecipeDto = {
    uid: 'recipe-r-4',
    product: RUNE_DEFENSE_1,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 40 },
        { ...SHARD_DEFENCE, quantity: 10 },
        { ...SHARD_UNITY, quantity: 1 },
    ],
};

export const RECIPE_RUNE_DEFENSE_2: ItemRecipeDto = {
    uid: 'recipe-r-5',
    product: RUNE_DEFENSE_2,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 80 },
        { ...SHARD_DEFENCE, quantity: 20 },
        { ...SHARD_UNITY, quantity: 2 },
    ],
};

export const RECIPE_RUNE_DEFENSE_3: ItemRecipeDto = {
    uid: 'recipe-r-6',
    product: RUNE_DEFENSE_3,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 120 },
        { ...SHARD_DEFENCE, quantity: 40 },
        { ...SHARD_UNITY, quantity: 2 },
    ],
};

export const RECIPE_RUNE_DEFENSE_4: ItemRecipeDto = {
    uid: 'recipe-r-14',
    product: RUNE_DEFENSE_4,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 160 },
        { ...SHARD_DEFENCE, quantity: 60 },
        { ...SHARD_UNITY, quantity: 3 },
    ],
};

export const RECIPE_RUNE_AGILITY_1: ItemRecipeDto = {
    uid: 'recipe-r-7',
    product: RUNE_AGILITY_1,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 40 },
        { ...SHARD_AGILITY, quantity: 10 },
        { ...SHARD_UNITY, quantity: 1 },
    ],
};

export const RECIPE_RUNE_AGILITY_2: ItemRecipeDto = {
    uid: 'recipe-r-8',
    product: RUNE_AGILITY_2,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 80 },
        { ...SHARD_AGILITY, quantity: 20 },
        { ...SHARD_UNITY, quantity: 2 },
    ],
};

export const RECIPE_RUNE_AGILITY_3: ItemRecipeDto = {
    uid: 'recipe-r-9',
    product: RUNE_AGILITY_3,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 120 },
        { ...SHARD_AGILITY, quantity: 40 },
        { ...SHARD_UNITY, quantity: 2 },
    ],
};

export const RECIPE_RUNE_AGILITY_4: ItemRecipeDto = {
    uid: 'recipe-r-15',
    product: RUNE_AGILITY_4,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 160 },
        { ...SHARD_AGILITY, quantity: 60 },
        { ...SHARD_UNITY, quantity: 3 },
    ],
};

export const RECIPE_RUNE_WISDOM_1: ItemRecipeDto = {
    uid: 'recipe-r-10',
    product: RUNE_WISDOM_1,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 40 },
        { ...SHARD_WISDOM, quantity: 10 },
        { ...SHARD_UNITY, quantity: 1 },
    ],
};

export const RECIPE_RUNE_WISDOM_2: ItemRecipeDto = {
    uid: 'recipe-r-11',
    product: RUNE_WISDOM_2,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 80 },
        { ...SHARD_WISDOM, quantity: 20 },
        { ...SHARD_UNITY, quantity: 2 },
    ],
};

export const RECIPE_RUNE_WISDOM_3: ItemRecipeDto = {
    uid: 'recipe-r-12',
    product: RUNE_WISDOM_3,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 120 },
        { ...SHARD_WISDOM, quantity: 40 },
        { ...SHARD_UNITY, quantity: 2 },
    ],
};

export const RECIPE_RUNE_WISDOM_4: ItemRecipeDto = {
    uid: 'recipe-r-16',
    product: RUNE_WISDOM_4,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 160 },
        { ...SHARD_WISDOM, quantity: 60 },
        { ...SHARD_UNITY, quantity: 3 },
    ],
};

/**
 * Special
 */

export const RECIPE_RUNE_SPECIAL_ATTACK_1: ItemRecipeDto = {
    uid: 'recipe-r-17',
    product: RUNE_SPECIAL_ATTACK_1,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 10 },
        { ...BUBULAE_STEAK, quantity: 10 },
        { ...SHARD_ATTACK, quantity: 1 },
    ],
};

export const RECIPE_RUNE_SPECIAL_DEFENSE_1: ItemRecipeDto = {
    uid: 'recipe-r-18',
    product: RUNE_SPECIAL_DEFENSE_1,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 10 },
        { ...RELIQUM_EGG, quantity: 10 },
        { ...SHARD_DEFENCE, quantity: 1 },
    ],
};

export const RECIPE_RUNE_SPECIAL_AGILITY_1: ItemRecipeDto = {
    uid: 'recipe-r-19',
    product: RUNE_SPECIAL_AGILITY_1,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 10 },
        { ...IHON_BERRY, quantity: 10 },
        { ...SHARD_AGILITY, quantity: 1 },
    ],
};

export const RECIPE_RUNE_SPECIAL_WISDOM_1: ItemRecipeDto = {
    uid: 'recipe-r-20',
    product: RUNE_SPECIAL_WISDOM_1,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...SHARD_BLANK, quantity: 10 },
        { ...RELIQUM_EGG, quantity: 10 },
        { ...SHARD_WISDOM, quantity: 1 },
    ],
};

export const RECIPE_RUNE_SPECIAL_ATTACK_2: ItemRecipeDto = {
    uid: 'recipe-r-21',
    product: RUNE_SPECIAL_ATTACK_2,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...GATE_PARTICLE, quantity: 50 },
        { ...BUBULAE_STEAK, quantity: 50 },
        { ...SCORIA_ORE, quantity: 20 },
        { ...AZURE_PEBBLE, quantity: 2 },
    ],
};

export const RECIPE_RUNE_SPECIAL_DEFENSE_2: ItemRecipeDto = {
    uid: 'recipe-r-22',
    product: RUNE_SPECIAL_DEFENSE_2,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...GATE_PARTICLE, quantity: 50 },
        { ...RELIQUM_EGG, quantity: 50 },
        { ...SCORIA_ORE, quantity: 20 },
        { ...AZURE_PEBBLE, quantity: 2 },
    ],
};

export const RECIPE_RUNE_SPECIAL_AGILITY_2: ItemRecipeDto = {
    uid: 'recipe-r-23',
    product: RUNE_SPECIAL_AGILITY_2,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...GATE_PARTICLE, quantity: 50 },
        { ...IHON_BERRY, quantity: 50 },
        { ...SCORIA_ORE, quantity: 20 },
        { ...AZURE_PEBBLE, quantity: 2 },
    ],
};

export const RECIPE_RUNE_SPECIAL_WISDOM_2: ItemRecipeDto = {
    uid: 'recipe-r-24',
    product: RUNE_SPECIAL_WISDOM_2,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...GATE_PARTICLE, quantity: 50 },
        { ...RELIQUM_EGG, quantity: 50 },
        { ...SCORIA_ORE, quantity: 20 },
        { ...AZURE_PEBBLE, quantity: 2 },
    ],
};

export const RECIPE_RUNE_SPECIAL_ATTACK_3: ItemRecipeDto = {
    uid: 'recipe-r-25',
    product: RUNE_SPECIAL_ATTACK_3,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...GATE_PARTICLE, quantity: 80 },
        { ...SHARD_ATTACK, quantity: 60 },
        { ...SCORIA_ORE, quantity: 40 },
        { ...AZURE_PEBBLE, quantity: 4 },
    ],
};

export const RECIPE_RUNE_SPECIAL_DEFENSE_3: ItemRecipeDto = {
    uid: 'recipe-r-26',
    product: RUNE_SPECIAL_DEFENSE_3,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...GATE_PARTICLE, quantity: 80 },
        { ...SHARD_DEFENCE, quantity: 60 },
        { ...SCORIA_ORE, quantity: 40 },
        { ...AZURE_PEBBLE, quantity: 4 },
    ],
};

export const RECIPE_RUNE_SPECIAL_AGILITY_3: ItemRecipeDto = {
    uid: 'recipe-r-27',
    product: RUNE_SPECIAL_AGILITY_3,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...GATE_PARTICLE, quantity: 80 },
        { ...SHARD_AGILITY, quantity: 60 },
        { ...SCORIA_ORE, quantity: 40 },
        { ...AZURE_PEBBLE, quantity: 4 },
    ],
};

export const RECIPE_RUNE_SPECIAL_WISDOM_3: ItemRecipeDto = {
    uid: 'recipe-r-28',
    product: RUNE_SPECIAL_WISDOM_3,
    gold: 0,
    eter: 0,
    ingredients: [
        { ...GATE_PARTICLE, quantity: 80 },
        { ...SHARD_WISDOM, quantity: 60 },
        { ...SCORIA_ORE, quantity: 40 },
        { ...AZURE_PEBBLE, quantity: 4 },
    ],
};

/**
 * Eter
 */

export const RECIPE_RUNE_ETER_OFFENSE_1: ItemRecipeDto = {
    uid: 'recipe-r-29',
    product: RUNE_ETER_OFFENSE_1,
    gold: 1500,
    eter: 150,
    ingredients: [{ ...RUNE_BASE, quantity: 5 }],
};

export const RECIPE_RUNE_ETER_OFFENSE_2: ItemRecipeDto = {
    uid: 'recipe-r-30',
    product: RUNE_ETER_OFFENSE_2,
    gold: 3000,
    eter: 300,
    ingredients: [{ ...RUNE_BASE, quantity: 6 }],
};

export const RECIPE_RUNE_ETER_OFFENSE_3: ItemRecipeDto = {
    uid: 'recipe-r-31',
    product: RUNE_ETER_OFFENSE_3,
    gold: 4500,
    eter: 450,
    ingredients: [{ ...RUNE_BASE, quantity: 7 }],
};

export const RECIPE_RUNE_ETER_DEFENSE_1: ItemRecipeDto = {
    uid: 'recipe-r-32',
    product: RUNE_ETER_DEFENSE_1,
    gold: 1500,
    eter: 150,
    ingredients: [{ ...RUNE_BASE, quantity: 5 }],
};

export const RECIPE_RUNE_ETER_DEFENSE_2: ItemRecipeDto = {
    uid: 'recipe-r-33',
    product: RUNE_ETER_DEFENSE_2,
    gold: 3000,
    eter: 300,
    ingredients: [{ ...RUNE_BASE, quantity: 6 }],
};

export const RECIPE_RUNE_ETER_DEFENSE_3: ItemRecipeDto = {
    uid: 'recipe-r-34',
    product: RUNE_ETER_DEFENSE_3,
    gold: 4500,
    eter: 450,
    ingredients: [{ ...RUNE_BASE, quantity: 7 }],
};

export const RECIPE_RUNE_ETER_SPECIAL_1: ItemRecipeDto = {
    uid: 'recipe-r-35',
    product: RUNE_ETER_SPECIAL_1,
    gold: 4000,
    eter: 1000,
    ingredients: [{ ...RUNE_BASE, quantity: 12 }],
};

export const RECIPE_RUNE_ETER_SPECIAL_2: ItemRecipeDto = {
    uid: 'recipe-r-36',
    product: RUNE_ETER_SPECIAL_2,
    gold: 8000,
    eter: 2000,
    ingredients: [{ ...RUNE_BASE, quantity: 16 }],
};

export const RUNE_BASE_RECIPES: ItemRecipeDto[] = [
    RECIPE_RUNE_ATTACK_1,
    RECIPE_RUNE_ATTACK_2,
    RECIPE_RUNE_ATTACK_3,
    RECIPE_RUNE_ATTACK_4,
    RECIPE_RUNE_DEFENSE_1,
    RECIPE_RUNE_DEFENSE_2,
    RECIPE_RUNE_DEFENSE_3,
    RECIPE_RUNE_DEFENSE_4,
    RECIPE_RUNE_AGILITY_1,
    RECIPE_RUNE_AGILITY_2,
    RECIPE_RUNE_AGILITY_3,
    RECIPE_RUNE_AGILITY_4,
    RECIPE_RUNE_WISDOM_1,
    RECIPE_RUNE_WISDOM_2,
    RECIPE_RUNE_WISDOM_3,
    RECIPE_RUNE_WISDOM_4,
];

export const RUNE_SPECIAL_RECIPES: ItemRecipeDto[] = [
    RECIPE_RUNE_SPECIAL_ATTACK_1,
    RECIPE_RUNE_SPECIAL_DEFENSE_1,
    RECIPE_RUNE_SPECIAL_AGILITY_1,
    RECIPE_RUNE_SPECIAL_WISDOM_1,
    RECIPE_RUNE_SPECIAL_ATTACK_2,
    RECIPE_RUNE_SPECIAL_DEFENSE_2,
    RECIPE_RUNE_SPECIAL_AGILITY_2,
    RECIPE_RUNE_SPECIAL_WISDOM_2,
    RECIPE_RUNE_SPECIAL_ATTACK_3,
    RECIPE_RUNE_SPECIAL_DEFENSE_3,
    RECIPE_RUNE_SPECIAL_AGILITY_3,
    RECIPE_RUNE_SPECIAL_WISDOM_3,
];

export const RUNE_ETER_RECIPES: ItemRecipeDto[] = [
    RECIPE_RUNE_ETER_OFFENSE_1,
    RECIPE_RUNE_ETER_DEFENSE_1,
    RECIPE_RUNE_ETER_OFFENSE_2,
    RECIPE_RUNE_ETER_DEFENSE_2,
    RECIPE_RUNE_ETER_OFFENSE_3,
    RECIPE_RUNE_ETER_DEFENSE_3,
    RECIPE_RUNE_ETER_SPECIAL_1,
    RECIPE_RUNE_ETER_SPECIAL_2,
];
