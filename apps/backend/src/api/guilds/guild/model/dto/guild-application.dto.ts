import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { GuildDto } from "./guild.dto";

export class GuildApplicatonDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    user: Partial<UserDto>;

    @ApiProperty()
    guild: Partial<GuildDto>;

    @ApiPropertyOptional()
    message?: string;
}
