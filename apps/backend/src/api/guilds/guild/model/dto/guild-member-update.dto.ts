import { ApiProperty } from "@nestjs/swagger";

export class GuildMemberUpdateDto {

    @ApiProperty()
    memberId: number;

    @ApiProperty()
    roleId: number;
}
