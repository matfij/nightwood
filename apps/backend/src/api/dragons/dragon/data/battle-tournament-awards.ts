import {
    CRIMSON_TEAR,
    SHARD_AGILITY,
    SHARD_ATTACK,
    SHARD_BLANK,
    SHARD_DEFENCE,
    SHARD_WISDOM,
} from '../../../items/item/data/ingredients';
import { BattleTournamentAward } from '../model/definitions/battle-tournament-award';

export const battleTournamentAwards: BattleTournamentAward[] = [
    {
        gold: 10_000,
        eter: 1000,
        items: [
            { ...SHARD_BLANK, quantity: 1000 },
            { ...SHARD_ATTACK, quantity: 100 },
            { ...SHARD_DEFENCE, quantity: 100 },
            { ...SHARD_AGILITY, quantity: 100 },
            { ...SHARD_WISDOM, quantity: 100 },
            { ...CRIMSON_TEAR, quantity: 1 },
        ],
    },
    {
        gold: 6000,
        eter: 600,
        items: [
            { ...SHARD_BLANK, quantity: 600 },
            { ...SHARD_ATTACK, quantity: 60 },
            { ...SHARD_DEFENCE, quantity: 60 },
            { ...SHARD_AGILITY, quantity: 60 },
            { ...SHARD_WISDOM, quantity: 60 },
        ],
    },
    {
        gold: 4000,
        eter: 400,
        items: [
            { ...SHARD_BLANK, quantity: 400 },
            { ...SHARD_ATTACK, quantity: 40 },
            { ...SHARD_DEFENCE, quantity: 40 },
            { ...SHARD_AGILITY, quantity: 40 },
            { ...SHARD_WISDOM, quantity: 40 },
        ],
    },
];
