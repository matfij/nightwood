import { BUBULAE_STEAK, IHON_BERRY, MIRACLE_FRUIT, RELIQUM_EGG, RORIS_LEEFS, SPIRAL_NUT } from "src/api/items/item/model/data/food";
import { ETERNAL_FLOWER, GATE_KEY, GATE_PARTICLE, MIDNIGHT_ESSENCE, SUPERCHARGE_CRYSTAL, TRANSMUTATION_STONE } from "src/api/items/item/model/data/ingredients";
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
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK,
        SHARD_UNITY,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 3 * 60 * 60 * 1000,
};

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
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, 
        SHARD_ATTACK, SHARD_ATTACK,
        SHARD_DEFENCE, SHARD_DEFENCE,
        SHARD_AGILITY, SHARD_AGILITY,
        SHARD_WISDOM, SHARD_WISDOM,
        SHARD_UNITY,
        TRANSMUTATION_STONE,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 6 * 60 * 60 * 1000,
};

export const HARNA_PEAKS: ExpeditionDto = {
    uid: 'expedition-3',
    name: 'Harna Peaks',
    hint: 'Mysterious and little explored place filled with magical particles. These mountains hide gems used by the thinkerink goblin tribe.',
    level: 10,
    experienceAward: 120,
    goldAward: 125,
    loots: [
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK,
        SHARD_ATTACK, SHARD_ATTACK, SHARD_ATTACK,
        SHARD_DEFENCE, SHARD_DEFENCE, SHARD_DEFENCE,
        SHARD_AGILITY, SHARD_AGILITY, SHARD_AGILITY,
        SHARD_WISDOM, SHARD_WISDOM, SHARD_WISDOM,
        SHARD_UNITY, SHARD_UNITY,
        TRANSMUTATION_STONE,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 9 * 60 * 60 * 1000,
};

export const MIRAGE_ISLAND: ExpeditionDto = {
    uid: 'expedition-4',
    name: 'Mirage Island',
    hint: 'Miraculously discovered lands by the order of the White Rose. The island hides items that are not found anywhere else in the world and may be used to summon dragons from ancient times.',
    level: 30,
    experienceAward: 100,
    goldAward: 100,
    loots: [
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK,
        SHARD_UNITY,
        TRANSMUTATION_STONE,
        GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE,
        GATE_KEY,
        SUPERCHARGE_CRYSTAL,
        ETERNAL_FLOWER,
        MIDNIGHT_ESSENCE,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 7.5 * 60 * 60 * 1000,
};
