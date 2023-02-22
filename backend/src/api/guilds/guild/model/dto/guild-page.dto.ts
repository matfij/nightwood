import { ApiProperty } from "@nestjs/swagger";
import { PaginationBaseDto } from "src/common/definitions/pagination";
import { GuildDto } from "./guild.dto";

export class GuildPageDto extends PaginationBaseDto {

    @ApiProperty({ type: [GuildDto] })
    data: Partial<GuildDto>[];
}
