import { BUBULAE_STEAK, IHON_BERRY, MIRACLE_FRUIT, RELIQUM_EGG, RORIS_LEAVES, SPIRAL_NUT } from "src/api/items/item/model/data/food";
import { ARTICHOKE, CRIMSON_SEED, ETERNAL_FLOWER, FILIKO_ROOTS, GATE_KEY, GATE_PARTICLE, MIDNIGHT_ESSENCE, PALE_GRAINS, SOVAGA_LEAVES, SUPERCHARGED_CRYSTAL, TRANSMUTATION_STONE } from "src/api/items/item/model/data/ingredients";
import { SHARD_AGILITY, SHARD_ATTACK, SHARD_BLANK, SHARD_DEFENCE, SHARD_UNITY, SHARD_WISDOM } from "src/api/items/item/model/data/runes";
import { EXPEDITION_TIME_SCALE } from "src/configuration/backend.config";
import { ExpeditionDto } from "../dto/expedition.dto";

export const ANDREW_FOREST: ExpeditionDto = {
    uid: 'expedition-1',
    name: 'Andrew Forest',
    hint: `Despite the first impression, it is a surprisingly calm and warm place, ideal for young dragons. 
        The forest is protected by Andrew, a legendary dragon who has been guarding it since the great migration.`,
    level: 1,
    experienceAward: 40,
    goldAward: 50,
    loots: [
        BUBULAE_STEAK, BUBULAE_STEAK, BUBULAE_STEAK, BUBULAE_STEAK,
        IHON_BERRY, IHON_BERRY, IHON_BERRY, IHON_BERRY, 
        RELIQUM_EGG, RELIQUM_EGG, RELIQUM_EGG, RELIQUM_EGG,
        SPIRAL_NUT, SPIRAL_NUT, SPIRAL_NUT, SPIRAL_NUT,
        RORIS_LEAVES, RORIS_LEAVES, RORIS_LEAVES, RORIS_LEAVES,
        SHARD_BLANK, SHARD_BLANK,
        TRANSMUTATION_STONE,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 3 * 60 * 60 * 1000,
};

export const CARRAMBA_SANDS: ExpeditionDto = {
    uid: 'expedition-2',
    name: 'Carramba Sands',
    hint: `In the past, a great southern empire stretched over these lands, but was destroyed by the elusive mechanical dragon.
        The sands are now a place of peace and a wide variety of treasures.`,
    level: 10,
    experienceAward: 60,
    goldAward: 110,
    loots: [
        BUBULAE_STEAK, BUBULAE_STEAK,
        IHON_BERRY, IHON_BERRY, 
        RELIQUM_EGG, RELIQUM_EGG, 
        SPIRAL_NUT, SPIRAL_NUT, 
        RORIS_LEAVES, RORIS_LEAVES,
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, 
        SHARD_ATTACK, SHARD_ATTACK,
        SHARD_DEFENCE, SHARD_DEFENCE,
        SHARD_AGILITY, SHARD_AGILITY,
        SHARD_WISDOM, SHARD_WISDOM,
        SHARD_UNITY,
        TRANSMUTATION_STONE,
        GATE_PARTICLE, GATE_PARTICLE,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 6 * 60 * 60 * 1000,
};

export const HARNA_PEAKS: ExpeditionDto = {
    uid: 'expedition-3',
    name: 'Harna Peaks',
    hint: `A mysterious and little explored place filled with magical particles. Because of strong winds this expedition 
        takes a long time. These mountains hide shards and gems used by the Tinkering Goblin Tribe.`,
    level: 10,
    experienceAward: 70,
    goldAward: 90,
    loots: [
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK,
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
    hint: `Miraculously discovered lands by the order of the White Rose. The island hides items that are not found anywhere 
        else in the world and may be used for dragon summoning.`,
    level: 30,
    experienceAward: 60,
    goldAward: 100,
    loots: [
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK,
        SHARD_UNITY,
        GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE,
        GATE_KEY, GATE_KEY,
        SUPERCHARGED_CRYSTAL,
        ETERNAL_FLOWER,
        MIDNIGHT_ESSENCE,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 7.5 * 60 * 60 * 1000,
};

export const TRANSIENT_CAVERNS: ExpeditionDto = {
    uid: 'expedition-5',
    name: 'Transient Caverns',
    hint: `Intricate and vast network of caverns located to the east of Harna Peaks. As a consequence tectonic activity,
        the liars will cease to exist in near future`,
    level: 30,
    experienceAward: 50,
    goldAward: 70,
    loots: [
        BUBULAE_STEAK, BUBULAE_STEAK,
        IHON_BERRY, IHON_BERRY, 
        RELIQUM_EGG, RELIQUM_EGG, 
        SPIRAL_NUT, SPIRAL_NUT, 
        RORIS_LEAVES, RORIS_LEAVES,
        PALE_GRAINS, PALE_GRAINS, PALE_GRAINS, PALE_GRAINS, PALE_GRAINS,
        FILIKO_ROOTS, FILIKO_ROOTS, FILIKO_ROOTS, FILIKO_ROOTS, FILIKO_ROOTS,
        SOVAGA_LEAVES, SOVAGA_LEAVES, SOVAGA_LEAVES, SOVAGA_LEAVES, SOVAGA_LEAVES, 
        ARTICHOKE, ARTICHOKE, ARTICHOKE,
        CRIMSON_SEED,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 6 * 60 * 60 * 1000,
};
