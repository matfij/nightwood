import { ApiProperty } from "@nestjs/swagger";

export class EquipmentStatisticsDto {

    @ApiProperty()
    strength?: number;

    @ApiProperty()
    dexterity?: number;

    @ApiProperty()
    endurance?: number;

    @ApiProperty()
    will?: number;

    @ApiProperty()
    luck?: number;

    @ApiProperty()
    allAttributes?: number;

    @ApiProperty()
    criticalChance?: number;

    @ApiProperty()
    criticalPower?: number;

    @ApiProperty()
    health?: number;

    @ApiProperty()
    armor?: number;

    @ApiProperty()
    speed?: number;

    @ApiProperty()
    initiative?: number;

    @ApiProperty()
    mana?: number;
}