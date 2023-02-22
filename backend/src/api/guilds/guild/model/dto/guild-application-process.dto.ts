import { ApiProperty } from "@nestjs/swagger";

export class GuildApplicationProcessDto {

    @ApiProperty()
    applicationId: number;

    @ApiProperty()
    accept: boolean;
}
