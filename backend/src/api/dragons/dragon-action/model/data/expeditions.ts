import { BUBULAE_STEAK, IHON_BERRY, MIRACLE_FRUIT, RELIQUM_EGG, RORIS_LEEFS, SPIRAL_NUT } from "src/api/items/item/model/data/food";
import { EXPEDITION_TIME_SCALE } from "src/configuration/backend.config";
import { ExpeditionDto } from "../dto/expedition.dto";

export const ANDREW_FOREST: ExpeditionDto = {
    id: 1,
    name: 'AndrewForest',
    level: 1,
    experienceAward: 150,
    goldAward: 50,
    loots: [
        BUBULAE_STEAK, BUBULAE_STEAK, 
        IHON_BERRY, IHON_BERRY, IHON_BERRY, IHON_BERRY, IHON_BERRY,
        RELIQUM_EGG, RELIQUM_EGG, RELIQUM_EGG,
        SPIRAL_NUT, SPIRAL_NUT, SPIRAL_NUT, SPIRAL_NUT, SPIRAL_NUT,
        RORIS_LEEFS, RORIS_LEEFS, RORIS_LEEFS, RORIS_LEEFS, RORIS_LEEFS,
        MIRACLE_FRUIT, MIRACLE_FRUIT,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 3 * 60 * 60 * 1000,
}

export const CARRANGA_SANDS: ExpeditionDto = {
    id: 2,
    name: 'RangaSands',
    level: 10,
    experienceAward: 300,
    goldAward: 100,
    loots: [
        BUBULAE_STEAK,
        IHON_BERRY,
        RELIQUM_EGG,
        SPIRAL_NUT,
        RORIS_LEEFS,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 6 * 60 * 60 * 1000,
}

export const HARNA_PEAKS: ExpeditionDto = {
    id: 3,
    name: 'HarnaPeaks',
    level: 25,
    experienceAward: 400,
    goldAward: 125,
    loots: [
        BUBULAE_STEAK,
        IHON_BERRY,
        RELIQUM_EGG,
        SPIRAL_NUT,
        RORIS_LEEFS,
    ],
    minimumActionTime: EXPEDITION_TIME_SCALE * 12 * 60 * 60 * 1000,
}
