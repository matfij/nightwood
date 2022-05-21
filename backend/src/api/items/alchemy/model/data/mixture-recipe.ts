import { BUBULAE_STEAK, ENCHANTER_POTION, IHON_BERRY, MIGHTY_EXTRACT, NIMBUS_NECTAR, RAINBOW_MIXTURE, RELIQUM_EGG, RORIS_LEAVES, SPARKING_AMBROSIA, SPIRAL_NUT, TITAN_BREW } from "src/api/items/item/model/data/food";
import { ARTICHOKE, CRIMSON_SEED, PALE_GRAINS } from "src/api/items/item/model/data/ingredients";
import { ALCHEMY_TIME_SCALE } from "src/configuration/backend.config";
import { MixtureRecipeDto } from "../definitions/mixture-recipe.dto";

export const RECIPE_MIXTURE_STRENGTH: MixtureRecipeDto = {
    uid: 'recipe-m-1',
    product: { ...MIGHTY_EXTRACT, quantity: 1 },
    ingredients: [
        { ...PALE_GRAINS, quantity: 6 },
        { ...BUBULAE_STEAK, quantity: 12 },
        { ...IHON_BERRY, quantity: 6 },
        { ...ARTICHOKE, quantity: 1 },
    ],
    prepareTime: ALCHEMY_TIME_SCALE * 8 * 60 * 60 * 1000,
};

export const RECIPE_MIXTURE_DEXTERITY: MixtureRecipeDto = {
    uid: 'recipe-m-2',
    product: { ...NIMBUS_NECTAR, quantity: 1 },
    ingredients: [
        { ...PALE_GRAINS, quantity: 6 },
        { ...IHON_BERRY, quantity: 12 },
        { ...RELIQUM_EGG, quantity: 6 },
        { ...ARTICHOKE, quantity: 1 },
    ],
    prepareTime: ALCHEMY_TIME_SCALE * 8 * 60 * 60 * 1000,
};

export const RECIPE_MIXTURE_ENDURANCE: MixtureRecipeDto = {
    uid: 'recipe-m-3',
    product: { ...TITAN_BREW, quantity: 1 },
    ingredients: [
        { ...PALE_GRAINS, quantity: 6 },
        { ...RELIQUM_EGG, quantity: 12 },
        { ...SPIRAL_NUT, quantity: 6 },
        { ...ARTICHOKE, quantity: 1 },
    ],
    prepareTime: ALCHEMY_TIME_SCALE * 8 * 60 * 60 * 1000,
};

export const RECIPE_MIXTURE_WILL: MixtureRecipeDto = {
    uid: 'recipe-m-4',
    product: { ...ENCHANTER_POTION, quantity: 1 },
    ingredients: [
        { ...PALE_GRAINS, quantity: 6 },
        { ...SPIRAL_NUT, quantity: 12 },
        { ...RORIS_LEAVES, quantity: 6 },
        { ...ARTICHOKE, quantity: 1 },
    ],
    prepareTime: ALCHEMY_TIME_SCALE * 8 * 60 * 60 * 1000,
};

export const RECIPE_MIXTURE_LUCK: MixtureRecipeDto = {
    uid: 'recipe-m-5',
    product: { ...RAINBOW_MIXTURE, quantity: 1 },
    ingredients: [
        { ...PALE_GRAINS, quantity: 6 },
        { ...RORIS_LEAVES, quantity: 12 },
        { ...BUBULAE_STEAK, quantity: 6 },
        { ...ARTICHOKE, quantity: 1 },
    ],
    prepareTime: ALCHEMY_TIME_SCALE * 8 * 60 * 60 * 1000,
};

export const RECIPE_MIXTURE_COMPLETE: MixtureRecipeDto = {
    uid: 'recipe-m-6',
    product: { ...SPARKING_AMBROSIA, quantity: 1 },
    ingredients: [
        { ...PALE_GRAINS, quantity: 24 },
        { ...BUBULAE_STEAK, quantity: 12 },
        { ...IHON_BERRY, quantity: 12 },
        { ...RELIQUM_EGG, quantity: 12 },
        { ...BUBULAE_STEAK, quantity: 12 },
        { ...RORIS_LEAVES, quantity: 12 },
        { ...ARTICHOKE, quantity: 6 },
        { ...CRIMSON_SEED, quantity: 2 },
    ],
    prepareTime: ALCHEMY_TIME_SCALE * 24 * 60 * 60 * 1000,
};

export const MIXTURE_RECIPES = [
    RECIPE_MIXTURE_STRENGTH,
    RECIPE_MIXTURE_DEXTERITY,
    RECIPE_MIXTURE_ENDURANCE,
    RECIPE_MIXTURE_WILL,
    RECIPE_MIXTURE_LUCK,
    RECIPE_MIXTURE_COMPLETE,
];
