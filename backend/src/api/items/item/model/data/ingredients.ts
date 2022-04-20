import { ItemRarity } from "../definitions/item-rarity";
import { ItemType } from "../definitions/item-type";
import { ItemDto } from "../dto/item.dto";

export const TRANSMUTATION_STONE: ItemDto = {
    uid: 'item-r-11',
    name: 'Transmutation Stone',
    level: 10,
    rarity: ItemRarity.Mythical,
    type: ItemType.Ingredient,
};
