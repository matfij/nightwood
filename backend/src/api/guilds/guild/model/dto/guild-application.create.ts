import { ApiProperty } from "@nestjs/swagger";

export class GuildApplicationCreateDto {
    
    @ApiProperty()
    guildId: number;

    @ApiProperty()
    message: string;
}
