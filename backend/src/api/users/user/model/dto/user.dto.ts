import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AchievementsDto } from "src/api/users/achievements/model/dto/achievements.dto";

export class UserDto {

    @ApiPropertyOptional()
    id?: number;

    @ApiProperty()
    email?: string;

    @ApiPropertyOptional()
    password?: string;

    @ApiProperty()
    nickname?: string;

    @ApiPropertyOptional()
    achievements?: AchievementsDto;

    @ApiProperty()
    gold?: number;

    @ApiProperty()
    ownedDragons?: number;

    @ApiProperty()
    maxOwnedDragons?: number;

    @ApiProperty()
    isConfirmed?: boolean;

    @ApiPropertyOptional()
    actionToken?: string;

    @ApiPropertyOptional()
    actionTokenValidity?: number;
}
