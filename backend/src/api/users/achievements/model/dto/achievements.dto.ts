import { ApiProperty } from "@nestjs/swagger";

export class AchievementsDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    dragonOwnerI: boolean;

    @ApiProperty()
    dragonOwnerII: boolean;

    @ApiProperty()
    dragonOwnerIII: boolean;

    @ApiProperty()
    persistentBreederI: boolean;

    @ApiProperty()
    persistentBreederII: boolean;

    @ApiProperty()
    persistentBreederIII: boolean;

    @ApiProperty()
    curiousExplorerI: boolean;

    @ApiProperty()
    curiousExplorerII: boolean;

    @ApiProperty()
    curiousExplorerIII: boolean;

    @ApiProperty()
    dragonTrainerI: boolean;

    @ApiProperty()
    dragonTrainerII: boolean;

    @ApiProperty()
    dragonTrainerIII: boolean;

    @ApiProperty()
    croesusI: boolean;

    @ApiProperty()
    croesusII: boolean;

    @ApiProperty()
    croesusIII: boolean;
}
