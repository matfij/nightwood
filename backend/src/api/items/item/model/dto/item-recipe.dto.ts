import { ApiProperty } from "@nestjs/swagger";
import { ItemDto } from "./item.dto";

export class ItemRecipeDto {

    @ApiProperty()
    uid: string;

    @ApiProperty()
    product: ItemDto;

    @ApiProperty()
    ingredients: ItemDto[];
}
