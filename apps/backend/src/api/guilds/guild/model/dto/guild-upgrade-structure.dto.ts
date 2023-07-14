import { ApiProperty } from '@nestjs/swagger';
import { GuildStructure } from '../definitions/guild-structure';

export class GuildUpgradeStructureDto {
    @ApiProperty()
    guildId: number;

    @ApiProperty({ enum: GuildStructure, enumName: 'GuildStructure' })
    structureType: GuildStructure;
}
