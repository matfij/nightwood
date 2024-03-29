import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
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
    applications: Partial<GuildApplicatonDto>[];

    @ApiProperty({ type: [GuildRoleDto] })
    roles: Partial<GuildRoleDto>[];

    @ApiProperty({ type: [GuildMemberDto] })
    members: Partial<GuildMemberDto>[];

    @ApiProperty()
    gold: number;

    @ApiProperty()
    eter: number;

    @ApiProperty()
    wood: number;

    @ApiProperty()
    stone: number;

    @ApiProperty()
    steel: number;
    
    @ApiProperty()
    sawmillLevel: number;

    @ApiProperty()
    quarryLevel: number;

    @ApiProperty()
    forgeLevel: number;

    @ApiProperty()
    tamerTowerLevel: number;

    @ApiProperty()
    tenacityTowerLevel: number;

    @ApiProperty()
    beaconTowerLevel: number;
}
