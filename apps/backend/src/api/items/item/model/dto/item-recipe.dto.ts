import { ApiProperty } from "@nestjs/swagger";
import { ItemDto } from "./item.dto";

export class ItemRecipeDto {

    @ApiProperty()
    uid: string;

    @ApiProperty()
    product: ItemDto;

    @ApiProperty()
    gold: number;

    @ApiProperty()
    eter: number;

    @ApiProperty({ type: [ItemDto] })
    ingredients: ItemDto[];
}
