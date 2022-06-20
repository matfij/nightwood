import { BOOSTERS } from "src/api/items/alchemy/model/data/boosters";
import { FOODS } from "./food";
import { INGREDIENTS } from "./ingredients";
import { RUNES_BASE, RUNES_SPECIAL } from "./runes";

export const ALL_ITEMS = [
    ...FOODS,

    ...INGREDIENTS,

    ...RUNES_BASE,
    ...RUNES_SPECIAL,

    ...BOOSTERS,
];
