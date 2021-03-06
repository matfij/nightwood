import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";
import { ExpeditionGuardianDto } from "../definitions/guardian";

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
    gold: number;

    @ApiProperty()
    extraGold: number;

    @ApiProperty({ type: [ItemDto] })
    loots: ItemDto[];

    @ApiProperty({ type: [ItemDto] })
    extraLoots: ItemDto[];

    @ApiProperty()
    minimumActionTime: number;

    @ApiProperty()
    guardian: ExpeditionGuardianDto;
}
