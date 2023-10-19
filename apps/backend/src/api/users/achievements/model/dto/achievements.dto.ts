import { ApiProperty } from "@nestjs/swagger";

export class AchievementsDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    expeditionTime: number;

    @ApiProperty()
    dragonOwner: number;

    @ApiProperty()
    persistentBreeder: number;

    @ApiProperty()
    curiousExplorer: number;

    @ApiProperty()
    dragonTrainer: number;

    @ApiProperty()
    croesus: number;

    @ApiProperty()
    champion: number;

    @ApiProperty()
    championCount: number;
}
