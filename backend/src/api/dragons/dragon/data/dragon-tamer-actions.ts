import { TRANSMUTATION_STONE } from "src/api/items/item/model/data/ingredients";
import { DragonTamerActionDto } from "../model/dto/dragon-tamer-actions.dto";

export const DRAGON_TAMER_ACTIONS: DragonTamerActionDto[] = [
    {
        uid: 'tamer-action-1',
        hint: 'dragonTamer.renameHint',
        costFactor: 25,
        maxCost: 10000,
        requiredLevel: 1,
        requiredItems: [],
    },
    {
        uid: 'tamer-action-2',
        hint: 'dragonTamer.resetSkillsHint',
        costFactor: 50,
        maxCost: 10000,
        requiredLevel: 1,
        requiredItems: [],
    },
    {
        uid: 'tamer-action-3',
        hint: 'dragonTamer.refreshHint',
        costFactor: 15,
        maxCost: 10000,
        requiredLevel: 1,
        requiredItems: [],
    },
    {
        uid: 'tamer-action-4',
        hint: 'dragonTamer.changeNatureHint',
        costFactor: 225,
        maxCost: 10000,
        requiredLevel: 1,
        requiredItems: [
            TRANSMUTATION_STONE,
        ],
    },
];
