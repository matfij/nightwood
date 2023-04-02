import { ApiProperty } from "@nestjs/swagger";

export class GuildRoleUpdateDto {

    @ApiProperty()
    id: number;

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
