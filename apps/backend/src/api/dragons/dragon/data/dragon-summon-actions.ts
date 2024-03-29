import {
    DRAEDON_PLANS,
    EON_CHANT,
    ETERNAL_FLOWER,
    GATE_KEY,
    GATE_PARTICLE,
    MIDNIGHT_ESSENCE,
    SUPERCHARGED_CRYSTAL,
} from 'src/api/items/item/data/ingredients';
import { DragonNature } from '../model/definitions/dragons';
import { DragonSummonActionDto } from '../model/dto/dragon-summon.dto';

export const SUMMON_THUNDER: DragonSummonActionDto = {
    uid: 'summon-action-1',
    hint: 'dragonSummon.thunderHint',
    nature: DragonNature.Electric,
    cost: 3000,
    requiredItems: [
        { ...SUPERCHARGED_CRYSTAL, quantity: 3 },
        { ...GATE_KEY, quantity: 3 },
        { ...GATE_PARTICLE, quantity: 60 },
    ],
};

export const SUMMON_NATURE: DragonSummonActionDto = {
    uid: 'summon-action-2',
    hint: 'dragonSummon.natureHint',
    nature: DragonNature.Nature,
    cost: 3000,
    requiredItems: [
        { ...ETERNAL_FLOWER, quantity: 3 },
        { ...GATE_KEY, quantity: 3 },
        { ...GATE_PARTICLE, quantity: 60 },
    ],
};

export const SUMMON_DARK: DragonSummonActionDto = {
    uid: 'summon-action-3',
    hint: 'dragonSummon.darkHint',
    nature: DragonNature.Dark,
    cost: 3000,
    requiredItems: [
        { ...MIDNIGHT_ESSENCE, quantity: 3 },
        { ...GATE_KEY, quantity: 3 },
        { ...GATE_PARTICLE, quantity: 60 },
    ],
};

export const SUMMON_MECHANICAL: DragonSummonActionDto = {
    uid: 'summon-action-4',
    hint: 'dragonSummon.mechanicalHint',
    nature: DragonNature.Mechanical,
    cost: 9000,
    requiredItems: [
        { ...DRAEDON_PLANS, quantity: 3 },
        { ...GATE_KEY, quantity: 10 },
        { ...GATE_PARTICLE, quantity: 200 },
    ],
};

export const SUMMON_TIME: DragonSummonActionDto = {
    uid: 'summon-action-4',
    hint: 'dragonSummon.timeHint',
    nature: DragonNature.Time,
    cost: 9000,
    requiredItems: [
        { ...EON_CHANT, quantity: 3 },
        { ...GATE_KEY, quantity: 10 },
        { ...GATE_PARTICLE, quantity: 200 },
    ],
};

export const DRAGON_SUMMON_ACTIONS: DragonSummonActionDto[] = [
    SUMMON_THUNDER,
    SUMMON_NATURE,
    SUMMON_DARK,
    SUMMON_MECHANICAL,
    SUMMON_TIME,
];
