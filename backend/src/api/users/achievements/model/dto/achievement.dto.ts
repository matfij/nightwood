import { ApiProperty } from "@nestjs/swagger";

export class AchievementDto {

    @ApiProperty()
    uid: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    tier: number;

    @ApiProperty()
    hint: string;
}
