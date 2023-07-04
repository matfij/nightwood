import { ApiProperty } from "@nestjs/swagger";

export class GuildUserCheckResultDto {
    
    @ApiProperty()
    guildId: number;

    @ApiProperty()
    guildName: string;

    @ApiProperty()
    guildTag: string;
}
