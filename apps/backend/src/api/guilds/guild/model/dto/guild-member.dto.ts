import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { GuildRoleDto } from "./guild-role.dto";
import { GuildDto } from "./guild.dto";

export class GuildMemberDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    guild: Partial<GuildDto>;

    @ApiProperty()
    user: Partial<UserDto>;

    @ApiProperty()
    role: Partial<GuildRoleDto>;
}
