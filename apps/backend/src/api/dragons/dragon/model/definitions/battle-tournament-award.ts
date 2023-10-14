import { ItemDto } from '../../../../items/item/model/dto/item.dto';

export interface BattleTournamentAward {
    gold: number;
    eter: number;
    items: ItemDto[];
}
