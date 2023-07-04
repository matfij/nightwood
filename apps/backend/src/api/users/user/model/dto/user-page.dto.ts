import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PaginationBaseDto } from "src/common/definitions/pagination";
import { UserDto } from "./user.dto";

export class UserPageDto extends PaginationBaseDto {

    @IsArray()
    @ApiProperty({ type: [UserDto] })
    data: UserDto[];
}
