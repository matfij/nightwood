import { TRANSMUTATION_STONE } from "src/api/items/item/model/data/ingredients";
import { DragonTamerActionDto } from "../model/dto/dragon-tamer-actions.dto";

export const ACTION_RENAME: DragonTamerActionDto = {
    uid: 'tamer-action-1',
    hint: 'dragonTamer.renameHint',
    costFactor: 75,
    maxCost: 1000000,
    requiredLevel: 1,
    requiredItems: [],
};

export const ACTION_RESET_SKILLS: DragonTamerActionDto = {
    uid: 'tamer-action-2',
    hint: 'dragonTamer.resetSkillsHint',
    costFactor: 5, // base 50
    maxCost: 1000000,
    requiredLevel: 1,
    requiredItems: [],
};

export const ACTION_RESTORE_STAMINA: DragonTamerActionDto = {
    uid: 'tamer-action-3',
    hint: 'dragonTamer.refreshHint',
    costFactor: 15,
    maxCost: 1000000,
    requiredLevel: 1,
    requiredItems: [],
};

export const ACTION_CHANGE_NATURE: DragonTamerActionDto = {
    uid: 'tamer-action-4',
    hint: 'dragonTamer.changeNatureHint',
    costFactor: 25, // base 225
    maxCost: 1000000,
    requiredLevel: 1,
    requiredItems: [
        { ...TRANSMUTATION_STONE, quantity: 1 },
    ],
};

export const DRAGON_TAMER_ACTIONS: DragonTamerActionDto[] = [
    ACTION_RESTORE_STAMINA,
    ACTION_RESET_SKILLS,
    ACTION_RENAME,
    ACTION_CHANGE_NATURE,
];
