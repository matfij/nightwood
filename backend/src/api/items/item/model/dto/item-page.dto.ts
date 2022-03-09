import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PaginationBaseDto } from "src/common/definitions/pagination";
import { ItemDto } from "./item.dto";

export class ItemPageDto extends PaginationBaseDto {

    @IsArray()
    @ApiProperty( { type: [ItemDto] })
    data: ItemDto[];
}
