import { ApiProperty } from '@nestjs/swagger';

export class GuildDepositResourceDto {
    @ApiProperty()
    guildId: number;

    @ApiProperty()
    gold: number;

    @ApiProperty()
    eter: number;
}
