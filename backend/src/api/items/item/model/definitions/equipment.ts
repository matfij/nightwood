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
    resistance?: number;

    @ApiProperty()
    speed?: number;

    @ApiProperty()
    initiative?: number;

    @ApiProperty()
    mana?: number;

    @ApiProperty()
    healthBoost?: number;

    @ApiProperty()
    armorBoost?: number;

    @ApiProperty()
    physicalAttackBoost?: number;

    @ApiProperty()
    criticalChanceBoost?: number;

    @ApiProperty()
    magicalAttackBoost?: number;

    @ApiProperty()
    manaBoost?: number;

    @ApiProperty()
    speedBoost?: number;

    @ApiProperty()
    dodgeBoost?: number;
}
