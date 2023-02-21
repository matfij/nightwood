import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { GuildRoleDto } from "./guild-role.dto";

export class GuildMemberDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    user: Partial<UserDto>;

    @ApiProperty()
    role: GuildRoleDto;
}
