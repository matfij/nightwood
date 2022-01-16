import { BUBULAE_STEAK, IHON_BERRY, RELIQUM_EGG, RORIS_LEEFS, SPIRAL_NUT } from "src/api/items/item/model/data/food";
import { ExpeditionDto } from "../dto/expedition.dto";

export const ANDREW_FOREST: ExpeditionDto = {
    id: 1,
    name: 'AndrewForest',
    level: 1,
    experience: 100,
    loots: [
        BUBULAE_STEAK,
        IHON_BERRY,
        RELIQUM_EGG,
        SPIRAL_NUT,
        RORIS_LEEFS,
    ],
    minimumActionTime: 3 * 60 * 60 * 1000 / 1000,
}

export const CARRANGA_SANDS: ExpeditionDto = {
    id: 2,
    name: 'RangaSands',
    level: 10,
    experience: 500,
    loots: [
        BUBULAE_STEAK,
        IHON_BERRY,
        RELIQUM_EGG,
        SPIRAL_NUT,
        RORIS_LEEFS,
    ],
    minimumActionTime: 6 * 60 * 60 * 1000,
}

export const HARNA_PEAKS: ExpeditionDto = {
    id: 3,
    name: 'HarnaPeaks',
    level: 25,
    experience: 700,
    loots: [
        BUBULAE_STEAK,
        IHON_BERRY,
        RELIQUM_EGG,
        SPIRAL_NUT,
        RORIS_LEEFS,
    ],
    minimumActionTime: 12 * 60 * 60 * 1000,
}
