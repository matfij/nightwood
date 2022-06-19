import { BUBULAE_STEAK, IHON_BERRY, RELIQUM_EGG, RORIS_LEAVES, SPIRAL_NUT,  } from "./food";
import { ItemDto } from "../dto/item.dto";
import { FEEBLE_MUSHROOMS } from "./ingredients";


export const STARTING_ITEMS: ItemDto[] = [
    { ...BUBULAE_STEAK, quantity: 10 },
    { ...IHON_BERRY, quantity: 10 },
    { ...RELIQUM_EGG, quantity: 10 },
    { ...SPIRAL_NUT, quantity: 10 },
    { ...RORIS_LEAVES, quantity: 10 },
    { ...FEEBLE_MUSHROOMS, quantity: 1 },
];
