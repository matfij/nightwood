import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";
import { ExpeditionGuardianDto } from "./expedition-guardian.dto";

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
    eter: number;

    @ApiProperty()
    extraGold: number;

    @ApiProperty()
    extraEter: number;

    @ApiProperty({ type: [ItemDto] })
    loots: ItemDto[];

    @ApiProperty({ type: [ItemDto] })
    extraLoots: ItemDto[];

    @ApiProperty()
    minimumActionTime: number;

    @ApiProperty()
    guardian: ExpeditionGuardianDto;
}
