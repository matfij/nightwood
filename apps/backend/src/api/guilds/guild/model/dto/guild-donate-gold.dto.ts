import { ApiProperty } from '@nestjs/swagger';

export class GuildDonateGoldDto {
    @ApiProperty()
    guildId: number;

    @ApiProperty()
    gold: number;
}
