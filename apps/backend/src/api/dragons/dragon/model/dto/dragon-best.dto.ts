import { ApiProperty } from "@nestjs/swagger";

export class DragonBestDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    level: number;

    @ApiProperty()
    experience: number;

    @ApiProperty()
    seasonalExperience: number;

    @ApiProperty()
    userId?: number;

    @ApiProperty()
    userNickname?: string;
}
