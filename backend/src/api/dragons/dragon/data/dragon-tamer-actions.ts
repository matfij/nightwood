import { FEEBLE_MUSHROOMS, TRANSMUTATION_STONE } from "src/api/items/item/data/ingredients";
import { DragonTamerActionDto } from "../model/dto/dragon-tamer-actions.dto";

export const ACTION_RENAME: DragonTamerActionDto = {
    uid: 'tamer-action-1',
    hint: 'dragonTamer.renameHint',
    costFactor: 5,
    baseCost: 1000,
    requiredLevel: 1,
    requiredItems: [],
};

export const ACTION_RESET_SKILLS: DragonTamerActionDto = {
    uid: 'tamer-action-2',
    hint: 'dragonTamer.resetSkillsHint',
    costFactor: 5,
    baseCost: 500,
    requiredLevel: 1,
    requiredItems: [
        { ...FEEBLE_MUSHROOMS, quantity: 5 }
    ],
};

export const ACTION_RESTORE_STAMINA: DragonTamerActionDto = {
    uid: 'tamer-action-3',
    hint: 'dragonTamer.refreshHint',
    costFactor: 1,
    baseCost: 100,
    requiredLevel: 1,
    requiredItems: [
        { ...FEEBLE_MUSHROOMS, quantity: 1 }
    ],
};

export const ACTION_CHANGE_NATURE: DragonTamerActionDto = {
    uid: 'tamer-action-4',
    hint: 'dragonTamer.changeNatureHint',
    costFactor: 10,
    baseCost: 2000,
    requiredLevel: 1,
    requiredItems: [
        { ...TRANSMUTATION_STONE, quantity: 1 },
    ],
};

export const ACTION_INCREASE_DRAGON_LIMIT: DragonTamerActionDto = {
    uid: 'tamer-action-5',
    hint: 'dragonTamer.increaseDragonLimitHint',
    withoutDragon: true,
    costFactor: 3000,
    baseCost: 3000,
    requiredLevel: 1,
    requiredItems: [],
};

export const DRAGON_TAMER_ACTIONS: DragonTamerActionDto[] = [
    ACTION_INCREASE_DRAGON_LIMIT,
    ACTION_RESTORE_STAMINA,
    ACTION_RESET_SKILLS,
    ACTION_RENAME,
    ACTION_CHANGE_NATURE,
];
