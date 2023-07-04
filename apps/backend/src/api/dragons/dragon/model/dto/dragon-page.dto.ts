import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PaginationBaseDto } from "src/common/definitions/pagination";
import { DragonDto } from "./dragon.dto";

export class DragonPageDto extends PaginationBaseDto {

    @IsArray()
    @ApiProperty({ type: [DragonDto] })
    data: Partial<DragonDto>[];
}
