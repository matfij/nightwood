import { ApiProperty } from "@nestjs/swagger";
import { PaginationBaseDto } from "src/common/definitions/pagination";
import { GuildApplicatonDto } from "./guild-application.dto";

export class GuildApplicationPageDto extends PaginationBaseDto {

    @ApiProperty({ type: [GuildApplicatonDto] })
    data: Partial<GuildApplicatonDto>[];
}
