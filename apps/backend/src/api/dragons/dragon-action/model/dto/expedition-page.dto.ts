import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PaginationBaseDto } from "src/common/definitions/pagination";
import { ExpeditionDto } from "./expedition.dto";

export class ExpeditionPageDto extends PaginationBaseDto {

    @IsArray()
    @ApiProperty( { type: [ExpeditionDto] })
    data: ExpeditionDto[];
}
