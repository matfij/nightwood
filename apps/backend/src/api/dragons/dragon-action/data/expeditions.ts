import { BUBULAE_STEAK, IHON_BERRY, RELIQUM_EGG, RORIS_LEAVES, SPIRAL_NUT } from "src/api/items/item/data/food";
import { ARTICHOKE, AZURE_PEBBLE, CRIMSON_SEED, CRIMSON_TEAR, ETERNAL_FLOWER, FEEBLE_MUSHROOMS, FILIKO_ROOTS, GATE_KEY, GATE_PARTICLE, MIDNIGHT_ESSENCE, PALE_GRAINS, SCORIA_ORE, SHARD_AGILITY, SHARD_ATTACK, SHARD_BLANK, SHARD_DEFENCE, SHARD_UNITY, SHARD_WISDOM, SOVAGA_LEAVES, SUPERCHARGED_CRYSTAL, TRANSMUTATION_STONE } from "src/api/items/item/data/ingredients";
import { EXPEDITION_TIME_SCALE } from "src/configuration/backend.config";
import { ExpeditionDto } from "../model/dto/expedition.dto";
import { GUARDIAN_FOREST, GUARDIAN_DESERT, GUARDIAN_MOUNTAINS, GUARDIAN_ISLANDS } from "./expedition-guardians";

export const ANDREW_FOREST: ExpeditionDto = {
    uid: 'expedition-1',
    name: 'Andrew Forest',
    hint: `Despite the first impression, it is a surprisingly calm and warm place, ideal for young dragons. 
        The forest is protected by Andrew, a legendary dragon who has been guarding it since the great migration.`,
    level: 1,
    gold: 30,
    extraGold: 10,
    eter: 0,
    extraEter: 2,
    loots: [
        FEEBLE_MUSHROOMS,
        BUBULAE_STEAK, BUBULAE_STEAK, BUBULAE_STEAK, BUBULAE_STEAK,
        IHON_BERRY, IHON_BERRY, IHON_BERRY, IHON_BERRY, 
        RELIQUM_EGG, RELIQUM_EGG, RELIQUM_EGG, RELIQUM_EGG,
        SPIRAL_NUT, SPIRAL_NUT, SPIRAL_NUT, SPIRAL_NUT,
        RORIS_LEAVES, RORIS_LEAVES, RORIS_LEAVES, RORIS_LEAVES,
        FILIKO_ROOTS, FILIKO_ROOTS,
        PALE_GRAINS, PALE_GRAINS,
        ARTICHOKE,
    ],
    extraLoots: [
        FEEBLE_MUSHROOMS, FEEBLE_MUSHROOMS,
        BUBULAE_STEAK, BUBULAE_STEAK,
        IHON_BERRY, IHON_BERRY,
        RELIQUM_EGG, RELIQUM_EGG,
        SPIRAL_NUT, SPIRAL_NUT,
        RORIS_LEAVES, RORIS_LEAVES,
        FILIKO_ROOTS, FILIKO_ROOTS, FILIKO_ROOTS, FILIKO_ROOTS,
        PALE_GRAINS, PALE_GRAINS, PALE_GRAINS, PALE_GRAINS,
        ARTICHOKE, ARTICHOKE,
        CRIMSON_SEED, CRIMSON_SEED,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 3 * 60 * 60 * 1000,
    guardian: GUARDIAN_FOREST,
};

export const CARRAMBA_SANDS: ExpeditionDto = {
    uid: 'expedition-2',
    name: 'Carramba Sands',
    hint: `In the past, a great southern empire stretched over these lands, but was destroyed by the elusive mechanical dragon.
        The sands are now a place of peace and a wide variety of treasures.`,
    level: 10,
    gold: 60,
    extraGold: 20,
    eter: 0,
    extraEter: 5,
    loots: [
        FEEBLE_MUSHROOMS, FEEBLE_MUSHROOMS,
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
    extraLoots: [
        FEEBLE_MUSHROOMS, FEEBLE_MUSHROOMS,
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK,
        BUBULAE_STEAK, IHON_BERRY, RELIQUM_EGG, SPIRAL_NUT, RORIS_LEAVES,
        SHARD_ATTACK, SHARD_AGILITY, SHARD_DEFENCE, SHARD_WISDOM,
        SCORIA_ORE, SCORIA_ORE, AZURE_PEBBLE,
        SHARD_UNITY,
        CRIMSON_SEED,
        CRIMSON_TEAR, CRIMSON_TEAR,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 6 * 60 * 60 * 1000,
    guardian: GUARDIAN_DESERT,
};

export const HARNA_PEAKS: ExpeditionDto = {
    uid: 'expedition-3',
    name: 'Harna Peaks',
    hint: `A mysterious and little explored place filled with magical particles. Because of strong winds this expedition 
        takes a long time. These mountains hide shards and gems used by the Tinkering Goblin Tribe.`,
    level: 10,
    gold: 90,
    extraGold: 30,
    eter: 0,
    extraEter: 5,
    loots: [
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK,
        SHARD_ATTACK, SHARD_ATTACK, SHARD_ATTACK,
        SHARD_DEFENCE, SHARD_DEFENCE, SHARD_DEFENCE,
        SHARD_AGILITY, SHARD_AGILITY, SHARD_AGILITY,
        SHARD_WISDOM, SHARD_WISDOM, SHARD_WISDOM,
        SHARD_UNITY, SHARD_UNITY,
        SCORIA_ORE, SCORIA_ORE, SCORIA_ORE, SCORIA_ORE,
        TRANSMUTATION_STONE,
    ],
    extraLoots: [
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK,
        SHARD_ATTACK, SHARD_ATTACK, SHARD_ATTACK,
        SHARD_DEFENCE, SHARD_DEFENCE, SHARD_DEFENCE,
        SHARD_AGILITY, SHARD_AGILITY, SHARD_AGILITY,
        SHARD_WISDOM, SHARD_WISDOM, SHARD_WISDOM,
        SCORIA_ORE, SCORIA_ORE, SCORIA_ORE,
        AZURE_PEBBLE, AZURE_PEBBLE, AZURE_PEBBLE,
        SHARD_UNITY, SHARD_UNITY,
        CRIMSON_TEAR, CRIMSON_TEAR,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 9 * 60 * 60 * 1000,
    guardian: GUARDIAN_MOUNTAINS,
};

export const MIRAGE_ISLANDS: ExpeditionDto = {
    uid: 'expedition-4',
    name: 'Mirage Islands',
    hint: `Miraculously discovered lands by the order of the White Rose. The island hides items that are not found anywhere 
        else in the world and may be used for dragon summoning.`,
    level: 30,
    gold: 80,
    extraGold: 20,
    eter: 1,
    extraEter: 10,
    loots: [
        SOVAGA_LEAVES, SOVAGA_LEAVES, SOVAGA_LEAVES,
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, SHARD_BLANK,
        SHARD_UNITY, SHARD_UNITY,
        SCORIA_ORE, SCORIA_ORE, SCORIA_ORE,
        GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE,
        GATE_KEY, GATE_KEY,
        SUPERCHARGED_CRYSTAL,
        ETERNAL_FLOWER,
        MIDNIGHT_ESSENCE,
        TRANSMUTATION_STONE,
    ],
    extraLoots: [
        SOVAGA_LEAVES, SOVAGA_LEAVES, SOVAGA_LEAVES,
        SHARD_BLANK, SHARD_BLANK, SHARD_BLANK, 
        SHARD_ATTACK, SHARD_AGILITY, SHARD_DEFENCE, SHARD_WISDOM,
        BUBULAE_STEAK, IHON_BERRY, RELIQUM_EGG, SPIRAL_NUT, RORIS_LEAVES,
        BUBULAE_STEAK, IHON_BERRY, RELIQUM_EGG, SPIRAL_NUT, RORIS_LEAVES,
        SHARD_UNITY,
        GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE, GATE_PARTICLE,
        GATE_KEY, GATE_KEY,
        SCORIA_ORE, SCORIA_ORE, SCORIA_ORE, SCORIA_ORE,
        AZURE_PEBBLE, AZURE_PEBBLE, AZURE_PEBBLE,
        CRIMSON_SEED,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 7.5 * 60 * 60 * 1000,
    guardian: GUARDIAN_ISLANDS,
};

export const EXPEDITIONS = [
    ANDREW_FOREST, 
    CARRAMBA_SANDS, 
    HARNA_PEAKS,
    MIRAGE_ISLANDS,
];
