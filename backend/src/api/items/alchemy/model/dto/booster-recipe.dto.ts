import { ApiProperty } from "@nestjs/swagger";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";

export class BoosterRecipeDto {

    @ApiProperty()
    uid: string;

    @ApiProperty()
    product: ItemDto;

    @ApiProperty({ type: [ItemDto] })
    ingredients: ItemDto[];
}
