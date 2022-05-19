import { BUBULAE_STEAK, ENCHANTER_POTION, IHON_BERRY, MIGHTY_EXTRACT, NIMBUS_NECTAR, RAINBOW_MIXTURE, RELIQUM_EGG, RORIS_LEEFS, SPARKING_AMBROSIA, SPIRAL_NUT, TITAN_BREW } from "src/api/items/item/model/data/food";
import { ARTICHOKE, CRIMSON_SEED, PALE_GRAINS } from "src/api/items/item/model/data/ingredients";
import { MixtureRecipeDto } from "../definitions/mixture-recipe.dto";

export const RECIPE_MIXTURE_STRENGTH: MixtureRecipeDto = {
    uid: 'recipe-m-1',
    product: MIGHTY_EXTRACT,
    ingredients: [
        { ...PALE_GRAINS, quantity: 6 },
        { ...BUBULAE_STEAK, quantity: 12 },
        { ...IHON_BERRY, quantity: 6 },
        { ...ARTICHOKE, quantity: 1 },
    ],
    prepareTime: 8 * 60 * 60 * 1000,
};

export const RECIPE_MIXTURE_DEXTERITY: MixtureRecipeDto = {
    uid: 'recipe-m-2',
    product: NIMBUS_NECTAR,
    ingredients: [
        { ...PALE_GRAINS, quantity: 6 },
        { ...IHON_BERRY, quantity: 12 },
        { ...RELIQUM_EGG, quantity: 6 },
        { ...ARTICHOKE, quantity: 1 },
    ],
    prepareTime: 8 * 60 * 60 * 1000,
};

export const RECIPE_MIXTURE_ENDURANCE: MixtureRecipeDto = {
    uid: 'recipe-m-3',
    product: TITAN_BREW,
    ingredients: [
        { ...PALE_GRAINS, quantity: 6 },
        { ...RELIQUM_EGG, quantity: 12 },
        { ...SPIRAL_NUT, quantity: 6 },
        { ...ARTICHOKE, quantity: 1 },
    ],
    prepareTime: 8 * 60 * 60 * 1000,
};

export const RECIPE_MIXTURE_WILL: MixtureRecipeDto = {
    uid: 'recipe-m-4',
    product: ENCHANTER_POTION,
    ingredients: [
        { ...PALE_GRAINS, quantity: 6 },
        { ...SPIRAL_NUT, quantity: 12 },
        { ...RORIS_LEEFS, quantity: 6 },
        { ...ARTICHOKE, quantity: 1 },
    ],
    prepareTime: 8 * 60 * 60 * 1000,
};

export const RECIPE_MIXTURE_LUCK: MixtureRecipeDto = {
    uid: 'recipe-m-5',
    product: RAINBOW_MIXTURE,
    ingredients: [
        { ...PALE_GRAINS, quantity: 6 },
        { ...RORIS_LEEFS, quantity: 12 },
        { ...BUBULAE_STEAK, quantity: 6 },
        { ...ARTICHOKE, quantity: 1 },
    ],
    prepareTime: 8 * 60 * 60 * 1000,
};

export const RECIPE_MIXTURE_COMPLETE: MixtureRecipeDto = {
    uid: 'recipe-m-6',
    product: SPARKING_AMBROSIA,
    ingredients: [
        { ...PALE_GRAINS, quantity: 24 },
        { ...BUBULAE_STEAK, quantity: 12 },
        { ...IHON_BERRY, quantity: 12 },
        { ...RELIQUM_EGG, quantity: 12 },
        { ...BUBULAE_STEAK, quantity: 12 },
        { ...RORIS_LEEFS, quantity: 12 },
        { ...ARTICHOKE, quantity: 6 },
        { ...CRIMSON_SEED, quantity: 2 },
    ],
    prepareTime: 24 * 60 * 60 * 1000,
};
