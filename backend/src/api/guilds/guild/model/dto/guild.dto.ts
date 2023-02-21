import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { GuildApplicaton } from "../guild-application.entity";
import { GuildMember } from "../guild-member.entity";
import { GuildApplicatonDto } from "./guild-application.dto";
import { GuildMemberDto } from "./guild-member.dto";
import { GuildRoleDto } from "./guild-role.dto";

export class GuildDto {
    
    @ApiProperty()
    id: number;

    @ApiProperty()
    founder: Partial<UserDto>;

    @ApiProperty()
    name: string;

    @ApiProperty()
    tag: string;

    @ApiPropertyOptional()
    description?: string;

    @ApiProperty({ type: [GuildApplicatonDto] })
    applications: GuildApplicatonDto[];

    @ApiProperty({ type: [GuildRoleDto] })
    roles: GuildRoleDto[];

    @ApiProperty({ type: [GuildMemberDto] })
    members: GuildMemberDto[];
}
