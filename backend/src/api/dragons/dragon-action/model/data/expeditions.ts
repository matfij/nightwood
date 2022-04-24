import { BUBULAE_STEAK, IHON_BERRY, MIRACLE_FRUIT, RELIQUM_EGG, RORIS_LEEFS, SPIRAL_NUT } from "src/api/items/item/model/data/food";
import { TRANSMUTATION_STONE } from "src/api/items/item/model/data/ingredients";
import { SHARD_AGILITY, SHARD_ATTACK, SHARD_BLANK, SHARD_DEFENCE, SHARD_UNITY, SHARD_WISDOM } from "src/api/items/item/model/data/runes";
import { EXPEDITION_TIME_SCALE } from "src/configuration/backend.config";
import { ExpeditionDto } from "../dto/expedition.dto";

export const ANDREW_FOREST: ExpeditionDto = {
    uid: 'expedition-1',
    name: 'Andrew Forest',
    hint: 'Desipe the first impression it is a suprisingly calm and warm place, ideal for young dragons. The forest is protected by Andrew, a legendary dragon who has been guarding the forest since the great migration.',
    level: 1,
    experienceAward: 50,
    goldAward: 50,
    loots: [
        BUBULAE_STEAK, BUBULAE_STEAK, BUBULAE_STEAK,
        IHON_BERRY, IHON_BERRY, IHON_BERRY, IHON_BERRY, 
        RELIQUM_EGG, RELIQUM_EGG, RELIQUM_EGG,
        SPIRAL_NUT, SPIRAL_NUT, SPIRAL_NUT, SPIRAL_NUT,
        RORIS_LEEFS, RORIS_LEEFS, RORIS_LEEFS,
        MIRACLE_FRUIT,
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK,
        TRANSMUTATION_STONE,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 3 * 60 * 60 * 1000,
}

export const CARRAMBA_SANDS: ExpeditionDto = {
    uid: 'expedition-2',
    name: 'Carramba Sands',
    hint: 'A faraway land, covered with sand and rocks where the wind is strong and the temperature is scorching. The desert is a place of great danger, but it is also a place of great treasure.',
    level: 10,
    experienceAward: 90,
    goldAward: 100,
    loots: [
        BUBULAE_STEAK, BUBULAE_STEAK,
        IHON_BERRY, IHON_BERRY, 
        RELIQUM_EGG, RELIQUM_EGG, 
        SPIRAL_NUT, SPIRAL_NUT, 
        RORIS_LEEFS, RORIS_LEEFS, 
        MIRACLE_FRUIT,
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, 
        SHARD_ATTACK, SHARD_ATTACK,
        SHARD_DEFENCE, SHARD_DEFENCE,
        SHARD_AGILITY, SHARD_AGILITY,
        SHARD_WISDOM, SHARD_WISDOM,
        SHARD_UNITY,
        TRANSMUTATION_STONE,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 6 * 60 * 60 * 1000,
}

export const HARNA_PEAKS: ExpeditionDto = {
    uid: 'expedition-3',
    name: 'Harna Peaks',
    hint: 'Mysterious and unexplored place filled with magical particles. Exploration requires an exceptional amount of power therefore it is accessible only for matured dragons.',
    level: 25,
    experienceAward: 120,
    goldAward: 125,
    loots: [
        MIRACLE_FRUIT, MIRACLE_FRUIT,
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK,
        SHARD_ATTACK, SHARD_ATTACK, SHARD_ATTACK,
        SHARD_DEFENCE, SHARD_DEFENCE, SHARD_DEFENCE,
        SHARD_AGILITY, SHARD_AGILITY, SHARD_AGILITY,
        SHARD_WISDOM, SHARD_WISDOM, SHARD_WISDOM,
        SHARD_UNITY, SHARD_UNITY,
        TRANSMUTATION_STONE,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 9 * 60 * 60 * 1000,
}
