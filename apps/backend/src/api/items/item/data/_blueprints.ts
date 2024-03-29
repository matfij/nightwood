import { BUBULAE_STEAK, FOODS, IHON_BERRY, RELIQUM_EGG, RORIS_LEAVES, SPIRAL_NUT,  } from "./food";
import { ItemDto } from "../model/dto/item.dto";
import { FEEBLE_MUSHROOMS, INGREDIENTS, SHARD_BLANK } from "./ingredients";
import { BOOSTERS } from "../../alchemy/data/boosters";
import { RUNES } from "./runes";


export const ALL_ITEMS = [
    ...FOODS,
    ...INGREDIENTS,
    ...RUNES,
    ...BOOSTERS,
];

export const STARTING_ITEMS: ItemDto[] = [
    { ...BUBULAE_STEAK, quantity: 10 },
    { ...IHON_BERRY, quantity: 10 },
    { ...RELIQUM_EGG, quantity: 10 },
    { ...SPIRAL_NUT, quantity: 10 },
    { ...RORIS_LEAVES, quantity: 10 },
    { ...SHARD_BLANK, quantity: 10 },
    { ...FEEBLE_MUSHROOMS, quantity: 3 },
];
