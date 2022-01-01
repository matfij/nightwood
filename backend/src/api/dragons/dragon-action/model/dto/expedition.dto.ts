import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";

export class ExpeditionDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    level: number;

    @Exclude()
    @ApiProperty({ type: [ItemDto] })
    loots: ItemDto[];

    @ApiProperty()
    minimumActionTime: number;
}
