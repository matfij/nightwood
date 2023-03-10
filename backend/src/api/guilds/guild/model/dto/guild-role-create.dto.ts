import { ApiProperty } from "@nestjs/swagger";

export class GuildRoleCreateDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    priority: number;

    @ApiProperty()
    canAddMembers: boolean;

    @ApiProperty()
    canRemoveMembers: boolean;

    @ApiProperty()
    canConstruct: boolean;
}
