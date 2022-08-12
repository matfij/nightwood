import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AchievementsDto } from "src/api/users/achievements/model/dto/achievements.dto";

export class UserPublicDto {

    @ApiPropertyOptional()
    id?: number;

    @ApiProperty()
    nickname?: string;

    @ApiPropertyOptional()
    achievements?: AchievementsDto;

    @ApiProperty()
    gold?: number;
}
