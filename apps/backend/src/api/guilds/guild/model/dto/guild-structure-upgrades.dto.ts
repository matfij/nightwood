import { ApiProperty } from '@nestjs/swagger/dist';
import { StructureUpgradeDto } from './structure-upgrade.dto';

export class GuildStructureUpgrades {
    @ApiProperty({ type: [StructureUpgradeDto] })
    sawmillUpgrades: StructureUpgradeDto[];

    @ApiProperty({ type: [StructureUpgradeDto] })
    quarryUpgrades: StructureUpgradeDto[];

    @ApiProperty({ type: [StructureUpgradeDto] })
    forgeUpgrades: StructureUpgradeDto[];

    @ApiProperty({ type: [StructureUpgradeDto] })
    tamerTowerUpgrades: StructureUpgradeDto[];

    @ApiProperty({ type: [StructureUpgradeDto] })
    tenacityTowerUpgrades: StructureUpgradeDto[];

    @ApiProperty({ type: [StructureUpgradeDto] })
    beaconTowerUpgrades: StructureUpgradeDto[];
}
