import { SHARD_BLANK, SHARD_ATTACK, SHARD_DEFENCE, SHARD_AGILITY, SHARD_WISDOM, SHARD_UNITY, SCORIA_ORE, AZURE_PEBBLE } from "src/api/items/item/data/ingredients";
import { EXPEDITION_TIME_SCALE } from "src/configuration/backend.config";
import { ExpeditionDto } from "../model/dto/expedition.dto";
import { GUARDIAN_EVENT_1 } from "./expedition-guardians-event";

export const EXPEDITION_EVENT_1: ExpeditionDto = {
    uid: 'expedition-e1',
    name: 'Fleeting Treasure Island',
    hint: `One of the most elusive and rewarding destinations known for its temporary availability only during the winter solstice. 
        The lucky ones get to experience this paradise will be rewarded with extraordinary treasure.`,
    level: 10,
    gold: 100,
    extraGold: 50,
    loots: [
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, 
        SHARD_ATTACK, SHARD_ATTACK, SHARD_ATTACK, SHARD_ATTACK,
        SHARD_DEFENCE, SHARD_DEFENCE, SHARD_DEFENCE, SHARD_DEFENCE,
        SHARD_AGILITY, SHARD_AGILITY, SHARD_AGILITY, SHARD_AGILITY,
        SHARD_WISDOM, SHARD_WISDOM, SHARD_WISDOM, SHARD_WISDOM,
        SHARD_UNITY, SHARD_UNITY,
    ],
    extraLoots: [
        SCORIA_ORE, SCORIA_ORE, SCORIA_ORE, SCORIA_ORE,
        AZURE_PEBBLE, AZURE_PEBBLE, AZURE_PEBBLE,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 6 * 60 * 60 * 1000,
    guardian: GUARDIAN_EVENT_1,
};

export const EXPEDITIONS_EVENT: ExpeditionDto[] = [
    EXPEDITION_EVENT_1,
];
