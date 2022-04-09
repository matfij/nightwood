import { ItemDto } from "../dto/item.dto";

export enum ItemType {
    Food = 'Food',
    Ingredient = 'Ingredient',
    Equipment = 'Equipment',
}

export enum FoodType {
    Strength = 'Strength',
    Dexterity = 'Dexterity',
    Endurance = 'Endurance',
    Will = 'Will',
    Luck = 'Luck',
    Complete = 'Complete',
}

export enum EquipmentType {
    Armor = 'Armor',
    Charm = 'Charm',
    Rune = 'Rune',
}
