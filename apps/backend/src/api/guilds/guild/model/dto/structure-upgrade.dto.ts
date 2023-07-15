import { ApiProperty } from '@nestjs/swagger';

export class StructureUpgradeDto {
    @ApiProperty()
    level: number;

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
    utility: number;

    @ApiProperty()
    description: string;
}
