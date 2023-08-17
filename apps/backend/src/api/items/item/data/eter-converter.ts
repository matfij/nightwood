import { ETER_CONVERTER_SCALE } from "../../../../configuration/backend.config";
import { ItemRarity } from "../model/definitions/items";

export const CONVERT_ETER = (level: number, rarity: ItemRarity): number => {
    let rarityFactor = 1;
    switch (rarity) {
        case ItemRarity.Common: {
            rarityFactor = 1;
            break;
        }
        case ItemRarity.Scarce: {
            rarityFactor = 1.5;
            break;
        }
        case ItemRarity.Rare: {
            rarityFactor = 2;
            break;
        }
        case ItemRarity.Mythical: {
            rarityFactor = 3;
            break;
        }
    }
    return Math.round(1 + ETER_CONVERTER_SCALE * level * rarityFactor / 10);
}