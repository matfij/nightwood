import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";

export class ExpeditionDto {

    @ApiProperty()
    uid: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    hint: string;

    @ApiProperty()
    level: number;

    @ApiProperty()
    experienceAward: number;

    @ApiProperty()
    goldAward: number;

    @Exclude()
    @ApiProperty({ type: [ItemDto] })
    loots: ItemDto[];

    @ApiProperty()
    minimumActionTime: number;
}
