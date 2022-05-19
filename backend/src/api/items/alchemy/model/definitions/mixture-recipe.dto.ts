import { ApiProperty } from "@nestjs/swagger";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";

export class MixtureRecipeDto {

    @ApiProperty()
    uid: string;

    @ApiProperty()
    product: ItemDto;

    @ApiProperty({ type: [ItemDto] })
    ingredients: ItemDto[];

    @ApiProperty()
    prepareTime: number;
}
