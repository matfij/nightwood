import { ETERNAL_FLOWER, GATE_KEY, GATE_PARTICLE, MIDNIGHT_ESSENCE, SUPERCHARGED_CRYSTAL } from "src/api/items/item/model/data/ingredients";
import { DragonNature } from "../model/definitions/dragon-nature";
import { DragonSummonActionDto } from "../model/dto/dragon-summon.dto";

export const SUMMON_THUNDER: DragonSummonActionDto = {
    uid: 'summon-action-1',
    hint: 'dragonSummon.thunderHint',
    nature: DragonNature.Electric,
    cost: 3000,
    requiredItems: [
        { ...SUPERCHARGED_CRYSTAL, quantity: 1 },
        { ...GATE_KEY, quantity: 1 },
        { ...GATE_PARTICLE, quantity: 50 },
    ],
}

export const SUMMON_NATURE: DragonSummonActionDto = {
    uid: 'summon-action-2',
    hint: 'dragonSummon.natureHint',
    nature: DragonNature.Nature,
    cost: 3000,
    requiredItems: [
        { ...ETERNAL_FLOWER, quantity: 1 },
        { ...GATE_KEY, quantity: 1 },
        { ...GATE_PARTICLE, quantity: 50 },
    ],
}

export const SUMMON_DARK: DragonSummonActionDto = {
    uid: 'summon-action-3',
    hint: 'dragonSummon.darkHint',
    nature: DragonNature.Dark,
    cost: 3000,
    requiredItems: [
        { ...MIDNIGHT_ESSENCE, quantity: 1 },
        { ...GATE_KEY, quantity: 1 },
        { ...GATE_PARTICLE, quantity: 50 },
    ],
}

export const DRAGON_SUMMON_ACTIONS: DragonSummonActionDto[] = [
    SUMMON_THUNDER,
    SUMMON_NATURE,
    SUMMON_DARK,
];
